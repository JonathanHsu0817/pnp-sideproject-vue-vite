<template>
  <VueLoading :active="isLoading">
    <img src="@/assets/loading.svg" alt="">
  </VueLoading>
  <main>
    <section class="bg-backStage py-5 min-height">
      <div class="container">
        <div class="mb-9">
          <TimeLine :step="step"></TimeLine>
        </div>
        <div class="row">
          <div class="col-lg-6 p-5">
            <h2 class="mb-6">確認訂單內容</h2>
            <ul v-if="carts" class="mb-10 ps-0">
              <li class="product-item row align-items-center gx-4 border-bottom mb-6 pb-6" v-for="cartItem in carts" :key="cartItem.id">
                <!-- 商品圖片 -->
                <div class="col overflow-hidden">
                  <img
                    :src="cartItem.product.imageUrl"
                    :alt="cartItem.product.title"
                    class="object-fix-cover w-100"
                    style="max-height: 150px"
                  />
                </div>
                <!-- 商品內容 -->
                <div class="col-8">
                  <div class="d-flex justify-content-between align-items-center">
                    <h4 class="fs-7 fs-md-5 mb-2">{{ cartItem.product.title }}</h4>
                    <a href="#" class="cart-delete d-block ms-4 ms-md-3" @click="delCart(cartItem.id)" :disabled="cartItem.id === loadingItem">
                      <i v-if="cartItem.id === loadingItem" class="fas fa-spinner fa-pulse" ></i>
                      <i v-else class="fas fa-trash-alt text-primary fs-5"></i>
                    </a>
                  </div>
                  <div class="d-flex justify-content-between align-items-center">
                    <!-- 價格 -->
                    <div>
                      <p class="text-primary fs-md-6">
                        <!-- 售價 -->
                        <span class="fs-9 fs-md-8">NT$ </span>{{ priceFormat(cartItem.product.price) }}
                      </p>
                    </div>
                    <!-- 數量 -->
                    <div>
                      <div class="d-flex align-items-center w-auto">
                        <button
                          type="button"
                          class="btn text-dark p-0"
                          @click="updateProduct('remove', cartItem)"
                        >
                          <i class="fas fa-minus"></i>
                        </button>
                        <input type="number" v-model="cartItem.qty" class="btn input-num" />
                        <button
                          class="btn text-dark p-0"
                          type="button"
                          @click="updateProduct('add', cartItem)"
                        >
                        <i class="fas fa-plus"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <div class="input-group mb-3 input-group-sm">
              <input type="text" class="form-control" placeholder="已套用優惠券" disabled v-if="final_total !== total">
              <input type="text" class="form-control" v-model="couponCode" placeholder="請輸入優惠券" v-else />
              <div class="input-group-append">
                <button class="btn btn-outline-primary text-gray-dark" :disabled="final_total !== total || loadingItem != ''"
                  type="button" @click="addCouponCode">
                  <i class="fas fa-spinner fa-pulse" v-if="loadingItem != ''"></i>
                  套用優惠碼
                </button>
              </div>
            </div>
            <p class="fs-5 text-end fw-bold" :class="final_total !== total ? 'text-muted text-decoration-line-through' : ''">
              {{`總計金額：NT$ ${priceFormat(total)}`}}
            </p>
            <p class="fs-5 text-end fw-bold mb-4" v-if="final_total !== total">
              {{`折扣後金額：NT$ ${priceFormat(final_total)}`}}
            </p>
          </div>
          <div class="col-12 col-lg-6 bg-white p-5"  v-if="carts && carts.length > 0">
            <h2 class="mb-6">訂購資訊</h2>
            <VForm ref="form" v-slot="{ errors }" @submit="createOrder">
              <div class="mb-3">
                  <label for="email" class="form-label">Email</label>
                  <VField id="email" name="email" type="email" class="form-control"
                    :class="{ 'is-invalid': errors['email'] }" placeholder="請輸入 Email"
                    v-model="form.user.email" rules="email|required"></VField>
                  <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
              </div>
              <div class="mb-3">
                  <label for="name" class="form-label">收件人姓名</label>
                  <VField id="name" name="姓名" type="text" class="form-control" :class="{ 'is-invalid': errors['姓名'] }"
                    placeholder="請輸入姓名" rules="required" v-model="form.user.name"></VField>
                  <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
              </div>
              <div class="mb-3">
                  <label for="tel" class="form-label">收件人手機</label>
                  <VField id="tel" name="電話" type="tel" class="form-control" :class="{ 'is-invalid': errors['電話'] }"
                    placeholder="請輸入電話" v-model="form.user.tel" :rules="isPhone"></VField>
                  <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
              </div>
              <div class="mb-3">
                  <label for="address" class="form-label">收件人地址</label>
                  <VField id="address" name="地址" type="text" class="form-control" :class="{ 'is-invalid': errors['地址'] }"
                    placeholder="請輸入地址" rules="required" v-model="form.user.address"></VField>
                  <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
              </div>
              <div class="mb-3">
                  <label for="message" class="form-label">留言</label>
                  <textarea id="message" name="message" class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
              </div>
              <div class="text-end">
                  <button type="submit" class="btn btn-primary py-3 px-5 text-gray-dark w-100">送出訂單</button>
              </div>
            </VForm>
          </div>
          <template v-else>
            <div class="col-12 d-flex flex-column justify-content-center align-items-center my-5">
              <p><i class="fa-solid fa-cart-shopping mb-2 me-2 fs-5"></i>購物車內沒有商品</p>
              <a class="btn btn-primary py-3 px-5 text-gray-dark" role="button" @click="this.$router.push('/products')">再去晃晃吧</a>
            </div>
            <RecommendSwiper></RecommendSwiper>
          </template>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { Toast } from '@/methods/toast.js'
import Swal from 'sweetalert2'
import { mapActions, mapState } from 'pinia'
import cartStore from '@/stores/cartStore.js'

import RecommendSwiper from '@/components/RecommendSwiper.vue'
import TimeLine from "@/components/TimeLine.vue";

const { VITE_API_URL,VITE_API_PATH } = import.meta.env;

export default {
  data () {
    return {
      isLoading: false,
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      },
      couponCode: '',
      step: 1,
    }
  },
  components: {
    RecommendSwiper,TimeLine
  },
  computed: {
    ...mapState(cartStore, ['carts','total','final_total','loadingItem'])
  },
  methods: {
    ...mapActions(cartStore, ['getCart','updateCart']),
    // 建立訂單
    createOrder () {
      this.isLoading = true
      this.$http.post(`${VITE_API_URL}/api/${VITE_API_PATH}/order`, { data: this.form })
        .then(res => {
          this.$refs.form.resetForm()
          this.form = {
            user: {
              name: '',
              email: '',
              tel: '',
              address: ''
            },
            message: ''
          }
          this.getCart()
          Toast(res.data.message, 'success')
          this.$router.push(`payment/${res.data.orderId}`)
          this.isLoading = false
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: err.response.data.message,
            showConfirmButton: false,
            timer: 1500
          })
          this.isLoading = false
        })
    },
    // 套用優惠券
    addCouponCode () {
      this.loadingItem = this.couponCode
      this.$http.post(`${VITE_API_URL}/api/${VITE_API_PATH}/coupon`, {
        data: {
          code: this.couponCode
        }
      })
        .then(res => {
          this.getCart()
          Toast(res.data.message, 'success')
          this.loadingItem = ''
        })
        .catch(err => {
          Toast(err.response.data.message, 'error')
          this.loadingItem = ''
        })
    },
    updateProduct(count, item) {
      if (count === "remove") {
        item.qty -= 1;
      } else {
        item.qty += 1;
      }
      this.updateCart(item);
    },
    isPhone (value) {
      const phoneNumber = /^(09)[0-9]{8}$/
      return phoneNumber.test(value)
        ? true
        : '需要正確的手機號碼'
    },
    priceFormat(price){
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
  }
}
</script>