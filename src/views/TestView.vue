<template>
  <div class="container">
    測試
    <button class="btn btn-primary">按鈕測試</button>
  </div>
</template>

<script>

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
    }
  },
  mounted() {
    this.getData();
  }
}
</script>