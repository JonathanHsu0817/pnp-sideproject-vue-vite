<template>
  <section class="order-process pt-4 pb-3 mb-3 mb-lg-7">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-8 col-md-7 timeline"></div>
      </div>
      <div class="row">
        <div class="col-4 col-md-5">
          <div class="timeline-pointer text-center step-1 active">
            <p>購物車</p>
          </div>
        </div>
        <div class="col-4 col-md-2">
          <div class="timeline-pointer text-center step-2" :class="stepCheck">
            <p>確認結帳</p>
          </div>
        </div>
        <div class="col-4 col-md-5">
          <div
            class="timeline-pointer text-center step-3"
            :class="stepComplete"
          >
            <p>訂單成立</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    props: ["step"],
    computed: {
      stepCheck() {
        if (this.step === 2 || this.step === 3) {
          return "active";
        } else {
          return "";
        }
      },
      stepComplete() {
        if (this.step === 3) {
          return "active";
        } else {
          return "";
        }
      },
    },
  };
</script>