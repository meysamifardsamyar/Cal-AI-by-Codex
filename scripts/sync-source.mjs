// Fallback source synchronization when the installed Sites workflow helper is absent.
// Credentials are accepted only on hidden stdin and passed only in the child environment.
import {spawnSync} from 'node:child_process';
import {createInterface} from 'node:readline';
const tty=process.stdin.isTTY;
if(tty)spawnSync('stty',['-echo'],{stdio:'inherit'});
console.log('Ready for source credential JSON on stdin (input is hidden).');
const rl=createInterface({input:process.stdin,crlfDelay:Infinity});
const input=await new Promise(resolve=>rl.once('line',resolve));rl.close();
let credential;try{credential=JSON.parse(input)}catch{console.error('Invalid source credential JSON.');process.exit(1)}
const env={...process.env,GIT_TERMINAL_PROMPT:'0'};
if(credential.auth_mode!=='work_proxy'){
 if(!credential.token){console.error('Source token missing.');process.exit(1)}
 env.GIT_CONFIG_COUNT='1';env.GIT_CONFIG_KEY_0=`http.${credential.remote_url}.extraheader`;env.GIT_CONFIG_VALUE_0=`Authorization: Bearer ${credential.token}`;
}
function git(args){const r=spawnSync('git',args,{env,encoding:'utf8'});if(r.status!==0){console.error((r.stderr||'Git failed.').replaceAll(credential.token||'__no_token__','[redacted]'));process.exit(r.status||1)}return r.stdout.trim()}
const remotes=git(['remote']).split('\n');if(remotes.includes('sites'))git(['remote','set-url','sites',credential.remote_url]);else git(['remote','add','sites',credential.remote_url]);
git(['push','sites',`HEAD:refs/heads/${credential.branch}`]);
console.log(JSON.stringify({commit_sha:git(['rev-parse','HEAD']),branch:credential.branch,source_pushed:true}));
if(tty)spawnSync('stty',['echo'],{stdio:'inherit'});
