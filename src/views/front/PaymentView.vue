<template>
  <VueLoading :active="isLoading">
    <img src="@/assets/loading.svg" alt="">
  </VueLoading>
  <div class="bg-backStage">
    <main class="check-order container py-11">
      <h2 class="mb-9 text-center">確認結帳</h2>
      <!-- 訂單進度 -->
      <div class="mb-9">
        <TimeLine :step="step"></TimeLine>
      </div>
      <!-- 訂單確認付款 -->
      <div class="row justify-content-center">
        <div class="col-lg-6 p-5">
          <h2 class="my-6 fs-4">確認付款內容</h2>
          <!-- 訂單產品資料 -->
          <ul v-if="order" class="p-2">
            <template v-for="orderItem in order.products" :key="orderItem.id">
              <li
                class="product-item row align-items-center gx-4 border-bottom py-4"
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
                  <h4 class="fs-7 fs-md-5 mb-2">{{ orderItem.product.title }}</h4>
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
        </div>
        <!-- 訂購人資料 -->
        <section class="col-md-5">
          <div class="p-8 bg-white border">
            <!-- 訂單資訊 -->
            <div class="mb-8">
              <h2 class="mb-6 fs-5">訂單資訊</h2>
              <ul class="ps-4">
                <li class="row mb-2">
                  <span class="w-auto me-auto">訂購時間 :</span>
                  {{ createDate(order.create_at) }}
                </li>
                <li class="row mb-2">
                  <span class="w-auto me-auto">訂單編號 :</span>
                  {{ order.id }}
                </li>
                <li class="row mb-2">
                  <span class="w-auto me-auto me-auto">付款狀態 :</span>
                  <span v-if="order.is_paid" class="text-success p-0 w-auto">
                    已付款
                  </span>
                  <span v-else class="text-danger p-0 w-auto">
                    尚須付款 <b>NT$ {{ priceFormat(Math.round(order.total)) }}</b>
                  </span>
                </li>
              </ul>
            </div>
            <!-- 訂購人資訊 -->
            <div>
              <h2 class="mb-6 fs-5">訂購人資料</h2>
              <ul class="ps-4">
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
            <div class="text-end">
              <button
                type="button"
                class="btn btn-primary mt-8 w-lg-100 px-6 px-md-10 py-2 py-md-4 rounded-1"
                @click="postPayment(order.id)"
              >
                確認付款
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import orderStore from "@/stores/OrderStore";

import TimeLine from "@/components/TimeLine.vue";
import { Toast } from '@/methods/toast.js'

const { VITE_API_URL , VITE_API_PATH } = import.meta.env;

export default {
  components: { TimeLine },
  data() {
    return {
      step: 2,
      isLoading: false,
    };
  },
  computed: {
    ...mapState(orderStore, ["order"]),
  },
  methods: {
    ...mapActions(orderStore, ["getOrder", "createDate"]),

    // // 送出付款請求
    postPayment(id) {
      this.isLoading = true
      const url = `${VITE_API_URL}/api/${VITE_API_PATH}/pay/${id}`;

      this.$http.post(url, id)
        .then((res) => {
          console.log(this.order.id)
          Toast(res.data.message, 'success')
          
          this.getOrder(this.order.id);
          this.$router.replace(`/paymentComplete/${this.order.id}`);
          this.isLoading = false
        })
        .catch((err) => {
          Toast(err.response.data.message, 'error')
          this.isLoading = false
        });
    },
    priceFormat(price){
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
  },
  mounted() {
    this.getOrder(this.$route.params.orderId);
  },
};
</script>