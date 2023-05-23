<template>
  <Swiper
    :slides-per-view="2"
    :space-between="18"
    :loop="true"
    :speed="500"
    :centered-slides="true"
    :autoplay="{
      delay: 3000,
      disableOnInteraction: false,
    }"
    :pagination="{
      clickable: true,
    }"
    :breakpoints="{
      '768': {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4.3
      }
    }"
    :modules="modules"
    class="index-swiper"
  >
    <SwiperSlide v-for="product in products" :key="product.id">
      <RouterLink :to="`/product/${product.id}`" class="img-info d-block">
        <img :src="product.imageUrl" class="img-fluid rounded-3" :alt="product.imageUrl">
        <div class="img-info-background bg-transparent opacity-0">
          <div class="img-info-content justify-content-end">
            <h4 class="fs-5 display-lg-6 fs-xxl-1 lh-1 mb-0">{{product.title}}</h4>
          </div>
        </div>
      </RouterLink>
    </SwiperSlide>
  </Swiper>
  
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay,Pagination} from 'swiper'
import { Toast } from '@/methods/toast.js'

const { VITE_API_URL,VITE_API_PATH } = import.meta.env;

export default {
  data() {
    return {
      modules: [Autoplay,Pagination],
      products: [],
      product: {}
    }
  },
  components: {
    Swiper,
    SwiperSlide
  },
  methods: {
    getProducts() {
      // this.isLoading = true
      this.$http.get(`${VITE_API_URL}/api/${VITE_API_PATH}/products`)
        .then(res => {
          console.log(res.data)
          this.products = res.data.products
        })
        .catch(err => Toast(err.response.data.message, 'error'))
      }
    },
  mounted(){
    this.getProducts()
  }
}
  
</script>