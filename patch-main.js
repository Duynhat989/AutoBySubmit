(()=>{if(window.__NEWBIA_PATCH_HOOK__)return;window.__NEWBIA_PATCH_HOOK__=!0;const g=/\/m=wO1vlb(?:[?#].*)?$/,s=new Map;let f=0;function w(r){const t=r.length>1?r.slice(1):r;if(t.length===1){const e=t[0];if(typeof e=="string")return e;try{return JSON.stringify(e)}catch{return String(e)}}return t.map(e=>{if(typeof e=="string")return e;try{return JSON.stringify(e)}catch{return String(e)}}).join(" ")}function d(r,t,e){return`
const __runId = ${JSON.stringify(r)};
const __JOB__ = ${JSON.stringify(e!=null?e:null)};
const console = new Proxy(globalThis.console, {
  get(target, prop, receiver) {
    if (prop === "log") {
      return function (...args) {
        try {
          if (args.length && String(args[0]).includes("NanoReponsive")) {
            window.postMessage(
              {
                source: "newbia-patch",
                type: "NANO_RESPONSIVE",
                runId: __runId,
                text: (${w.toString()})(args),
              },
              "*"
            );
          }
        } catch (_) {}
        return globalThis.console.log(...args);
      };
    }
    const val = Reflect.get(target, prop, receiver);
    return typeof val === "function" ? val.bind(target) : val;
  },
});
${String(t||"")}
`}function h(r){const t="newbia_"+ ++f+"_"+Math.random().toString(36).slice(2);return new Promise((e,c)=>{const o=setTimeout(()=>{s.delete(t),c(new Error("timeout \u0111\u1EE3i patch"))},3e4);s.set(t,{resolve:n=>{clearTimeout(o),e(n)},reject:n=>{clearTimeout(o),c(n)}}),window.postMessage({source:"newbia-patch",type:"patch-request",id:t,url:r},"*")})}window.addEventListener("message",r=>{if(r.source!==window)return;const t=r.data;if(!(!t||t.source!=="newbia-patch")){if(t.type==="patch-result"){const e=s.get(t.id);if(!e)return;s.delete(t.id),t.ok?e.resolve(t.code):e.reject(new Error(t.error||"patch fail"));return}if(t.type==="CHECK_QM"){window.postMessage({source:"newbia-patch",type:"CHECK_QM_RESULT",requestId:t.requestId,ready:typeof window.Qm=="function"},"*");return}if(t.type==="RUN_CUSTOM_JS"){const{requestId:e,code:c,job:o}=t;console.log("[newbia-patch] RUN_CUSTOM_JS start",e,(o==null?void 0:o.id)||"(no job)"),window.postMessage({source:"newbia-patch",type:"RUN_CUSTOM_JS_START",requestId:e},"*"),(async()=>{let n=null,a=null;try{const i=Object.getPrototypeOf(async function(){}).constructor;if(n=await new i(d(e,c,o))(),n!==void 0&&typeof n!="string")try{n=JSON.stringify(n)}catch{n=String(n)}}catch(i){a=(i==null?void 0:i.message)||String(i),console.error("[newbia-patch] RUN_CUSTOM_JS error",e,a)}console.log("[newbia-patch] RUN_CUSTOM_JS done",e,a?"ERR":"OK"),window.postMessage({source:"newbia-patch",type:"RUN_CUSTOM_JS_RESULT",requestId:e,result:n,error:a},"*")})()}}});async function S(r,t){if(r.dataset.newbiaPatched!=="1"){r.dataset.newbiaPatched="1";try{const e=await h(t),c=new Blob([e],{type:"text/javascript"}),o=URL.createObjectURL(c);u.call(r,o),console.log("[newbia-patch] attached patched blob for",t.slice(-40))}catch(e){console.error("[newbia-patch] kh\xF4ng patch \u0111\u01B0\u1EE3c, fallback URL g\u1ED1c",e),r.dataset.newbiaPatched="0",u.call(r,t)}}}function p(r,t){return!t||!g.test(String(t))||String(t).startsWith("blob:")?!1:(S(r,String(t)),!0)}const l=Object.getOwnPropertyDescriptor(HTMLScriptElement.prototype,"src"),u=l.set,_=l.get;Object.defineProperty(HTMLScriptElement.prototype,"src",{configurable:!0,enumerable:l.enumerable,get(){return _.call(this)},set(r){p(this,r)||u.call(this,r)}});const y=Element.prototype.setAttribute;Element.prototype.setAttribute=function(r,t){if(!(this instanceof HTMLScriptElement&&String(r).toLowerCase()==="src"&&p(this,t)))return y.apply(this,arguments)},console.log("[newbia-patch] MAIN hook s\u1EB5n s\xE0ng cho /m=wO1vlb + RUN_CUSTOM_JS")})();
