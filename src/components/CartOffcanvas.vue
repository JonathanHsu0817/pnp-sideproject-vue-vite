<template>
  <div class="offcanvas offcanvas-end overflow-scroll" id="offcanvasShoppingCart" ref="cartOffcanvas">
    <div class="offcanvas-header pt-8 pb-md-10 pb-8">
      <div class="d-flex justify-content-between align-items-center">
        <i class="fas fa-shopping-cart text-primary fs-4 me-3"></i>
        <h5 id="#offcanvasShoppingCartLabel" class="fs-4 fw-bold mb-0">購物車</h5>
      </div>
      <button type="button" class="btn-close text-reset me-1" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="cart-body px-3 font-monospace">
      <!-- <div class="cart-card d-flex align-items-center border-bottom border-1 pb-4 mb-4">
        <img class="cart-img object-position-top me-2 me-md-3" src="./assets/images/rib-eye-steak.png" alt="steak">
        <div class="card-content col-5">
          <p class="mb-2">20oz肋眼牛排（5分熟)</p>
          <span class="text-primary">NT$1,190</span>
        </div>
        <div class="cart-num col-2 ms-2 ms-md-3">
          <input type="number" class="cart-input text-center lh-1 py-3  " id="cart-input" value="1">
        </div>
        <a href="#" class="cart-delete d-block ms-4 ms-md-3"><i class="fas fa-trash-alt text-primary fs-4"></i></a>
      </div>
      <div class="cart-card d-flex align-items-center border-bottom border-1 pb-4 mb-4">
        <img class="cart-img object-position-top me-2 me-md-3" src="./assets/images/spinach.png" alt="spinach">
        <div class="card-content col-5">
          <p class="mb-2">奶油燉菠菜</p>
          <span class="text-primary">NT$190</span>
        </div>
        <div class="cart-num col-2 ms-2 ms-md-3">
          <input type="number" class="cart-input text-center lh-1 py-3  " id="cart-input" value="1">
        </div>
        <a href="#" class="cart-delete d-block ms-4 ms-md-3"><i class="fas fa-trash-alt text-primary fs-4"></i></a>
      </div>
      <div class="cart-card d-flex align-items-center border-bottom border-1 pb-4 mb-4">
        <img class="cart-img object-position-top me-2 me-md-3" src="./assets/images/mushroom.png" alt="mushroom">
        <div class="card-content col-5">
          <p class="mb-2">白酒炒蘑菇</p>
          <span class="text-primary">NT$250</span>
        </div>
        <div class="cart-num col-2 ms-2 ms-md-3">
          <input type="number" class="cart-input text-center lh-1 py-3  " id="cart-input" value="1">
        </div>
        <a href="#" class="cart-delete d-block ms-4 ms-md-3"><i class="fas fa-trash-alt text-primary fs-4"></i></a>
      </div>
      <div class="cart-card d-flex align-items-center border-bottom border-1 pb-4 mb-4">
        <img class="cart-img object-position-top me-2 me-md-3" src="./assets/images/coffee_ice.png" alt="coffee_ice">
        <div class="card-content col-5">
          <p class="mb-2">美式咖啡(冰)</p>
          <span class="text-primary">NT$80</span>
        </div>
        <div class="cart-num col-2 ms-2 ms-md-3">
          <input type="number" class="cart-input text-center lh-1 py-3  " id="cart-input" value="1">
        </div>
        <a href="#" class="cart-delete d-block ms-4 ms-md-3"><i class="fas fa-trash-alt text-primary fs-4"></i></a>
      </div>
      <div class="cart-charge-content d-flex mb-16">
        <div class="d-flex align-items-center ms-auto">
          <h5 class="mb-0">小計金額</h5>
          <span class="cart-charge-total text-primary fs-6 ms-3">NT$1,610</span>
        </div>
      </div> -->
    </div>
    <div class="cart-footer px-3 font-monospace">
      <div class="d-flex flex-column">
        <a href="#" class="js-confirm btn btn-primary text-white round-0 py-3 mb-6">加點</a>
        <a href="#" class="js-deleteAllCart btn btn-outline-secondary border-0 round-0 align-self-center py-2 px-4 mb-4">清空購物車</a>
      </div>
    </div>
  </div>
</template>

<script>
import Offcanvas from 'bootstrap/js/dist/offcanvas.js'

export default {
  data() {
    return {
      cartOffcanvas: '',
    }
  },
  methods: {
    show(){
      this.cartOffcanvas.show();
    },
    hide(){
      this.cartOffcanvas.hide();
    },
  },
  mounted() {
    this.cartOffcanvas = new Offcanvas(this.$refs.cartOffcanvas)
  }
}
</script>