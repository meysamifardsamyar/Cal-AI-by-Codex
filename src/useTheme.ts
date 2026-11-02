import {useEffect,useState} from 'react';

export type ThemePreference='light'|'dark'|'system';
const storageKey='nouri-appearance';
const valid=(value:string|null):ThemePreference=>value==='light'||value==='dark'?value:'system';
function readPreference():ThemePreference{try{return valid(localStorage.getItem(storageKey))}catch{return 'system'}}

export function useTheme(){
 const [preference,setPreference]=useState<ThemePreference>(readPreference);
 const [systemDark,setSystemDark]=useState(()=>window.matchMedia?.('(prefers-color-scheme: dark)').matches??false);
 const resolved=preference==='system'?(systemDark?'dark':'light'):preference;
 useEffect(()=>{
  const query=window.matchMedia?.('(prefers-color-scheme: dark)');
  const onSystemChange=(event:MediaQueryListEvent)=>setSystemDark(event.matches);
  const onStorage=(event:StorageEvent)=>{if(event.key===storageKey||event.key===null)setPreference(readPreference())};
  query?.addEventListener('change',onSystemChange);window.addEventListener('storage',onStorage);
  return()=>{query?.removeEventListener('change',onSystemChange);window.removeEventListener('storage',onStorage)};
 },[]);
 useEffect(()=>{
  document.documentElement.dataset.theme=resolved;
  document.documentElement.style.colorScheme=resolved;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content',resolved==='dark'?'#101813':'#f7f8f3');
 },[resolved]);
 function chooseTheme(value:ThemePreference){setPreference(value);try{localStorage.setItem(storageKey,value)}catch{/* The selection still applies for this visit. */}}
 return {preference,resolved,chooseTheme};
}
