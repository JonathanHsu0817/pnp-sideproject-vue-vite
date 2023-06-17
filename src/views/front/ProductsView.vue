<template>
  <VueLoading :active="isLoading">
    <img src="@/assets/loading.svg" alt="">
  </VueLoading>
  <section class="menu bg-backStage">
    <div class="container">
      <nav>
        <div class="d-flex justify-content-center py-7">
          <h2 class="nav-title mb-0 pb-2">熱門餐點 <span class="font-monospace text-primary fs-7">Popular Dishes</span></h2>
        </div>
      </nav>
      <div class="row mb-0">
        <div class="col-md-4 col-sm-6 mb-6" v-for="product in sortProducts" :key="product.id">
          <div class="card border-0 shadow h-100">
            <RouterLink :to="`/product/${product.id}`" class="img-info img-top d-block overflow-hidden">
              <img :src="product.imageUrl" class="img-fluid" :alt="product.title">
              <p class="img-info-link fs-6 mb-0 py-2 bg-primary text-white text-center">查看商品</p>
            </RouterLink>
            <div class="card-body p-3 p-lg-4 d-flex flex-column">
              <div class="d-flex mb-2 mb-lg-4">
                <p class="mb-0"><span class="badge bg-secondary text-white fw-normal fs-8 fs-lg-7">{{ product.category }}</span></p>
              </div>
              <h3 class="card-title fs-4 fw-bold text-gray-dark mb-3">{{ product.title }}</h3>
              <div class="d-flex justify-content-between align-items-center flex-wrap mt-auto">
                <p class="card-text text-primary fw-bold fs-5 mb-0">{{ `NT$ ${priceFormat(product.price)}` }}</p>
                <button type="button" class="btn btn-outline-primary btn-text-primary btn-sm py-2"
                  @click.prevent="addToCart(product.id)">加入購物車
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Pagination :pagination="pagination" @change-page="getProducts" class="pb-6"></Pagination>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import productsStore from '@/stores/productsStore.js'
import cartStore from '@/stores/cartStore.js'
import Pagination from '@/components/PaginationComponent.vue';

export default {
  components:{
    Pagination
  },
  methods: {
    priceFormat(price){
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    ...mapActions( cartStore, ['addToCart']),
    ...mapActions( productsStore, ['getProducts'])
  },
  computed: {
    ...mapState( productsStore, ['sortProducts','pagination','isLoading'])
  },
  mounted(){
    this.getProducts()
  }
}
</script>