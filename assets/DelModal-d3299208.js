import{g as J,h as Z,_ as X,o as tt,c as et,b as o,t as v,a as w}from"./index-f05f6b06.js";import{r as st,a as it,c as ot,b as nt}from"./base-component-87192791.js";import{r as at,a as lt,b as dt,c as rt}from"./component-functions-48b69c1d.js";var S={exports:{}};/*!
  * Bootstrap modal.js v5.2.3 (https://getbootstrap.com/)
  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */(function(_,u){(function(i,h){_.exports=h(st(),it(),ot(),at(),nt(),lt(),dt(),rt())})(J,function(i,h,g,p,E,D,k,L){const r=d=>d&&typeof d=="object"&&"default"in d?d:{default:d},s=r(h),m=r(g),N=r(p),C=r(E),I=r(D),M=r(k),O="modal",n=".bs.modal",B=".data-api",$="Escape",V=`hide${n}`,H=`hidePrevented${n}`,b=`hidden${n}`,T=`show${n}`,q=`shown${n}`,P=`resize${n}`,R=`click.dismiss${n}`,Y=`mousedown.dismiss${n}`,j=`keydown.dismiss${n}`,x=`click${n}${B}`,A="modal-open",F="fade",y="show",f="modal-static",K=".modal.show",W=".modal-dialog",z=".modal-body",G='[data-bs-toggle="modal"]',U={backdrop:!0,focus:!0,keyboard:!0},Q={backdrop:"(boolean|string)",focus:"boolean",keyboard:"boolean"};class l extends C.default{constructor(t,e){super(t,e),this._dialog=m.default.findOne(W,this._element),this._backdrop=this._initializeBackDrop(),this._focustrap=this._initializeFocusTrap(),this._isShown=!1,this._isTransitioning=!1,this._scrollBar=new N.default,this._addEventListeners()}static get Default(){return U}static get DefaultType(){return Q}static get NAME(){return O}toggle(t){return this._isShown?this.hide():this.show(t)}show(t){this._isShown||this._isTransitioning||s.default.trigger(this._element,T,{relatedTarget:t}).defaultPrevented||(this._isShown=!0,this._isTransitioning=!0,this._scrollBar.hide(),document.body.classList.add(A),this._adjustDialog(),this._backdrop.show(()=>this._showElement(t)))}hide(){!this._isShown||this._isTransitioning||s.default.trigger(this._element,V).defaultPrevented||(this._isShown=!1,this._isTransitioning=!0,this._focustrap.deactivate(),this._element.classList.remove(y),this._queueCallback(()=>this._hideModal(),this._element,this._isAnimated()))}dispose(){for(const t of[window,this._dialog])s.default.off(t,n);this._backdrop.dispose(),this._focustrap.deactivate(),super.dispose()}handleUpdate(){this._adjustDialog()}_initializeBackDrop(){return new I.default({isVisible:!!this._config.backdrop,isAnimated:this._isAnimated()})}_initializeFocusTrap(){return new M.default({trapElement:this._element})}_showElement(t){document.body.contains(this._element)||document.body.append(this._element),this._element.style.display="block",this._element.removeAttribute("aria-hidden"),this._element.setAttribute("aria-modal",!0),this._element.setAttribute("role","dialog"),this._element.scrollTop=0;const e=m.default.findOne(z,this._dialog);e&&(e.scrollTop=0),i.reflow(this._element),this._element.classList.add(y);const a=()=>{this._config.focus&&this._focustrap.activate(),this._isTransitioning=!1,s.default.trigger(this._element,q,{relatedTarget:t})};this._queueCallback(a,this._dialog,this._isAnimated())}_addEventListeners(){s.default.on(this._element,j,t=>{if(t.key===$){if(this._config.keyboard){t.preventDefault(),this.hide();return}this._triggerBackdropTransition()}}),s.default.on(window,P,()=>{this._isShown&&!this._isTransitioning&&this._adjustDialog()}),s.default.on(this._element,Y,t=>{s.default.one(this._element,R,e=>{if(!(this._element!==t.target||this._element!==e.target)){if(this._config.backdrop==="static"){this._triggerBackdropTransition();return}this._config.backdrop&&this.hide()}})})}_hideModal(){this._element.style.display="none",this._element.setAttribute("aria-hidden",!0),this._element.removeAttribute("aria-modal"),this._element.removeAttribute("role"),this._isTransitioning=!1,this._backdrop.hide(()=>{document.body.classList.remove(A),this._resetAdjustments(),this._scrollBar.reset(),s.default.trigger(this._element,b)})}_isAnimated(){return this._element.classList.contains(F)}_triggerBackdropTransition(){if(s.default.trigger(this._element,H).defaultPrevented)return;const e=this._element.scrollHeight>document.documentElement.clientHeight,a=this._element.style.overflowY;a==="hidden"||this._element.classList.contains(f)||(e||(this._element.style.overflowY="hidden"),this._element.classList.add(f),this._queueCallback(()=>{this._element.classList.remove(f),this._queueCallback(()=>{this._element.style.overflowY=a},this._dialog)},this._dialog),this._element.focus())}_adjustDialog(){const t=this._element.scrollHeight>document.documentElement.clientHeight,e=this._scrollBar.getWidth(),a=e>0;if(a&&!t){const c=i.isRTL()?"paddingLeft":"paddingRight";this._element.style[c]=`${e}px`}if(!a&&t){const c=i.isRTL()?"paddingRight":"paddingLeft";this._element.style[c]=`${e}px`}}_resetAdjustments(){this._element.style.paddingLeft="",this._element.style.paddingRight=""}static jQueryInterface(t,e){return this.each(function(){const a=l.getOrCreateInstance(this,t);if(typeof t=="string"){if(typeof a[t]>"u")throw new TypeError(`No method named "${t}"`);a[t](e)}})}}return s.default.on(document,x,G,function(d){const t=i.getElementFromSelector(this);["A","AREA"].includes(this.tagName)&&d.preventDefault(),s.default.one(t,T,c=>{c.defaultPrevented||s.default.one(t,b,()=>{i.isVisible(this)&&this.focus()})});const e=m.default.findOne(K);e&&l.getInstance(e).hide(),l.getOrCreateInstance(t).toggle(this)}),L.enableDismissTrigger(l),i.defineJQueryPlugin(l),l})})(S);var ct=S.exports;const ht=Z(ct),_t={props:["delItem","tempItem"],data(){return{delModal:""}},methods:{show(){this.delModal.show()},hide(){this.delModal.hide()}},mounted(){this.delModal=new ht(this.$refs.delModal)}},ut={id:"delModal",ref:"delModal",class:"modal fade",tabindex:"-1","aria-labelledby":"delModalLabel","aria-hidden":"true"},mt={class:"modal-dialog"},ft={class:"modal-content border-0"},gt={class:"modal-header bg-danger text-white"},pt={id:"delModalLabel",class:"modal-title"},Et=o("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"},null,-1),bt={class:"modal-body"},Tt={class:"text-danger mb-2"},At={class:"modal-footer"},yt=o("button",{type:"button",class:"btn btn-outline-secondary","data-bs-dismiss":"modal"}," 取消 ",-1);function vt(_,u,i,h,g,p){return tt(),et("div",ut,[o("div",mt,[o("div",ft,[o("div",gt,[o("h5",pt,[o("span",null,"刪除產品"+v(i.tempItem.title||`訂單編號 ${i.tempItem.id}`),1)]),Et]),o("div",bt,[o("p",null,[w("是否刪除"),o("strong",Tt,v(i.tempItem.title||`訂單編號 ${i.tempItem.id}`),1),w(" (刪除後將無法恢復)。")])]),o("div",At,[yt,o("button",{type:"button",class:"btn btn-danger",onClick:u[0]||(u[0]=E=>_.$emit("deleteItem"))}," 確認刪除 ")])])])],512)}const Lt=X(_t,[["render",vt]]);export{Lt as D,ht as M};