<template>
  <section class="banner bg-black">
    <div class="container-xl ps-0 pe-0 overflow-hidden position-relative">
      <div class="row position-absolute z-10">
        <div class="col">
          <div class="d-flex flex-column align-items-start mt-12 mt-md-20 ms-3 ms-md-4">
            <h2 class="fs-1 mb-md-4 text-white d-md-block d-none lh-base">STAY STARVING,<br>
              BE HUNGRY</h2>
            <h2 class="fs-2 mb-7 text-white d-md-none lh-base">Stay Starving,
              <br>Be Hungry</h2>
            <RouterLink to="/products" class="btn btn-outline-primary btn-bg-white border-0 btn-xxl font-monospace">Let's Dig In</RouterLink> 
          </div>
        </div>
      </div>
      <BannerSwiper></BannerSwiper>
    </div>
  </section>
  <AboutUs></AboutUs>
  <section class="swiper-popular py-11">
    <div class="container">
      <nav>
        <div class="d-flex justify-content-between">
          <h3 class="font-monospace fs-4 fs-md-3 mb-0">熱門餐點 <span class="text-primary fs-7 font-normal">Popular Dishes</span></h3>
          <RouterLink to="/products" class="d-block more d-flex align-items-center text-decoration-none">
            <h4 class="text-black fs-7 lh-base me-2 mb-0 font-normal">MORE</h4>
            <i class="fas fa-chevron-circle-right text-primary fs-4"></i>
          </RouterLink>
        </div>
      </nav>
      <RecommendSwiper></RecommendSwiper>
    </div>
  </section>
</template>

<script>
  import BannerSwiper from '@/components/BannerSwiper.vue'
  import AboutUs from '@/components/AboutUs.vue'
  import RecommendSwiper from '@/components/RecommendSwiper.vue'

  export default {
    components: {
      BannerSwiper,AboutUs,RecommendSwiper
    } 
  }

</script>