import{_ as e,o as a,c as o,a as s,b as c}from"./index-f10cf98c.js";const{VITE_API_URL:n,VITE_API_PATH:r}={VITE_API_URL:"https://vue3-course-api.hexschool.io/v2",VITE_API_PATH:"blacknwhiterabbit",BASE_URL:"/pnp-sideproject-vue-vite/",MODE:"production",DEV:!1,PROD:!0,SSR:!1},i={data(){return{userData:[]}},methods:{getData(){this.$http.get("https://randomuser.me/api/").then(t=>{console.log(t)})},getCart(){this.$http.get(`${n}/api/${r}/cart`).then(t=>{console.log(t.data)}).catch(t=>console.log(t))}},mounted(){this.getData(),this.getCart()}},_={class:"container"},p=c("button",{class:"btn btn-primary"},"按鈕測試",-1);function h(t,d,l,u,g,m){return a(),o("div",_,[s(" 測試 "),p])}const E=e(i,[["render",h]]);export{E as default};
