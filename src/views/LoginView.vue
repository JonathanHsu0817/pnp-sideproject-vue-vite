<template>
  <div class="container mt-4">
    <div class="row justify-content-center">
      <h1 class="h3 mb-3 text-center font-weight-normal">
        請先登入
      </h1>
      <div class="col-8">
        <form id="form" class="form-signin" @submit.prevent="login">
          <div class="form-floating mb-3">
            <input type="email" class="form-control" id="username"
              placeholder="name@example.com" v-model="user.username" required autofocus>
            <label for="username">Email address</label>
          </div>
          <div class="form-floating">
            <input type="password" class="form-control" id="password"
            placeholder="Password" v-model="user.password" required>
            <label for="password">Password</label>
          </div>
          <button class="btn btn-lg btn-primary w-100 mt-3" type="submit">
            登入
          </button>
        </form>
      </div>
    </div>
  </div>
  
</template>

<style>
  .form-signin {
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: auto;
    }
</style>

<script>
  export default {
    data() {
      return {
        user: {  
          username:``,
          password:``
        }
      };
    },
    methods: {
      login() {
        const api = `${import.meta.env.VITE_API_URL}admin/signin`;
        this.$http.post(api, this.user)
          .then(res => {
            const { token, expired } = res.data;
            document.cookie = `hexToken=${token}; expires=${new Date(expired)}`
            this.$router.push('/admin/products')
          })
          .catch(err => {
            alert(err.response.data.message);
          })
      }
    }
  }
</script>