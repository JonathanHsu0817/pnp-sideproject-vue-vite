<template>
  <div class="offcanvas offcanvas-end overflow-scroll" id="offcanvasShoppingCart" ref="cartOffcanvas">
    <div class="offcanvas-header pt-8 pb-md-10 pb-8">
      <div class="d-flex justify-content-between align-items-center">
        <i class="fas fa-shopping-cart text-primary fs-4 me-3"></i>
        <h5 id="#offcanvasShoppingCartLabel" class="fs-4 fw-bold mb-0">購物車</h5>
      </div>
      <button type="button" class="btn-close text-reset me-1" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div v-if="!carts.length" class="text-center mb-8">購物車沒有任何品項</div>
    <div v-for="cartItem in carts" :key="cartItem.id" class="cart-body px-3 font-monospace">
      <div class="cart-card d-flex align-items-center border-bottom border-1 pb-4 mb-4">
        <img class="cart-img object-position-top me-2 me-md-3" :src="cartItem.product.imageUrl" :alt="cartItem.product.title">
        <div class="card-content col-5">
          <p class="mb-2">{{ cartItem.product.title }}</p>
          <span class="text-primary">{{ `NT$ ${priceFormat(cartItem.product.price)}` }}</span>
        </div>
        <div class="cart-num col-2 ms-2 ms-md-3">
          <input type="number" class="cart-input text-center lh-1 py-3" id="cart-input" v-model.number="cartItem.qty"  @change="updateCart(cartItem)" :disabled="cartItem.id === loadingItem">
        </div>
        <a href="#" class="cart-delete d-block ms-4 ms-md-3" @click="delCart(cartItem.id)" :disabled="cartItem.id === loadingItem">
          <i v-if="cartItem.id === loadingItem" class="fas fa-spinner fa-pulse" ></i>
          <i v-else class="fas fa-trash-alt text-primary fs-4"></i>
        </a>
      </div>
    </div>
    <div class="cart-charge-content px-3 d-flex mb-16">
      <div class="d-flex align-items-center ms-auto">
        <h5 class="mb-0">小計金額</h5>
        <span class="cart-charge-total text-primary fs-6 ms-3">{{ `NT$ ${priceFormat(1)}` }}</span>
      </div>
    </div>
    <div class="cart-footer px-3 font-monospace">
      <div class="d-flex flex-column">
        <a href="#" class="js-confirm btn btn-primary text-white round-0 py-3 mb-6">加點</a>
        <a href="#" class="js-deleteAllCart btn btn-outline-secondary border-0 round-0 align-self-center py-2 px-4 mb-4" @click="delCarts()">清空購物車</a>
      </div>
    </div>
  </div>
</template>

<script>
import Offcanvas from 'bootstrap/js/dist/offcanvas.js'

import { mapState, mapActions } from 'pinia';
import cartStore from '@/stores/cartStore.js'

export default {
  data() {
    return {
      cartOffcanvas: '',
    }
  },
  methods: {
    show(){
      this.cartOffcanvas.show()
    },
    hide(){
      this.cartOffcanvas.hide()
    },
    priceFormat(price){
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    ...mapActions(cartStore, ['getCart','delCart', 'updateCart','delCarts']),

  },
  mounted() {
    this.cartOffcanvas = new Offcanvas(this.$refs.cartOffcanvas)
    this.getCart()
  },
  computed: {
    ...mapState(cartStore, ['carts','loadingItem'])
  }
}
</script>