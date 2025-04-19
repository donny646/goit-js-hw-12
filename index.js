import{a as w,i as a,S as x}from"./assets/vendor-BjRz3xa9.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function t(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(e){if(e.ep)return;e.ep=!0;const o=t(e);fetch(e.href,o)}})();const $="https://pixabay.com/api/",q="49758649-878ce1f589e8b6bdc26fd775c";async function h(r,s=1){const t=await w.get(`${$}`,{params:{key:q,q:r,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:15,page:s}});return t.data.hits.length||a.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),t.data}const m=document.querySelector(".gallery"),p=document.querySelector(".loader"),y=document.querySelector(".btn-load-more");var B=new x(".gallery-link",{captionsData:"alt",captionDelay:250});function g(r){const s=r.map(({webformatURL:t,largeImageURL:i,tags:e,likes:o,views:n,comments:S,downloads:v})=>`<li class="gallery-item">
    <a class="gallery-link" href="${i}">
    <img
      class="gallery-image"
      src="${t}"
      alt="${e}"
    />
   </a>
    <ul class="info">
      <li class="info-item">
        <h3 class="info-title">Likes</h3>
        <p class="info-text">${o}</p>
      </li>
      <li class="info-item"><h3 class="info-title">Views</h3> <p class="info-text">${n}</p></li>
      <li class="info-item"><h3 class="info-title">Comments</h3> <p class="info-text">${S}</p></li>
      <li class="info-item"><h3 class="info-title">Downloads</h3> <p class="info-text">${v}</p></li>
    </ul>
    </li>`).join("");m.insertAdjacentHTML("beforeend",s),B.refresh()}function E(){m.innerHTML=""}function L(){p.classList.remove("hiden")}function d(){p.classList.add("hiden")}function b(){y.classList.remove("hiden")}function c(){y.classList.add("hiden")}const M=document.querySelector(".form"),P=document.querySelector(".btn-load-more");M.addEventListener("submit",O);P.addEventListener("click",C);let l=1,u="",f=0;async function O(r){r.preventDefault(),L();const s=r.currentTarget.elements["search-text"].value.trim();if(u=s,l=1,s===""){a.info({title:"Caution",message:"You forgot important data",position:"topLeft"}),d();return}try{const t=await h(u);f=t.totalHits,E(),g(t.hits),l*t.hits.length<f?b():(a.info({title:"Caution",message:"We're sorry, but you've reached the end of search results.",position:"topLeft"}),c())}catch(t){a.error({title:"Error",message:`${t.message}`}),c()}finally{d()}}async function C(){l++,L(),c();try{const r=await h(u,l);g(r.hits),l*r.hits.length<f?b():a.info({title:"Caution",message:"We're sorry, but you've reached the end of search results.",position:"topLeft"});const i=document.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({left:0,top:i*2,behavior:"smooth"})}catch(r){a.error({title:"Error",message:`${r.message}`}),c()}finally{d()}}
//# sourceMappingURL=index.js.map
