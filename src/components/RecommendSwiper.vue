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
    <SwiperSlide v-for="product in sortProducts" :key="product.id">
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
import { mapState, mapActions } from 'pinia';
import productsStore from '@/stores/productsStore.js'

import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay,Pagination} from 'swiper'

export default {
  data() {
    return {
      modules: [Autoplay,Pagination],
    }
  },
  methods: {
    ...mapActions( productsStore, ['getProducts'])
  },
  computed:{
    ...mapState( productsStore, ['sortProducts'])
  },
  components: {
    Swiper,
    SwiperSlide
  },
  mounted(){
    this.getProducts()
  }
}
  
</script>