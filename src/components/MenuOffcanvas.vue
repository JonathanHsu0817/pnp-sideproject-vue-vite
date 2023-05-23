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
          <RouterLink to="/products" class="d-block d-flex justify-content-center align-items-end btn border-0 fs-5 fw-bold mb-9">全部餐點
            <span class="link-primary fs-6 fw-normal ms-3">All</span></RouterLink>
        </li>
        <li>
          <a href="#" class="d-block d-flex justify-content-center align-items-end btn border-0 fs-5 fw-bold mb-9">前菜<span class="link-primary fs-6 fw-normal ms-3">Appetizer</span></a></li>
        <li>
          <a href="#" class="d-block d-flex justify-content-center align-items-end btn border-0 fs-5 fw-bold mb-9">抱食主菜<span class="link-primary fs-6 fw-normal ms-3">Sharing Courses</span></a></li>
        <li>
          <a href="#" class="d-block d-flex justify-content-center align-items-end btn border-0 fs-5 fw-bold mb-9">主廚精選<span class="link-primary fs-6 fw-normal ms-3">Delicate Courses</span></a></li>
        <li>
          <a href="#" class="d-block d-flex justify-content-center align-items-end btn border-0 fs-5 fw-bold mb-9">配菜<span class="link-primary fs-6 fw-normal ms-3">Side Dishes</span></a></li>
        <li>
          <a href="#" class="d-block d-flex justify-content-center align-items-end btn border-0 fs-5 fw-bold mb-9">甜點<span class="link-primary fs-6 fw-normal ms-3">Dessert</span></a></li>
        <li>
          <a href="#" class="d-block d-flex justify-content-center align-items-end btn border-0 fs-5 fw-bold">飲料 & 酒<span class="link-primary fs-6 fw-normal ms-3">Beverages</span></a></li>
      </ul>
    </div>
  </div>
</template>

<script>
import Offcanvas from 'bootstrap/js/dist/offcanvas.js'

export default {
  data() {
    return {
      offcanvas: '',
      productsCategory: ''
    }
  },
  methods: {
    show(){
      this.offcanvas.show();
    },
    hide(){
      this.offcanvas.hide();
    },
  },
  mounted() {
    this.offcanvas = new Offcanvas(this.$refs.offcanvas)
  }
}
</script>

