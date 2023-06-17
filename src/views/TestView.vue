<template>
  <div class="container">
    測試
    <button class="btn btn-primary">按鈕測試</button>
  </div>
</template>

<script>
const { VITE_API_URL,VITE_API_PATH } = import.meta.env;
export default {
  data() {
    return {
      userData: [],
    };
  },
  methods: {
    getData(){
      this.$http.get(`https://randomuser.me/api/`)
        .then(res => {
          console.log(res)
        })
    },
    getCart () {
      this.$http.get(`${VITE_API_URL}/api/${VITE_API_PATH}/cart`)
        .then(res => {
          console.log(res.data)
        })
        .catch(err => console.log(err))
    },
  },
  mounted() {
    this.getData();
    this.getCart();
  }
}
</script>