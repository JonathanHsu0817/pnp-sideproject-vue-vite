<template>
  <div class="offcanvas offcanvas-start" ref="offcanvas">
    <div class="offcanvas-header py-8 pb-md-8">
      <button class="btn btn-white me-9 me-md-10" type="button" @click="hide">
        <i class="fas fa-bars text-primary fs-4"></i>
      </button>
    </div>
    <div class="offcanvas-body">
      <ul class="menu-list list-unstyled mb-0">
        <li class="d-block d-flex justify-content-center align-items-end fs-5 fw-bold mb-11">菜單<span class="text-primary fs-6 fw-normal ms-3">Menu</span></li>
        <li>
          <RouterLink to="/products" class="d-block d-flex justify-content-center align-items-end btn border-0 fs-5 fw-bold mb-9" :class="`${category === '' ? 'active' : ''}`" @click.prevent="filterProducts(''),hide()">全部餐點
            <span class="link-primary fs-6 fw-normal ms-3">All</span></RouterLink>
        </li>
        <li>
          <RouterLink to="/products" class="d-block d-flex justify-content-center align-items-end btn border-0 fs-5 fw-bold mb-9" :class="`${category === '前菜' ? 'active' : ''}`" @click.prevent="filterProducts('前菜'),hide()">前菜<span class="link-primary fs-6 fw-normal ms-3">Appetizer</span></RouterLink></li>
        <li>
          <RouterLink to="/products" class="d-block d-flex justify-content-center align-items-end btn border-0 fs-5 fw-bold mb-9" :class="`${category === '抱食主菜' ? 'active' : ''}`" @click.prevent="filterProducts('抱食主菜'),hide()">抱食主菜<span class="link-primary fs-6 fw-normal ms-3">Sharing Courses</span></RouterLink></li>
        <li>
          <RouterLink to="/products" class="d-block d-flex justify-content-center align-items-end btn border-0 fs-5 fw-bold mb-9" :class="`${category === '主廚精選' ? 'active' : ''}`" @click.prevent="filterProducts('主廚精選'),hide()">主廚精選<span class="link-primary fs-6 fw-normal ms-3">Delicate Courses</span></RouterLink></li>
        <li>
          <RouterLink to="/products" class="d-block d-flex justify-content-center align-items-end btn border-0 fs-5 fw-bold mb-9" :class="`${category === '配菜' ? 'active' : ''}`" @click.prevent="filterProducts('配菜'),hide()">配菜<span class="link-primary fs-6 fw-normal ms-3">Side Dishes</span></RouterLink></li>
        <li>
          <RouterLink to="/products" class="d-block d-flex justify-content-center align-items-end btn border-0 fs-5 fw-bold mb-9" :class="`${category === '甜點' ? 'active' : ''}`" @click.prevent="filterProducts('甜點'),hide()">甜點<span class="link-primary fs-6 fw-normal ms-3">Dessert</span></RouterLink></li>
        <li>
          <RouterLink to="/products" class="d-block d-flex justify-content-center align-items-end btn border-0 fs-5 fw-bold" :class="`${category === '飲料及酒' ? 'active' : ''}`" @click.prevent="filterProducts('飲料及酒'),hide()">飲料 & 酒<span class="link-primary fs-6 fw-normal ms-3">Beverages</span></RouterLink></li>
      </ul>
    </div>
  </div>
</template>

<script>
import Offcanvas from 'bootstrap/js/dist/offcanvas.js'
import { mapActions, mapState } from 'pinia';
import productsStore from '@/stores/productsStore.js'

export default {
  data() {
    return {
      offcanvas: '',
    }
  },
  methods: {
    show(){
      this.offcanvas.show();
    },
    hide(){
      this.offcanvas.hide();
    },
    ...mapActions( productsStore, ['filterProducts'] ),
  },
  mounted() {
    this.offcanvas = new Offcanvas(this.$refs.offcanvas)
  },
  computed: {
    ...mapState( productsStore, ['category','getProducts'] )
  }
}
</script>

