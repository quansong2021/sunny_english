import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { existsSync,mkdirSync,mkdtempSync,readFileSync,writeFileSync,copyFileSync,rmSync } from 'node:fs';
import { resolve,dirname,join,delimiter,basename } from 'node:path';
import { fileURLToPath } from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const outputs=join(root,'outputs');mkdirSync(outputs,{recursive:true});
const bash=process.platform==='win32'?'C:/Program Files/Git/bin/bash.exe':'/bin/bash';
const ps=join(process.env.SystemRoot||'C:/Windows','System32/WindowsPowerShell/v1.0/powershell.exe');
const unix=p=>process.platform==='win32'?p.replaceAll('\\','/').replace(/^([A-Za-z]):/,(_,d)=>'/'+d.toLowerCase()):p;
function run(command,args,cwd,env=process.env){return spawnSync(command,args,{cwd,env,encoding:'utf8',timeout:30000,windowsHide:true});}
function git(cwd,...args){const r=run('git',args,cwd);assert.equal(r.status,0,`${args.join(' ')}\n${r.stdout}\n${r.stderr}`);return r.stdout.trim();}
function commit(cwd,message){git(cwd,'add','-A');git(cwd,'-c','user.name=Deployment check','-c','user.email=deployment@example.invalid','-c','commit.gpgsign=false','commit','-m',message);}
const sourceFiles=['deploy-linux.sh','deploy/linux-run.sh','deploy/windows.ps1','deploy/windows-run.ps1'];
function copySource(target){mkdirSync(join(target,'deploy'),{recursive:true});for(const file of sourceFiles)writeFileSync(join(target,file),readFileSync(join(root,file),'utf8').replaceAll('\r\n','\n'));writeFileSync(join(target,'.gitignore'),'.env\noutputs/\n');writeFileSync(join(target,'.gitattributes'),'*.sh text eol=lf\n');}
for(const platform of ['linux','windows'])test(`${platform} deployment sync: fast-forward, dirty files, divergence, failed pull, offline status and archive`,{skip:platform==='linux'?!existsSync(bash):process.platform!=='win32'||!existsSync(ps)},async t=>{
  const base=mkdtempSync(join(outputs,'deploy-sync-'));
  t.after(()=>{const checked=resolve(base);assert.equal(dirname(checked),resolve(outputs));assert.ok(basename(checked).startsWith('deploy-sync-'));rmSync(checked,{recursive:true,force:true});});
  const remote=join(base,'origin.git'),seed=join(base,'seed'),bin=join(base,'bin');mkdirSync(seed);mkdirSync(bin);
  git(base,'init','--bare',remote);git(seed,'init','-b','main');copySource(seed);writeFileSync(join(seed,'version.txt'),'one');commit(seed,'initial');git(seed,'remote','add','origin',remote);git(seed,'push','-u','origin','main');
  const clones={};for(const name of ['clean','dirty','divergent','failed']){clones[name]=join(base,name);git(base,'clone','-b','main',remote,clones[name]);}
  writeFileSync(join(seed,'version.txt'),'two');const worker=platform==='linux'?'deploy/linux-run.sh':'deploy/windows-run.ps1';writeFileSync(join(seed,worker),readFileSync(join(seed,worker),'utf8')+(platform==='linux'?"\nprintf 'UPDATED_WORKER\\n'\n":"\nWrite-Host 'UPDATED_WORKER'\n"));commit(seed,'remote update');git(seed,'push');const expected=git(seed,'rev-parse','HEAD');
  writeFileSync(join(bin,'docker'),'#!/usr/bin/env bash\nprintf "%s\\n" "$*" >> "$DEPLOY_TEST_LOG"\n',{mode:0o755});
  writeFileSync(join(bin,'docker.cmd'),'@echo off\r\necho %*>>"%DEPLOY_TEST_LOG%"\r\nexit /b 0\r\n');
  function deploy(cwd,action='start'){
    const log=join(base,`${basename(cwd)}-${action}.log`),env=Object.fromEntries(Object.entries(process.env).filter(([k])=>k.toLowerCase()!=='path'));
    Object.assign(env,{PATH:bin+delimiter+process.env.PATH,GIT_TERMINAL_PROMPT:'0',GCM_INTERACTIVE:'never',DEPLOY_TEST_LOG:platform==='linux'?unix(log):log});
    const result=platform==='linux'?run(bash,[unix(join(cwd,'deploy-linux.sh')),action],cwd,env):run(ps,['-NoProfile','-ExecutionPolicy','RemoteSigned','-File',join(cwd,'deploy/windows.ps1'),'-Action',action],cwd,env);
    return {...result,log,output:result.stdout+'\n'+result.stderr};
  }
  const clean=deploy(clones.clean);assert.equal(clean.status,0,clean.output);assert.equal(git(clones.clean,'rev-parse','HEAD'),expected);assert.match(clean.output,/UPDATED_WORKER/);assert.match(readFileSync(clean.log,'utf8'),/up -d --build --wait/);
  writeFileSync(join(clones.dirty,'version.txt'),'local changes');const dirty=deploy(clones.dirty);assert.notEqual(dirty.status,0);assert.match(dirty.output,/Local changes found/);assert.equal(existsSync(dirty.log),false);assert.equal(readFileSync(join(clones.dirty,'version.txt'),'utf8'),'local changes');
  writeFileSync(join(clones.divergent,'local.txt'),'local commit');commit(clones.divergent,'local commit');const local=git(clones.divergent,'rev-parse','HEAD'),divergent=deploy(clones.divergent);assert.notEqual(divergent.status,0);assert.equal(existsSync(divergent.log),false);assert.equal(git(clones.divergent,'rev-parse','HEAD'),local);
  git(clones.failed,'remote','set-url','origin',join(base,'missing.git'));const failed=deploy(clones.failed);assert.notEqual(failed.status,0);assert.equal(existsSync(failed.log),false);
  git(clones.clean,'remote','set-url','origin',join(base,'offline.git'));const status=deploy(clones.clean,'status');assert.equal(status.status,0,status.output);assert.match(readFileSync(status.log,'utf8'),/compose.*ps/);
  const archive=join(base,'archive');copySource(archive);const extracted=deploy(archive);assert.equal(extracted.status,0,extracted.output);assert.match(extracted.output,/Source archive detected/);assert.match(readFileSync(extracted.log,'utf8'),/up -d --build --wait/);
});
