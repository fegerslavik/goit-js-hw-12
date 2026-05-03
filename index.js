import{a as P,S,i}from"./assets/vendor-73qhTu8_.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function n(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(o){if(o.ep)return;o.ep=!0;const s=n(o);fetch(o.href,s)}})();const q="https://pixabay.com/api/",v="55683815-3d76e1aff0ba46e1ff3d0a45f",R=15;async function p(e,t){return(await P.get(q,{params:{key:v,q:e,page:t,per_page:R,image_type:"photo",orientation:"horizontal",safesearch:!0}})).data}const m=document.querySelector(".gallery"),h=document.querySelector(".loader"),y=document.querySelector(".load-more-btn"),M=new S(".gallery a",{captionsData:"alt",captionDelay:250});function B(e){return e.map(t=>`
			<li class="gallery-item">
				<a class="gallery-link" href="${t.largeImageURL}">
					<img
						class="gallery-image"
						src="${t.webformatURL}"
						alt="${t.tags}"
						loading="lazy"
					/>
				</a>
				<div class="gallery-meta">
					<p><span>Likes</span>${t.likes}</p>
					<p><span>Views</span>${t.views}</p>
					<p><span>Comments</span>${t.comments}</p>
					<p><span>Downloads</span>${t.downloads}</p>
				</div>
			</li>`).join("")}function g(e){const t=B(e);m.insertAdjacentHTML("beforeend",t),M.refresh()}function $(){m.innerHTML=""}function L(){h.classList.remove("is-hidden")}function w(){h.classList.add("is-hidden")}function d(){y.classList.remove("is-hidden")}function l(){y.classList.add("is-hidden")}const O=document.querySelector(".form"),A=document.querySelector(".load-more-btn"),_=15;let u="",a=1,f=0;O.addEventListener("submit",x);A.addEventListener("click",G);function E(){i.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"topRight"})}function b(e){var n,r;const t=((r=(n=e==null?void 0:e.response)==null?void 0:n.data)==null?void 0:r.error)||(e==null?void 0:e.message)||"Something went wrong. Please try again later.";i.error({title:"Error",message:t,position:"topRight"})}async function x(e){e.preventDefault();const n=e.currentTarget.elements["search-text"].value.trim();if(!n){i.warning({title:"Warning",message:"Please enter a search query.",position:"topRight"});return}u=n,a=1,$(),l(),L();try{const r=await p(u,a);if(r.hits.length===0){i.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}f=Math.ceil(r.totalHits/_),g(r.hits),a<f?d():(l(),E())}catch(r){b(r)}finally{w()}}async function G(){a+=1,l(),L();try{const e=await p(u,a);g(e.hits),a>=f||e.hits.length===0?(l(),E()):d();const t=document.querySelector(".gallery-item");if(t){const n=t.getBoundingClientRect().height;window.scrollBy({top:n*2,behavior:"smooth"})}}catch(e){b(e),d()}finally{w()}}
//# sourceMappingURL=index.js.map
