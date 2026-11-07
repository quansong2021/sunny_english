import mysql from 'mysql2/promise';
import { readFile } from 'node:fs/promises';
import { emptyState } from './state.js';
import { hashPassword,newToken } from './auth.js';
export class ConflictError extends Error {}
export function createPool(env=process.env) {
  return mysql.createPool({host:env.DB_HOST||'127.0.0.1',port:Number(env.DB_PORT||3306),user:env.DB_USER||'sunny',password:env.DB_PASSWORD,database:env.DB_NAME||'sunny_english',charset:'utf8mb4',timezone:'Z',dateStrings:true,connectionLimit:5,supportBigNumbers:true});
}
export async function initialize(pool,env=process.env) {
  if(!/^[a-zA-Z0-9_.-]{1,64}$/.test(env.APP_USERNAME||'sunny'))throw new Error('APP_USERNAME is invalid.');
  const sql=await readFile(new URL('./schema.sql',import.meta.url),'utf8');
  for(const statement of sql.split(';').map(s=>s.trim()).filter(Boolean))await pool.query(statement);
  const username=env.APP_USERNAME||'sunny';
  const [rows]=await pool.execute('SELECT id FROM users WHERE username=?',[username]);
  // Keep the existing profile and its learning data. The legacy hash column is not used for sign-in.
  if(!rows.length)await pool.execute('INSERT IGNORE INTO users(username,password_hash) VALUES (?,?)',[username,await hashPassword(newToken())]);
  await pool.execute('DELETE FROM sessions WHERE expires_at <= UTC_TIMESTAMP()');
}
export class MysqlStore {
  constructor(pool){this.pool=pool;}
  async health(){await this.pool.query('SELECT 1');}
  async findUser(username){const [r]=await this.pool.execute('SELECT id,username,password_hash FROM users WHERE username=?',[username]);return r[0];}
  async createSession(hash,id,expires){await this.pool.execute('DELETE FROM sessions WHERE expires_at <= UTC_TIMESTAMP()');await this.pool.execute('INSERT INTO sessions(token_hash,user_id,expires_at) VALUES (?,?,?)',[hash,id,expires]);}
  async session(hash){const [r]=await this.pool.execute('SELECT u.id,u.username FROM sessions s JOIN users u ON u.id=s.user_id WHERE s.token_hash=? AND s.expires_at>UTC_TIMESTAMP()',[hash]);return r[0];}
  async deleteSession(hash){await this.pool.execute('DELETE FROM sessions WHERE token_hash=?',[hash]);}
  async load(userId){
    const c=await this.pool.getConnection();
    try{await c.beginTransaction();const [users]=await c.execute('SELECT display_name,daily_goal,revision FROM users WHERE id=?',[userId]);if(!users.length)throw Error('User missing');
      const u=users[0],s=emptyState();s.name=u.display_name;s.goal=u.daily_goal;
      const tables=[['lesson_progress','done'],['vocabulary_reviews','words'],['speaking_answers','answers'],['review_notes','notes'],['study_activity','activity']];
      for(const [table] of tables){const [rows]=await c.execute(`SELECT * FROM ${table} WHERE user_id=?`,[userId]);for(const r of rows){
        if(table==='lesson_progress')s.done[r.step_key]=!!r.completed;
        if(table==='vocabulary_reviews')s.words[r.word_key]={level:r.review_level,due:Number(r.due_ms),seen:!!r.seen};
        if(table==='speaking_answers')s.answers[r.prompt_key]=r.answer;
        if(table==='review_notes')s.notes[r.lesson_key]=r.note;
        if(table==='study_activity'){s.activity[r.study_date]||=[];s.activity[r.study_date].push(r.step_key);}
      }}
      const [preferences]=await c.execute('SELECT plans,resume_state FROM learning_preferences WHERE user_id=?',[userId]);
      if(preferences.length){const p=preferences[0];s.plans=typeof p.plans==='string'?JSON.parse(p.plans):p.plans;s.resume=typeof p.resume_state==='string'?JSON.parse(p.resume_state):p.resume_state;}
      const [saved]=await c.execute('SELECT word,entry_json FROM saved_words WHERE user_id=?',[userId]);for(const row of saved)s.savedWords[row.word]=typeof row.entry_json==='string'?JSON.parse(row.entry_json):row.entry_json;
      await c.commit();return {state:s,revision:u.revision};
    }catch(e){await c.rollback();throw e;}finally{c.release();}
  }
  async save(userId,s,revision){
    const c=await this.pool.getConnection();
    try{await c.beginTransaction();const [r]=await c.execute('SELECT revision FROM users WHERE id=? FOR UPDATE',[userId]);
      if(!r.length||r[0].revision!==revision)throw new ConflictError('Revision conflict');
      await c.execute('UPDATE users SET display_name=?,daily_goal=?,revision=revision+1 WHERE id=?',[s.name,s.goal,userId]);
      const batches=[['lesson_progress',['user_id','step_key','completed'],Object.entries(s.done).map(([k,v])=>[userId,k,v])],['vocabulary_reviews',['user_id','word_key','review_level','due_ms','seen'],Object.entries(s.words).map(([k,v])=>[userId,k,v.level,v.due,v.seen])],['speaking_answers',['user_id','prompt_key','answer'],Object.entries(s.answers).map(([k,v])=>[userId,k,v])],['review_notes',['user_id','lesson_key','note'],Object.entries(s.notes).map(([k,v])=>[userId,k,v])],['study_activity',['user_id','study_date','step_key'],Object.entries(s.activity).flatMap(([d,ids])=>ids.map(id=>[userId,d,id]))]];
      for(const [table,columns,rows] of batches){await c.execute(`DELETE FROM ${table} WHERE user_id=?`,[userId]);for(let i=0;i<rows.length;i+=500){const batch=rows.slice(i,i+500);await c.query(`INSERT INTO ${table} (${columns.join(',')}) VALUES ?`,[batch]);}}
      await c.execute('DELETE FROM learning_preferences WHERE user_id=?',[userId]);
      await c.execute('INSERT INTO learning_preferences(user_id,plans,resume_state) VALUES (?,?,?)',[userId,JSON.stringify(s.plans||{}),s.resume?JSON.stringify(s.resume):null]);
      await c.execute('DELETE FROM saved_words WHERE user_id=?',[userId]);const saved=Object.entries(s.savedWords||{}).map(([word,entry])=>[userId,word,JSON.stringify(entry)]);for(let i=0;i<saved.length;i+=200)await c.query('INSERT INTO saved_words(user_id,word,entry_json) VALUES ?',[saved.slice(i,i+200)]);
      await c.commit();return revision+1;
    }catch(e){await c.rollback();throw e;}finally{c.release();}
  }
}
