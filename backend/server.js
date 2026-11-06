import { createPool, initialize, MysqlStore } from './database.js';
import { createApp } from './http.js';
const pool=createPool();
try {
  await initialize(pool);
  const port=Number(process.env.PORT||3000);
  const server=createApp(new MysqlStore(pool),{secureCookie:process.env.COOKIE_SECURE==='true'});
  server.listen(port,'0.0.0.0',()=>console.log(`Sunny English listening on port ${port}`));
  const shutdown=()=>{server.close(async()=>{await pool.end();process.exit(0);});setTimeout(()=>process.exit(1),10000).unref();};
  process.on('SIGTERM',shutdown);process.on('SIGINT',shutdown);
} catch(e) { console.error('Startup failed:',e.code||e.message);await pool.end();process.exitCode=1; }
