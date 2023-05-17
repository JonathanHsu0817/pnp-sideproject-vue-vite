<template>
  <VueLoading :active="isLoading">
    <img src="@/assets/loading.svg" alt="">
  </VueLoading>
  <div class="container vh-100">
    <div class="row justify-content-center align-items-center h-100">
      <div class="col-8">
        <h1 class="h3 mb-3 text-center font-weight-normal">
        請先登入
        </h1>
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
  .loading{
    width: 100px;
    height: 100px;
    margin: 20px;
    display:inline-block;
  }
  .form-signin {
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: auto;
    }
</style>

<script>
  import Swal from 'sweetalert2'
  const { VITE_API_URL } = import.meta.env

  export default {
    data() {
      return {
        user: {  
          username:``,
          password:``
        },
        isLoading: false
      };
    },
    methods: {
      login() {
        this.isLoading = true
        const api = `${VITE_API_URL}admin/signin`;
        this.$http.post(api, this.user)
          .then(res => {
            const { token, expired, message } = res.data;
            document.cookie = `hexToken=${token}; expires=${new Date(expired)}`
            Swal.fire({
              icon: 'success',
              title: message,
              showConfirmButton: false,
              timer: 1500
            })
            this.$router.push('/admin/products')
            this.isLoading = false
          })
          .catch(err => {
            Swal.fire({
              icon: 'error',
              title: err.response.data.message,
              showConfirmButton: false,
              timer: 1500
            })
            this.isLoading = false
          })
      }
    }
  }
</script>