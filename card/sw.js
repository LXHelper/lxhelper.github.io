const CACHE='luxtech-card-v5-5-1';
const ASSETS=['./','./index.html','./manifest.webmanifest','./Tudor_Neamtu_Contact.vcf',
  './icons/icon-192.png','./icons/icon-512.png','./icons/icon-maskable-512.png','./icons/apple-touch-icon.png'];
self.addEventListener('install', event=>{
  event.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',event=>{
  event.waitUntil(Promise.all([
    caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('luxtech-card-')&&k!==CACHE).map(k=>caches.delete(k)))),
    self.clients.claim()
  ]));
});
self.addEventListener('fetch',event=>{
 const r=event.request;
 if(r.method!=='GET'||new URL(r.url).origin!==self.location.origin)return;
 event.respondWith(fetch(r).then(response=>{
   if(response.ok){const copy=response.clone();caches.open(CACHE).then(c=>c.put(r,copy)).catch(()=>{});}
   return response;
 }).catch(async()=>{
   const cached=await caches.match(r);
   if(cached)return cached;
   if(r.mode==='navigate')return caches.match('./index.html');
   return Response.error();
 }));
});
