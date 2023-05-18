<template>
  <VueLoading :active="isLoading">
    <img src="@/assets/loading.svg" alt="">
  </VueLoading>
  <div id="couponModal" ref="couponModal" class="modal fade" tabindex="-1" aria-labelledby="couponModalLabel"
        aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 id="couponModalLabel" class="modal-title">
              <span v-if="isNew">新增優惠卷</span>
              <span v-else>編輯優惠卷</span>
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <VForm ref="form" v-slot="{ errors }"  @submit="$emit('updateCoupon',innerCoupon)">
            <div class="modal-body">
                <div class="mb-3">
                  <label for="title">標題</label>
                  <VField id="title" name="標題" type="text" class="form-control" :class="{ 'is-invalid': errors['標題'] }"
                    placeholder="請輸入標題" rules="required" v-model="innerCoupon.title"></VField>
                  <ErrorMessage name="標題" class="invalid-feedback"></ErrorMessage>
                </div>
                <div class="mb-3">
                  <label for="code">優惠碼</label>
                    <VField id="code" name="優惠碼" type="text" class="form-control" :class="{ 'is-invalid': errors['優惠碼'] }"
                      placeholder="請輸入優惠碼" rules="required" v-model="innerCoupon.code"></VField>
                    <ErrorMessage name="優惠碼" class="invalid-feedback"></ErrorMessage>
                </div>
                <div class="mb-3">
                  <label for="due_date">到期日</label>
                  <VField id="due_date" name="到期日" type="date" class="form-control" :class="{ 'is-invalid': errors['到期日'] }"
                    placeholder="請輸入到期日" :rules="ltToday" v-model="due_date"></VField>
                  <ErrorMessage name="到期日" class="invalid-feedback"></ErrorMessage>
                </div>
                <div class="mb-3">
                  <label for="price">折扣百分比</label>
                  <VField id="price" name="折扣百分比" type="number" class="form-control" :class="{ 'is-invalid': errors['折扣百分比'] }"
                    placeholder="請輸入折扣百分比" rules="required|min_value:0|max_value:100|numeric|integer" v-model.number="innerCoupon.percent"
                    min="0" max="100"></VField>
                  <ErrorMessage name="折扣百分比" class="invalid-feedback"></ErrorMessage>
                </div>
                <div class="mb-3">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox"
                      :true-value="1" :false-value="0" v-model="innerCoupon.is_enabled" id="is_enabled">
                    <label class="form-check-label" for="is_enabled">
                      是否啟用
                    </label>
                  </div>
                </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                取消
              </button>
              <button type="submit" class="btn btn-dark">
                確認
              </button>
            </div>
          </VForm>
        </div>
      </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal'
export default {
  props: ['tempCoupon', 'isNew'],
  emits: ['updateCoupon'],
  data() {
    return {
      isLoading: false,
      couponModal: '',
      due_date: '',
      innerCoupon: {}
    }
  },
  methods: {
    show() {
      this.couponModal.show()
    },
    hide() {
      this.couponModal.hide()
    },
    ltToday (val) {
      // 建立新的優惠券時，不可輸入已經過去的日期
      const [today] = new Date().toISOString().split('T')
      return val >= today || this.innerCoupon.id ? true : '到期日 不可小於今日'
    }
  },
  mounted () {
    // dom 生成後，再取得 model
    this.couponModal = new Modal(this.$refs.couponModal, { keyboard: false })
  },
  watch: {
    tempCoupon () {
      this.innerCoupon = this.tempCoupon
      // 將時間格式改為 YYYY-MM-DD
      const dateAndTime = new Date(this.innerCoupon.due_date * 1000).toISOString().split('T')
      if (Array.isArray(dateAndTime)) {
        [this.due_date] = dateAndTime
      }
    },
    due_date () {
      this.innerCoupon.due_date = Math.floor(new Date(this.due_date) / 1000)
    }
  }
}
</script>