<template>
  <DashBoardNavbar></DashBoardNavbar>
  <RouterView v-if="status"></RouterView>
</template>

<script>
import DashBoardNavbar from '../components/DashBoardNavbar.vue'
const { VITE_API_URL } = import.meta.env;

export default {
  components: {
    DashBoardNavbar
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
            this.status = false;
          }
        })
        .catch(() => {
          alert("錯誤訊息，請重新登入")
          this.$router.push(`/`)
        })
    },
  },
  mounted(){
    this.checkLogin();
  }
}
</script>