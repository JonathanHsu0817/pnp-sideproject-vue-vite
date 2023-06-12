<template>
  <VueLoading :active="isLoading">
    <img src="@/assets/loading.svg" alt="">
  </VueLoading>
  <section class="bg-backStage pb-10">
    <div class="container-xl ps-md-0 overflow-hidden">
      <div class="row productsContent">
        <div class="col-md-6 col-lg-5 pe-md-0">
          <div class="overflow-hidden">
            <img :src="product.imageUrl" class="img-fluid " :alt="product.title">
          </div>
        </div>
        <div class="col-md-6 col-lg-7" >
          <div class="description d-flex flex-column h-100 text-primary px-0 px-lg-3 pb-3" >
            <p class="text-secondary mt-3 mb-2">{{ product.category }}</p>
            <h2 class="description-title text-primary mb-5">{{ product.title }}</h2>
            <p class="description-content fs-7 fs-lg-6 text-black mb-5">{{ product.description }}</p>
            <h3 class="fs-7 text-black mb-auto"><i class="fas fa-genderless"></i> {{ `主食材：${product.content}` }}</h3>
            <p class="mb-3 fs-4">NT$ {{ (product.price) }}</p>
            <div class="input-group border border-primary mb-0">
              <div class="input-group-prepend">
                <button class="btn btn-outline-primary btn-text-primary1 border-0 border-end border-primary py-3" type="button" id="button-addon1" @click="btnMinus">
                  <i class="fas fa-minus"></i>
                </button>
              </div>
              <input type="text" class="form-control border-0 text-center text-primary my-0 shadow-none" min="1" max="10" v-model="qty">
              <div class="input-group-append">
                <button class="btn btn-outline-primary btn-text-primary1 border-0 border-start border-primary py-3" type="button" id="button-addon2" @click="btnAdd">
                  <i class="fas fa-plus"></i>
                </button>
              </div>
            </div>
            <a href="#" class="btn btn-outline-primary btn-text-primary1 py-3 -mt-xs-1" @click.prevent="addToCart(product.id,qty)">加入購物車</a>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section>
    <div class="container py-11">
      <nav class="mb-4">
        <div class="d-flex justify-content-between">
          <h3 class="font-monospace fs-4 fs-md-3 mb-0">推薦餐點 <span class="text-primary fs-7 font-normal">Recommend Dishes</span></h3>
        </div>
      </nav>
      <RecommendSwiper ></RecommendSwiper>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import productsStore from '@/stores/productsStore.js'
import cartStore from '@/stores/cartStore.js'

import RecommendSwiper from '@/components/RecommendSwiper.vue'
import { Toast } from '@/methods/toast.js'

const { VITE_API_URL,VITE_API_PATH } = import.meta.env;

export default {
  components: {
    RecommendSwiper
  },
  data () {
    return {
      product: {},
      qty: 1,
      isLoading: false,
      allImagesUrl: [],
      // category: '',
      // products: [] //傳給recommendSwiper
    }
  },
  methods: {
    priceFormat(price){
      return price.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    btnMinus(){
      if( this.qty == 1 ){
        return
      }
      return this.qty--
    },
    btnAdd(){
      if( this.qty == 10 ){
        return
      }
      return this.qty++
    },
    ...mapActions ( cartStore, ['addToCart']),
    ...mapActions ( productsStore, ['filterProducts']),
    //取單一產品
    getProduct() {
      this.isLoading = true
      const { id } = this.$route.params
      this.$http.get(`${VITE_API_URL}/api/${VITE_API_PATH}/product/${id}`)
        .then(res => {
          this.product = res.data.product
          console.log(this.product)
          this.getProductCategory()
          this.isLoading = false
        })
        .catch(err => {
          Toast(err.response.data.message, 'error')
          this.isLoading = false
        })
    },
    getProductCategory() {
      const { category } = this.product;
      this.filterProducts( category );
    }
  },
  computed: {
    ...mapState( cartStore, ['loadingItem']),
  },
  mounted(){
    this.getProduct()
  }
}
</script>