<template>
  這是後台頁面
  <a href="#" @click.prevent="logout">登出</a>
  <Navbar></Navbar>
</template>

<script>
import Navbar from '../components/MainNavbar.vue'

const { VITE_API_URL } = import.meta.env;

export default {
  components: {
    Navbar
  },
  data() {
    return {
      status: false,
    }
  },
  methods: {
    checkLogin() {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
      this.$http.defaults.headers.common.Authorization = `${token}`;
      const api = `${ VITE_API_URL }/api/user/check`;
      this.$http.post(api)
        .then(res => {
          if(!res.data.success){
            alert("請再重新登入一次")
            this.$router.push(`/`)
          }
        })
        .catch(() => {
          alert("錯誤訊息，請重新登入")
          this.$router.push(`/`)
        })
    },
    logout(){
      document.cookie = `hexschool=; expires=${new Date()}`;
      this.$router.push('/');
    }
  },
  mounted(){
    this.checkLogin();
  }
}
</script>