import{S as l,_ as m}from"./loading-7aff74c7.js";import{_ as p,r as _,o as f,c as h,a as g,w,b as e,d as v,e as d,v as c,F as b}from"./index-ba560a6d.js";const{VITE_API_URL:x}={VITE_API_URL:"https://vue3-course-api.hexschool.io/v2/",VITE_API_PATH:"blacknwhiterabbit",BASE_URL:"/pnp-sideproject-vue-vite/",MODE:"production",DEV:!1,PROD:!0,SSR:!1},L={data(){return{user:{username:"",password:""},isLoading:!1}},methods:{login(){this.isLoading=!0;const i=`${x}admin/signin`;this.$http.post(i,this.user).then(s=>{const{token:n,expired:r,message:o}=s.data;document.cookie=`hexToken=${n}; expires=${new Date(r)}`,l.fire({icon:"success",title:o,showConfirmButton:!1,timer:1500}),this.$router.push("/admin/products"),this.isLoading=!1}).catch(s=>{l.fire({icon:"error",title:s.response.data.message,showConfirmButton:!1,timer:1500}),this.isLoading=!1})}}},V=e("img",{src:m,alt:""},null,-1),E={class:"container vh-100"},y={class:"row justify-content-center align-items-center h-100"},P={class:"col-8"},k=e("h1",{class:"h3 mb-3 text-center font-weight-normal"}," 請先登入 ",-1),B={class:"form-floating mb-3"},I=e("label",{for:"username"},"Email address",-1),S={class:"form-floating"},T=e("label",{for:"password"},"Password",-1),A=e("button",{class:"btn btn-lg btn-primary w-100 mt-3",type:"submit"}," 登入 ",-1);function D(i,s,n,r,o,a){const u=_("VueLoading");return f(),h(b,null,[g(u,{active:o.isLoading},{default:w(()=>[V]),_:1},8,["active"]),e("div",E,[e("div",y,[e("div",P,[k,e("form",{id:"form",class:"form-signin",onSubmit:s[2]||(s[2]=v((...t)=>a.login&&a.login(...t),["prevent"]))},[e("div",B,[d(e("input",{type:"email",class:"form-control",id:"username",placeholder:"name@example.com","onUpdate:modelValue":s[0]||(s[0]=t=>o.user.username=t),required:"",autofocus:""},null,512),[[c,o.user.username]]),I]),e("div",S,[d(e("input",{type:"password",class:"form-control",id:"password",placeholder:"Password","onUpdate:modelValue":s[1]||(s[1]=t=>o.user.password=t),required:""},null,512),[[c,o.user.password]]),T]),A],32)])])])],64)}const C=p(L,[["render",D]]);export{C as default};
