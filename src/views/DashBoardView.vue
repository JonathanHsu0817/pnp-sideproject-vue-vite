<template>
  <div class="d-flex" :class="{'sidebar-toggled': isOpened }">
    <aside class="sidebar vh-100 border-end d-flex bg-white flex-column">
      <!-- 1. 後台名稱 -->
      <router-link to="/admin/products" class="d-block px-5 pb-2 bg-primary ">
        <h1 class="mb-0 lh-1">
          <img src="https://raw.githubusercontent.com/JonathanHsu0817/pnp-sideproject-vue-vite/50c90f0d43b9d9a02c615d063406e45a35470573/public/Logo.svg" width="104" alt="">
          <span class="fs-6 text-white">- 後台管理</span></h1>
      </router-link>
      <!-- 2. 選單 -->
      <div class="overflow-auto">
        <div>
          <a href="#" class="sidebar-link" id="btn-collapse" @click.prevent="menuToggle">
            <div class="d-flex justify-content-between align-items-center px-5">
              <p class="mb-0">
                訂單管理
              </p>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down" viewBox="0 0 16 16">
                <path d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z"/>
              </svg>
            </div>
          </a>
          <div class="collapse" id="menu-order">
            <router-link to="/admin/orders" class="sidebar-link">
              <div class="ps-9">
                訂單列表
              </div>
            </router-link>
            <!-- <a href="#" class="sidebar-link active">
              
            </a> -->
            <!-- <a href="#" class="sidebar-link">
              <div class="ps-9">
                單一訂單細節
              </div>
            </a> -->
          </div>
        </div>

        <div>
          <router-link to="/admin/products" class="sidebar-link">
            <div class="px-5">
              產品列表
            </div>
          </router-link>
        </div>

        <div>
          <router-link to="/admin/coupons" class="sidebar-link">
            <div class="px-5">
              優惠券管理
            </div>
          </router-link>
        </div>
      </div>
      <!-- 3. 登出按鈕 -->
      <a href="#" @click.prevent="logout" class="sidebar-link mt-auto">
        <div class="px-5">
          登出按鈕
        </div>
      </a>
    </aside>
    <main class="main">
      <div class="bg-white w-100 border-bottom sticky-top">
        <a href="#"
          class="d-inline-block py-4 px-5 border-end" @click.prevent="isOpened = !isOpened">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrows-angle-expand" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707z"/>
          </svg>
        </a>
      </div>
      <!-- 主要內容-->
      <div class="p-5">
        <RouterView v-if="status"></RouterView>
      </div>
    </main>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import Collapse from 'bootstrap/js/dist/collapse.js';
const { VITE_API_URL } = import.meta.env;

export default {
  data() {
    return {
      status: false,
      isOpened: false,
      orderToggle: '',
      isLoading: false,
    }
  },
  methods: {
    checkLogin() {
      const api = `${ VITE_API_URL }/api/user/check`;
      this.$http.post(api)
        .then(() => {
          this.status = true
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: err.response.data.message,
            showConfirmButton: false,
            timer: 1500
          })
          this.$router.push(`/`)
        })
    },
    logout(){
      document.cookie = `hexschool=; expires=${new Date()}`;
      this.$router.push('/');
    },
    menuToggle(){
      this.orderToggle.toggle()
    }
  },
  mounted(){
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    this.$http.defaults.headers.common.Authorization = `${token}`;
    if(token){
      this.checkLogin();
    }else{
      Swal.fire({
        icon: 'error',
        title: '請重新登入',
        showConfirmButton: false,
        timer: 1500
      })
      this.$router.push('/')
    }
    this.orderToggle = new Collapse('#menu-order',{
      toggle:true
    })
  }
}
</script>