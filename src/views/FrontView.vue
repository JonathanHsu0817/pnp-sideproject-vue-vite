<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-primary py-3">
    <div class="container-fluid">
      <button class="btn btn-primary me-9 me-md-10" type="button" @click="open">
        <i class="fas fa-bars text-white fs-4"></i>
      </button>
      <h1 class="navbar-brand mb-0 me-0">
        <RouterLink to="/">
          <img src="https://raw.githubusercontent.com/JonathanHsu0817/pnp-sideproject-vue-vite/50c90f0d43b9d9a02c615d063406e45a35470573/public/Logo.svg" alt="">
        </RouterLink>
      </h1>
      
      <div class="d-flex align-center">
        <RouterLink to="/login" class="btn btn-primary me-md-2 pt-2 pb-1"><i class="fas fa-user text-white fs-3"></i></RouterLink>
        <button class="btn btn-shopping-cart btn-circle bg-white" type="button" @click="openCart">
          <i class="fas fa-shopping-cart text-primary fs-4"></i>
        </button>
      </div>
    </div>
  </nav>
  <MenuOffcanvas ref="offcanvas"></MenuOffcanvas>
  <CartOffcanvas ref="cartOffcanvas"></CartOffcanvas>
  <RouterView></RouterView>
  <FooterComp></FooterComp>
</template>

<script>
import MenuOffcanvas from '@/components/MenuOffcanvas.vue'
import CartOffcanvas from '@/components/CartOffcanvas.vue'
import FooterComp from '@/components/FooterView.vue'

export default {
  components:{
    MenuOffcanvas,CartOffcanvas,FooterComp
  },
  data() {
    return {
      offcanvas: '',
    }
  },
  methods: {
    open(){
      this.$refs.offcanvas.show();
    },
    openCart(){
      this.$refs.cartOffcanvas.show();
    },
  }
}
</script>