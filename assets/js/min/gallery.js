document.addEventListener("DOMContentLoaded",(function(){let e=0,t=document.querySelectorAll(".gallery-item");const n=n=>{let r=document.createElement("div");r.classList.add("modale"),document.querySelector(".gallery").append(r);let d=document.createElement("img");d.classList.add("preview"),d.setAttribute("src",n[e].src),r.append(d),r.firstChild.addEventListener("click",(e=>{e.stopImmediatePropagation()})),r.addEventListener("click",(()=>{r.remove()}));let l=document.createElement("div");l.classList.add("chevron","next"),l.innerText=">",r.append(l),l.addEventListener("click",(r=>{r.stopImmediatePropagation(),e<t.length-1?e++:e=0,d.setAttribute("src",n[e].src)}));let a=document.createElement("div");a.classList.add("chevron","previous"),a.innerText="<",r.prepend(a),a.addEventListener("click",(r=>{r.stopImmediatePropagation(),e>0?e-=1:e=t.length-1,d.setAttribute("src",n[e].src)}))};(()=>{let e=document.querySelectorAll(".gallery-item"),t=new Set;for(let n of e)t.add(n.dataset.galleryTag);console.log(t);for(let e of t){let t=document.createElement("li");t.classList.add("nav-link"),t.innerText=e,document.querySelector(".filters").append(t)}})(),(()=>{for(const r of t)r.addEventListener("click",(()=>{e=Array.from(t).indexOf(r),n(t)}))})()}));