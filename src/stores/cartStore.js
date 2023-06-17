import { defineStore } from 'pinia'
// import productsStore from '@/stores/productsStore.js'

import axios from 'axios'
import { Toast } from '@/methods/toast.js'

const { VITE_API_URL,VITE_API_PATH } = import.meta.env;

export default defineStore('cartStore',{
  state: () => ({
    carts: [],
    total: 0,
    final_total: 0,
    loadingItem: '' // 存 ID
  }),
  actions: {
    // 購物車列表
    getCart () {
      axios.get(`${VITE_API_URL}/api/${VITE_API_PATH}/cart`)
        .then(res => {
          this.carts = res.data.data.carts
          this.total = res.data.data.total
          this.final_total = res.data.data.final_total
        })
        .catch(err => Toast(err.response.data.message, 'error'))
    },

    // 加入購物車
    addToCart ( productId, qty = 1 ){
      const data = {
        product_id: productId,
        qty
      }
      axios.post(`${VITE_API_URL}/api/${VITE_API_PATH}/cart`,{ data })
        .then(res => {
          this.getCart()
          Toast(res.data.message, 'success')
          this.loadingItem = ''
        })
        .catch(err => Toast(err.response.data.message, 'error'))
    },

    // 刪除購物車項目（單一）
    delCart (id) {
      this.loadingItem = id
      axios.delete(`${VITE_API_URL}/api/${VITE_API_PATH}/cart/${id}`)
        .then(res => {
          this.getCart()
          Toast(res.data.message, 'success')
        })
        .catch(err => Toast(err.response.data.message, 'error'))
    },
    // 刪除購物車項目（全部）
    delCarts () {
      axios.delete(`${VITE_API_URL}/api/${VITE_API_PATH}/carts`)
        .then(res => {
          this.getCart()
          Toast(res.data.message, 'success')
          this.loadingItem = ''
        })
        .catch(err => Toast(err.response.data.message, 'error'))
    },
    // 調整購物車產品數量
    updateCart (data) {
      this.loadingItem = data.id
      axios.put(`${VITE_API_URL}/api/${VITE_API_PATH}/cart/${data.id}`, {
        data: {
          product_id: data.product_id,
          qty: data.qty
        }
      })
        .then(res => {
          this.getCart()
          Toast(res.data.message, 'success')
          this.loadingItem = ''
        })
        .catch(err => Toast(err.response.data.message, 'error'))
    },
  }
})
