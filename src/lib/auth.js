export const USERS_KEY='ag_users'; export const SESSION_KEY='ag_session'; export const FAV_KEY='ag_favs';

const get=(k,def=[])=>{ try{ return JSON.parse(localStorage.getItem(k)) ?? def }catch{ return def }};
const set=(k,v)=> localStorage.setItem(k, JSON.stringify(v));

export function signup({name,email,password,role}){
  const users=get(USERS_KEY);
  if(users.find(u=>u.email===email)) throw new Error('User already exists');
  const user={id:Date.now().toString(),name,email,password,role};
  set(USERS_KEY,[...users,user]); set(SESSION_KEY,{id:user.id,name,email,role});
  return user;
}
export function login({email,password}){
  const users=get(USERS_KEY);
  const user=users.find(u=>u.email===email && u.password===password);
  if(!user) throw new Error('Invalid credentials'); set(SESSION_KEY,{id:user.id,name:user.name,email,role:user.role}); return user;
}
export function logout(){ localStorage.removeItem(SESSION_KEY) }
export const currentUser=()=>get(SESSION_KEY,null);

export function getFavs(){ return get(FAV_KEY,[]); }
export function toggleFav(id){
  const favs=getFavs(); const has=favs.includes(id);
  const next=has?favs.filter(x=>x!==id):[...favs,id]; set(FAV_KEY,next); return next;
}
export function isFav(id){ return getFavs().includes(id); }
