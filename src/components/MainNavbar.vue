<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-primary py-3">
    <div class="container">
      <button class="btn btn-primary" type="button" @click="openCanvas">
        <i class="fas fa-bars text-white fs-4"></i>
      </button>
      <h1 class="mb-0 lh-1 pb-1"><a class="navbar-brand me-0" href="#"><img src="https://raw.githubusercontent.com/JonathanHsu0817/pnp-sideproject-vue-vite/50c90f0d43b9d9a02c615d063406e45a35470573/public/Logo.svg" alt=""></a></h1>
      <button class="btn btn-shopping-cart btn-circle bg-white" type="button">
        <i class="fas fa-shopping-cart text-primary fs-4"></i>
      </button>
    </div>
  </nav>
  

  <div class="offcanvas offcanvas-start" ref="offcanvas">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasExampleLabel">Offcanvas</h5>
      <button type="button" class="btn-close" @click="closeCanvas"></button>
    </div>
    <div class="offcanvas-body">
      <div>
        Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.
      </div>
    </div>
  </div>
</template>

<script>
import Offcanvas from 'bootstrap/js/dist/offcanvas.js'

export default {
  data() {
    return {
      offcanvas: '',
    }
  },
  methods: {
    openCanvas(){
      this.offcanvas.show();
    },
    closeCanvas(){
      this.offcanvas.hide();
    },
  },
  mounted() {
    this.offcanvas = new Offcanvas(this.$refs.offcanvas)
  }
}
</script>

