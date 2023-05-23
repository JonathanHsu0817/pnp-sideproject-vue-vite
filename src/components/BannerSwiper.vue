<template>
  <Swiper
    :slides-per-view="2"
    :space-between="18"
    :loop="true"
    :speed="6000"
    :centered-slides="true"
    :autoplay="{
      delay: 0,
      disableOnInteraction: false,
    }"
    :breakpoints="{
      '768': {
        slidesPerView: 3,
      },
      '992': {
        slidesPerView: 4,
      },
      '1080': {
        slidesPerView: 5,
      }
    }"
    :modules="modules"
    class="banner-swiper"
  >
    <SwiperSlide >
      <div class="w-100 bg-img" style="background-image: url('https://raw.githubusercontent.com/JonathanHsu0817/pnp-sideproject-vue-vite/main/public/ImgBanner01.png');"></div>
    </SwiperSlide>
    <SwiperSlide >
      <div class="w-100 bg-img" style="background-image: url('https://raw.githubusercontent.com/JonathanHsu0817/pnp-sideproject-vue-vite/main/public/ImgBanner02.png');"></div>
    </SwiperSlide>
    <SwiperSlide >
      <div class="w-100 bg-img" style="background-image: url('https://raw.githubusercontent.com/JonathanHsu0817/pnp-sideproject-vue-vite/main/public/ImgBanner03.png');"></div>
    </SwiperSlide>
    <SwiperSlide >
      <div class="w-100 bg-img" style="background-image: url('https://raw.githubusercontent.com/JonathanHsu0817/pnp-sideproject-vue-vite/main/public/ImgBanner04.png');"></div>
    </SwiperSlide>
    <SwiperSlide >
      <div class="w-100 bg-img" style="background-image: url('https://raw.githubusercontent.com/JonathanHsu0817/pnp-sideproject-vue-vite/main/public/ImgBanner05.png');"></div>
    </SwiperSlide>
    <SwiperSlide >
      <div class="w-100 bg-img" style="background-image: url('/ImgBanner06.png');"></div>
    </SwiperSlide>
  </Swiper>
</template>

<style>
  .bg-img{
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    height: 44vh;
  }
</style>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay} from 'swiper'

export default {
  data () {
    return {
      modules: [Autoplay],
    }
  },
  components: {
    Swiper,
    SwiperSlide
  },
}
</script>