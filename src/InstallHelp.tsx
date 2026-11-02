import {useEffect,useState} from 'react';
import {Check,Copy,Download,MoreVertical,Share,Smartphone} from 'lucide-react';

type InstallPrompt=Event&{prompt:()=>Promise<void>;userChoice:Promise<{outcome:'accepted'|'dismissed'}>};
export function useInstall(){
 const [prompt,setPrompt]=useState<InstallPrompt|null>(null);
 const [installed,setInstalled]=useState(()=>window.matchMedia?.('(display-mode: standalone)').matches||!!(navigator as Navigator&{standalone?:boolean}).standalone);
 useEffect(()=>{
  const query=window.matchMedia?.('(display-mode: standalone)');
  const capture=(event:Event)=>{event.preventDefault();setPrompt(event as InstallPrompt)};
  const complete=()=>{setPrompt(null);setInstalled(true)};
  const displayChanged=(event:MediaQueryListEvent)=>setInstalled(event.matches);
  window.addEventListener('beforeinstallprompt',capture);window.addEventListener('appinstalled',complete);query?.addEventListener('change',displayChanged);
  return()=>{window.removeEventListener('beforeinstallprompt',capture);window.removeEventListener('appinstalled',complete);query?.removeEventListener('change',displayChanged)};
 },[]);
 async function install(){if(!prompt)return;await prompt.prompt();await prompt.userChoice;setPrompt(null)}
 return {canPrompt:!!prompt,installed,install};
}

export default function InstallHelp({canPrompt,installed,install}:{canPrompt:boolean;installed:boolean;install:()=>Promise<void>}){
 const [platform,setPlatform]=useState(/iPhone|iPad|iPod/.test(navigator.userAgent)?'iphone':'android');
 const [message,setMessage]=useState('');
 async function copyLink(){try{await navigator.clipboard.writeText(window.location.origin+'/');setMessage('Link copied')}catch{setMessage('Select and copy the address below.')}}
 return <div className="install-help"><div className="install-intro"><span className="large-icon"><Smartphone size={29}/></span><h3>Your daily routine, one tap away.</h3><p>Keep Nouri on your home screen. It opens in its own window, with your journal ready after sign-in.</p></div>
 {installed?<div className="install-status"><Check size={18}/> You’re already using Nouri from your home screen.</div>:canPrompt&&<button className="primary full" onClick={()=>void install().catch(()=>setMessage('Use your browser menu to add Nouri to your home screen.'))}><Download size={18}/> Install Nouri</button>}
 <div className="install-platforms" role="group" aria-label="Phone instructions"><button aria-pressed={platform==='iphone'} onClick={()=>setPlatform('iphone')}>iPhone / iPad</button><button aria-pressed={platform==='android'} onClick={()=>setPlatform('android')}>Android</button></div>
 <ol className="install-steps">{platform==='iphone'?<><li><span>1</span><div><strong>Open Nouri in Safari</strong><p>Use Safari on your phone and sign in with the same ChatGPT account.</p></div></li><li><span>2</span><div><strong><Share size={16}/> Tap Share</strong><p>Open Safari’s Share menu, then choose <b>Add to Home Screen</b>. You may need to scroll down.</p></div></li><li><span>3</span><div><strong>Keep “Open as Web App” on</strong><p>If this option appears, leave it enabled. Tap <b>Add</b> to place Nouri on your home screen.</p></div></li></>:<><li><span>1</span><div><strong>Open Nouri in Chrome</strong><p>Use Chrome on your phone and sign in with the same ChatGPT account.</p></div></li><li><span>2</span><div><strong><MoreVertical size={16}/> Open the browser menu</strong><p>Choose <b>Add to home screen</b> or <b>Install app</b>, depending on your browser.</p></div></li><li><span>3</span><div><strong>Confirm and make it yours</strong><p>Tap <b>Install</b> or <b>Add</b>. Open the Nouri icon from your home screen.</p></div></li></>}</ol>
 <div className="install-link"><code>{window.location.origin}/</code><button className="secondary" onClick={()=>void copyLink()}><Copy size={16}/> Copy link</button></div><p className="install-feedback" role="status">{message}</p><p className="privacy-note">Opening from ChatGPT? First use “Open in browser”. Internet is needed for photo analysis, product lookup and cloud saving. Allow camera access when scanning.</p></div>
}
