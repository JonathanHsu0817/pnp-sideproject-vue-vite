<template>
  <VueLoading :active="isLoading">
    <img src="@/assets/loading.svg" alt="">
  </VueLoading>
  <div class="bg-backStage">
    <main class="check-order container py-11">
      <h2 class="mb-9 text-center">訂單已成立</h2>
      <!-- 訂單進度 -->
      <div class="mb-9">
        <TimeLine :step="step"></TimeLine>
      </div>
      <div class="text-center mb-12">
        <h3 class="mb-4 fs-4 fs-sm-3">感謝您的購買與支持</h3>
        <p class="fs-8 fs-sm-7">我們將盡快為您出貨，還請隨時留意宅配通知！</p>
        <div class="text-center my-10">
          <button
            type="button"
            class="btn btn-outline-secondary rounded-1 px-6 px-md-10 py-2 py-md-4 me-6"
            @click="$router.push('/')"
          >
            回首頁
          </button>
          <button
            type="button"
            class="btn btn-secondary text-white rounded-1 px-6 px-md-10 py-2 py-md-4"
            @click="$router.push('/products')"
          >
            繼續購物
          </button>
        </div>
      </div>
      <!-- 訂單詳細區塊 -->
      <section class="row justify-content-center mb-11 g-8">
        <!-- 訂單產品資料 -->
        <section class="col-lg-6">
          <h4 class="my-6 fs-4">訂購內容</h4>
          <!-- 訂單產品資料 -->
          <ul v-if="order" class="p-2">
            <template v-for="orderItem in order.products" :key="orderItem.id">
              <li
                class="product-item row align-items-center gx-4 border-bottom pb-6"
              >
                <!-- 商品圖片 -->
                <div class="col overflow-hidden">
                  <img
                    :src="orderItem.product.imageUrl"
                    :alt="orderItem.product.title"
                    class="object-fix-cover w-100"
                    style="max-height: 150px"
                  />
                </div>
                <!-- 商品內容 -->
                <div class="col-8">
                  <h5 class="fs-7 fs-md-5 mb-2">{{ orderItem.product.title }}</h5>
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <!-- 價格 -->
                    <div>
                      <p>
                        NT$ {{ priceFormat(Math.round(orderItem.final_total)) }} x {{ orderItem.qty }}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            </template>
          </ul>
          <div class="mt-6 text-end">
            <p class="fs-4 fw-bold">
              總計:
              <span>NT$ {{ priceFormat(Math.round(order.total)) }}</span>
            </p>
          </div>
        </section>
        <!-- 訂購人資料 -->
        <section class="col-md-5">
          <div class="p-8 bg-white border">
            <!-- 訂單資訊 -->
            <div class="mb-8">
              <h4 class="mb-6 fs-5">訂單資訊</h4>
              <ul>
                <li class="row mb-2">
                  <span class="w-auto me-auto">訂購時間 :</span>
                  {{ createDate( order.create_at ) }}
                </li>
                <li class="row mb-2">
                  <span class="w-auto me-auto">訂單編號 :</span>
                  {{ order.id }}
                </li>
                <li class="row mb-2">
                  <span class="w-auto me-auto">付款狀態 :</span>
                  <span v-if="order.is_paid" class="text-success p-0 w-auto">
                    已付款
                  </span>
                  <span v-else class="text-danger p-0 w-auto"
                    >尚須付款 <b>NT$ {{ order.total }}</b></span
                  >
                </li>
              </ul>
            </div>
            <!-- 訂購人資訊 -->
            <div>
              <h2 class="mb-6 fs-5">訂購人資料</h2>
              <ul>
                <li class="row mb-2">
                  <span class="col-4 me-auto">姓名 :</span>
                  {{ order.user.name }}
                </li>
                <li class="row mb-2">
                  <span class="col-4 me-auto">Email :</span>
                  {{ order.user.email }}
                </li>
                <li class="row mb-2">
                  <span class="col-4 me-auto">電話 :</span>
                  {{ order.user.tel }}
                </li>
                <li class="row mb-2">
                  <span class="col-4 me-auto">地址 :</span>
                  {{ order.user.address }}
                </li>
                <li class="row mb-2">
                  <span class="col-4 me-auto">留言 :</span>
                  {{ order.message }}
                </li>
              </ul>
            </div>
          </div>
        </section>
      </section>
    </main>
  </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import orderStore from "@/stores/OrderStore";

import TimeLine from "@/components/TimeLine.vue";

export default {
  components: { TimeLine },
  data() {
    return {
      step: 3,
      isLoading: false,
    };
  },
  computed: {
    ...mapState(orderStore, ["order"]),
  },
  methods: {
    ...mapActions(orderStore, ["getOrder", "createDate"]),

    priceFormat(price){
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
  },
  mounted() {
    this.getOrder(this.$route.params.orderId);
  },
};
</script>