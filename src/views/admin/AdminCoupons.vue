<template>
  <VueLoading :active="isLoading">
    <img src="@/assets/loading.svg" alt="">
  </VueLoading>
  <div class="container">
        <div class="text-end mt-4">
          <button type="button" class="btn btn-primary" @click="openModal('create')">
            建立新的優惠券
          </button>
        </div>
        <table class="table table-hover mt-4">
          <thead>
            <tr class="align-middle">
              <th width="120">標題</th>
              <th>優惠碼</th>
              <th>折扣百分比</th>
              <th width="120">
                到期日
              </th>
              <th width="120">
                是否啟用
              </th>
              <th width="120">
                編輯
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="coupon in coupons" :key="coupon.id" class="align-middle">
              <td>{{ coupon.title }}</td>
              <td>{{ coupon.code }}</td>
              <td> {{ `${coupon.percent} %`  }}</td>
              <td> {{ date(coupon.due_date) }}</td>
              <td>
                <span class="text-success" v-if="coupon.is_enabled">啟用</span>
                <span v-else>未啟用</span>
              </td>
              <td>
                <div class="btn-group">
                  <button type="button" class="btn btn-outline-secondary btn-sm" @click="openModal('edit', coupon)">
                    編輯
                  </button>
                  <button type="button" class="btn btn-outline-danger btn-sm" @click="openModal('delete', coupon)">
                    刪除
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- 分頁元件 -->
        <pagination :pagination="pagination" :get-items= "getCouponsData" @change-page="getCouponsData"></pagination>
      </div>
      <!-- Modal -->
      <CouponModal 
        ref="couponModal" 
        :temp-coupon="tempCoupon" 
        :is-new="isNew"
        @update-coupon="updateCouponData"></CouponModal>
      <DelModal ref="delModal" :temp-item="tempCoupon" @delete-item="deleteCoupon"></DelModal>
      <!-- Modal -->
</template>

<script>
import Swal from 'sweetalert2'
import CouponModal from '@/components/CouponModal.vue'
import DelModal from '@/components/DelModal.vue'
import pagination from '@/components/PaginationComponent.vue';

const { VITE_API_URL,VITE_API_PATH } = import.meta.env;

export default {
  components: {
    CouponModal, DelModal, pagination
  },
  data() {
    return {
      isLoading: false,
      coupons: [],
      isNew: '',
      tempCoupon: {},
      pagination: {},
      pageNum: 1
    }
  },
  methods: {
    getCouponsData(pageNum = 1) { // 參數預設值
      this.isLoading = true
      this.$http.get(`${VITE_API_URL}/api/${VITE_API_PATH}/admin/coupons?page=${pageNum}`)
        .then(res => {
          this.coupons = res.data.coupons
          this.pagination = res.data.pagination
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
    // 新增 & 修改 優惠券
    updateCouponData(tempCoupon) {
      this.isLoading = true
      let url = `${VITE_API_URL}/api/${VITE_API_PATH}/admin/coupon`
      let http = 'post';
      let data = tempCoupon

      if (!this.isNew) {
        url = `${VITE_API_URL}/api/${VITE_API_PATH}/admin/coupon/${this.tempCoupon.id}`
        http = 'put';
        data = this.tempCoupon
      }

      this.$http[http](url, { data })
        .then(res => {
          this.$refs.couponModal.hide()
          Swal.fire({
            icon: 'success',
            title: res.data.message,
            showConfirmButton: false,
            timer: 1500
          })
          this.getCouponsData()
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
    // 刪除商品
    deleteCoupon() {
      this.isLoading = true
      this.$http.delete(`${VITE_API_URL}/api/${VITE_API_PATH}/admin/coupon/${this.tempCoupon.id}`, { data: this.tempCoupon })
        .then(res => {
          this.$refs.delModal.hide()
          Swal.fire({
            icon: 'success',
            title: res.data.message,
            showConfirmButton: false,
            timer: 1500
          })
          this.getCouponsData(this.pageNum)
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
    openModal(isNew, coupon) {
      this.isNew = isNew
      if (isNew === 'create') {
        this.tempCoupon = {
          is_enabled: 0,
          due_date: new Date().getTime() / 1000
        }
        this.isNew = true;
        this.$refs.couponModal.show()
      } else if (isNew === 'edit') {
        this.tempCoupon = {
          ...coupon
        }
        this.isNew = false;
        this.$refs.couponModal.show()
      } else if (isNew === 'delete') {
        this.tempCoupon = {
          ...coupon
        }
        this.$refs.delModal.show()
      }
    },
    date(time) {
      const localDate = new Date(time * 1000);
      return localDate.toLocaleDateString();
    }
  },
  mounted () {
    this.getCouponsData()
  }
}
</script>