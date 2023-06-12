import{S as _}from"./sweetalert2.all-ff53c44a.js";import{M as x,D as C}from"./DelModal-d3299208.js";import{_ as v,r as u,o as d,c as l,d as m,w as O,b as t,t as a,j as P,F as p,k as D,f as y,H as k,l as V,n as E}from"./index-f05f6b06.js";import{_ as M}from"./loading-0268191f.js";import{P as I}from"./PaginationComponent-bbe14040.js";import"./base-component-87192791.js";import"./component-functions-48b69c1d.js";const B={props:["tempOrder"],emits:["updatePaid"],data(){return{orderModal:"",isLoading:!1}},methods:{show(){this.orderModal.show()},hide(){this.orderModal.hide()},date(o){return new Date(o*1e3).toLocaleDateString()}},mounted(){this.orderModal=new x(this.$refs.orderModal)},computed:{modalOrderData(){return this.tempOrder}}},S=t("img",{src:M,alt:""},null,-1),A={id:"orderModal",ref:"orderModal",class:"modal fade",tabindex:"-1","aria-labelledby":"orderModalLabel","aria-hidden":"true"},U={class:"modal-dialog modal-xl"},T={class:"modal-content border-0"},R=t("div",{class:"modal-header bg-gray-dark text-white"},[t("h5",{id:"orderModalLabel",class:"modal-title"},[t("span",null,"訂單細節")]),t("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})],-1),N={class:"modal-body"},j={class:"row"},H={class:"col-md-4"},q=t("h3",null,"用戶資料",-1),F={class:"table"},z={key:0},G=t("th",{style:{width:"100px"}},"姓名",-1),J=t("th",null,"Email",-1),K=t("th",null,"電話",-1),Q=t("th",null,"地址",-1),W={class:"col-md-8"},X=t("h3",null,"訂單細節",-1),Y={class:"table"},Z=t("th",{style:{width:"100px"}},"訂單編號",-1),tt=t("th",null,"下單時間",-1),et=t("th",null,"付款狀態",-1),st={key:0,class:"text-success"},at={key:1,class:"text-muted"},ot=t("th",null,"總金額",-1),dt=t("h3",null,"選購商品",-1),lt={class:"table"},nt=t("thead",null,[t("tr")],-1),it={class:"text-end"},rt={class:"d-flex justify-content-end"},ct={class:"form-check"},ht={class:"form-check-label",for:"flexCheckDefault"},_t={key:0},ut={key:1},mt={class:"modal-footer"},pt=t("button",{type:"button",class:"btn btn-outline-secondary","data-bs-dismiss":"modal"}," 取消 ",-1);function ft(o,s,h,w,c,e){const f=u("VueLoading");return d(),l(p,null,[m(f,{active:c.isLoading},{default:O(()=>[S]),_:1},8,["active"]),t("div",A,[t("div",U,[t("div",T,[R,t("div",N,[t("div",j,[t("div",H,[q,t("table",F,[e.modalOrderData.user?(d(),l("tbody",z,[t("tr",null,[G,t("td",null,a(e.modalOrderData.user.name),1)]),t("tr",null,[J,t("td",null,a(e.modalOrderData.user.email),1)]),t("tr",null,[K,t("td",null,a(e.modalOrderData.user.tel),1)]),t("tr",null,[Q,t("td",null,a(e.modalOrderData.user.address),1)])])):P("",!0)])]),t("div",W,[X,t("table",Y,[t("tbody",null,[t("tr",null,[Z,t("td",null,a(e.modalOrderData.id),1)]),t("tr",null,[tt,t("td",null,a(e.date(e.modalOrderData.create_at)),1)]),t("tr",null,[et,t("td",null,[e.modalOrderData.is_paid?(d(),l("strong",st,"已付款")):(d(),l("span",at,"尚未付款"))])]),t("tr",null,[ot,t("td",null,a(e.modalOrderData.total),1)])])]),dt,t("table",lt,[nt,t("tbody",null,[(d(!0),l(p,null,D(e.modalOrderData.products,i=>(d(),l("tr",{key:i.id},[t("th",null,a(i.product.title),1),t("td",null,a(i.qty)+" / "+a(i.product.unit),1),t("td",it,a(i.final_total),1)]))),128))])]),t("div",rt,[t("div",ct,[y(t("input",{class:"form-check-input",type:"checkbox",value:"",id:"flexCheckDefault","onUpdate:modelValue":s[0]||(s[0]=i=>e.modalOrderData.is_paid=i)},null,512),[[k,e.modalOrderData.is_paid]]),t("label",ht,[e.modalOrderData.is_paid?(d(),l("span",_t,"已付款")):(d(),l("span",ut,"未付款"))])])])])]),t("div",mt,[pt,t("button",{type:"button",class:"btn btn-dark",onClick:s[1]||(s[1]=i=>o.$emit("updatePaid",e.modalOrderData))}," 修改付費狀態 ")])])])])],512)],64)}const bt=v(B,[["render",ft]]),{VITE_API_URL:b,VITE_API_PATH:g}={VITE_API_URL:"https://vue3-course-api.hexschool.io/v2/",VITE_API_PATH:"blacknwhiterabbit",BASE_URL:"/pnp-sideproject-vue-vite/",MODE:"production",DEV:!1,PROD:!0,SSR:!1},gt={components:{Pagination:I,DelModal:C,OrderModal:bt},data(){return{tempOrder:{},orders:[],pagination:{},orderModal:"",isLoading:!1,methods:""}},methods:{getOrdersData(o=1){this.isLoading=!0,this.$http.get(`${b}api/${g}/admin/orders/?page=${o}`).then(s=>{this.orders=s.data.orders,this.pagination=s.data.pagination,this.isLoading=!1}).catch(s=>{_.fire({icon:"error",title:s.response.data.message,showConfirmButton:!1,timer:1500}),this.isLoading=!1})},updateOrdersData(){this.isLoading=!0;let o=`${b}api/${g}/admin/order/${this.tempOrder.id}`,s="put";this.$http[s](o,{data:this.tempOrder}).then(h=>{this.$refs.orderModal.hide(),_.fire({icon:"success",title:h.data.message,showConfirmButton:!1,timer:1500}),this.getOrdersData(),this.isLoading=!1}).catch(h=>{_.fire({icon:"error",title:h.response.data.message,showConfirmButton:!1,timer:1500}),this.isLoading=!1})},delOrder(){this.isLoading=!0;const o=`${b}api/${g}/admin/order/${this.temporder.id}`;this.$http.delete(o).then(s=>{this.$refs.delModal.hide(),_.fire({icon:"success",title:s.data.message,showConfirmButton:!1,timer:1500}),this.getOrdersData(),this.isLoading=!1}).catch(s=>{_.fire({icon:"error",title:s.response.data.message,showConfirmButton:!1,timer:1500}),this.isLoading=!1})},openModal(o,s){o==="view"?(this.tempOrder={...s},this.$refs.orderModal.show()):o==="delete"&&(this.tempOrder={...s},this.$refs.delModal.show())},date(o){return new Date(o*1e3).toLocaleDateString()}},mounted(){this.getOrdersData()}},Dt=t("img",{src:M,alt:""},null,-1),vt={class:"container"},Ot={class:"card shadow-sm rounded-top mt-4"},yt=V('<div class="card-header bg-transparent pb-1"><div class="input-group"><span class="input-group-text border-0 bg-transparent ps-8 pe-1"><i class="bi bi-search"></i></span><input type="search" class="form-control border-0 shadow-none"></div></div>',1),kt={class:"card-body p-0"},Mt={class:"table-responsive"},wt={class:"table table-hover mb-0"},$t=t("thead",{class:"bg-primary-light"},[t("tr",{class:"align-middle"},[t("th",{scope:"col",class:"ps-4"}),t("th",{scope:"col",class:"py-3"},"購買時間"),t("th",{scope:"col"},"Email"),t("th",{scope:"col"},"購買款項"),t("th",{scope:"col"},"應付金額"),t("th",{scope:"col"},"是否付款"),t("th",{scope:"col",class:"pe-2"},"編輯")])],-1),Lt={class:"text-nowrap"},xt=t("td",null,null,-1),Ct={class:"list-unstyled"},Pt={class:"text-end"},Vt={class:"form-check form-switch"},Et=["id","onUpdate:modelValue","onChange"],It=["for"],Bt={key:0},St={key:1},At={class:"pe-2"},Ut={class:"btn-group"},Tt=["onClick"],Rt=["onClick"],Nt={class:"card-footer bg-transparent -mt-xs-1"};function jt(o,s,h,w,c,e){const f=u("VueLoading"),i=u("Pagination"),$=u("OrderModal"),L=u("DelModal");return d(),l(p,null,[m(f,{active:c.isLoading},{default:O(()=>[Dt]),_:1},8,["active"]),t("div",vt,[t("div",Ot,[yt,t("div",kt,[t("div",Mt,[t("table",wt,[$t,t("tbody",Lt,[(d(!0),l(p,null,D(c.orders,n=>(d(),l("tr",{class:E(["align-middle",{"text-secondary":!n.is_paid}]),key:n.id},[xt,t("td",null,a(e.date(n.create_at)),1),t("td",null,a(n.user.email),1),t("td",null,[t("ul",Ct,[(d(!0),l(p,null,D(n.products,r=>(d(),l("li",{key:r.id},a(r.product.title)+" 數量："+a(r.qty)+" "+a(r.product.unit),1))),128))])]),t("td",Pt,a(n.total),1),t("td",null,[t("div",Vt,[y(t("input",{class:"form-check-input",type:"checkbox",role:"switch",id:n.id,"onUpdate:modelValue":r=>n.is_paid=r,onChange:r=>o.updatePaid(n)},null,40,Et),[[k,n.is_paid]]),t("label",{class:"form-check-label",for:n.id},[n.is_paid?(d(),l("span",Bt,"已付款")):(d(),l("span",St,"未付款"))],8,It)])]),t("td",At,[t("div",Ut,[t("button",{type:"button",class:"btn btn-outline-gray-dark btn-sm",onClick:r=>e.openModal("view",n)}," 檢視 ",8,Tt),t("button",{type:"button",class:"btn btn-outline-danger btn-sm",onClick:r=>e.openModal("delete",n)}," 刪除 ",8,Rt)])])],2))),128))])])])]),t("div",Nt,[m(i,{pagination:c.pagination,"get-items":e.getOrdersData,onChangePage:e.getOrdersData},null,8,["pagination","get-items","onChangePage"])])])]),m($,{ref:"orderModal","temp-order":c.tempOrder,onUpdatePaid:e.updateOrdersData},null,8,["temp-order","onUpdatePaid"]),m(L,{ref:"delModal","temp-item":c.tempOrder,onDeleteItem:e.delOrder},null,8,["temp-item","onDeleteItem"])],64)}const Qt=v(gt,[["render",jt]]);export{Qt as default};