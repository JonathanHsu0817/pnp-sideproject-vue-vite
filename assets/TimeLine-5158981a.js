import{_ as c,o,c as i,b as e,n as s}from"./index-f10cf98c.js";const n={props:["step"],computed:{stepCheck(){return this.step===2||this.step===3?"active":""},stepComplete(){return this.step===3?"active":""}}},l={class:"order-process pt-4 pb-3 mb-3 mb-lg-7"},r={class:"container"},d=e("div",{class:"row justify-content-center"},[e("div",{class:"col-8 col-md-7 timeline"})],-1),p={class:"row"},_=e("div",{class:"col-4 col-md-5"},[e("div",{class:"timeline-pointer text-center step-1 active"},[e("p",null,"購物車")])],-1),a={class:"col-4 col-md-2"},m=e("p",null,"確認結帳",-1),h=[m],v={class:"col-4 col-md-5"},u=e("p",null,"訂單成立",-1),f=[u];function x(C,b,k,B,w,t){return o(),i("section",l,[e("div",r,[d,e("div",p,[_,e("div",a,[e("div",{class:s(["timeline-pointer text-center step-2",t.stepCheck])},h,2)]),e("div",v,[e("div",{class:s(["timeline-pointer text-center step-3",t.stepComplete])},f,2)])])])])}const $=c(n,[["render",x]]);export{$ as T};