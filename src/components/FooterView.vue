<template>
  <div class="footer bg-primary" style="background-image: url('/ImgFooter.svg'); background-repeat: no-repeat; background-position: bottom 0px right 0px;">
    <div class="container-xl pb-28 pb-sm-16">
      <div class="footer-head d-flex justify-content-between mb-7 px-sm-1">
        <div class="logo mt-8">
          <RouterLink to="/" class="footer-logo icon-hover"><img src="/LogoFooter.svg" alt="logofooter"></RouterLink>
        </div>
        <div class="platform d-flex mt-7">
          <a href="https://www.facebook.com/palnpals" class="d-block icon-hover"><i class="fab fa-facebook fs-2 text-white me-7"></i></a>
          <a href="https://www.instagram.com/palnpals/" class="d-block icon-hover"><i class="fab fa-instagram fs-2 text-white"></i></a>
        </div>
      </div>
      <ul class="footer-content list-unstyled text-white px-sm-1">
        <li class="d-sm-flex flex-wrap d-block mb-3"><h5 class="fs-6 lh-base me-7 mb-1">官方 Facebook：</h5><a class="text-decoration-none text-white icon-hover" href="https://www.facebook.com/palnpals">https://www.facebook.com/palnpals</a></li>
        <li class="d-sm-flex flex-wrap d-block mb-3"><h5 class="fs-6 lh-base me-7 mb-1">官方 Instagram：</h5><a class="text-decoration-none text-white icon-hover" href="https://www.instagram.com/palnpals/">https://www.instagram.com/palnpals/</a></li>
        <li class="d-sm-flex flex-wrap d-block"><h5 class="fs-6 lh-base me-7 mb-0">電話：</h5><a class="text-decoration-none text-white icon-hover" href="tel:+02 1234 5678">02 1234 5678</a></li>
      </ul>
    </div>
  </div>
</template>

<style>
  .icon-hover:hover{
    opacity: 0.75;
    transition: 0.2s all;
  }
</style>