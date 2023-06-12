import { defineStore } from 'pinia'

import axios from 'axios'
import { Toast } from '@/methods/toast.js'

const { VITE_API_URL,VITE_API_PATH } = import.meta.env;

export default defineStore('productsStore',{
  state: () => ({
    products: [],
    category: '',
    pagination: {},
    isLoading: false
  }),
  actions: {
    getProducts ( pageNum = 1 ){
      this.isLoading = true
      axios.get(`${VITE_API_URL}/api/${VITE_API_PATH}/products?page=${pageNum}&category=${this.category}`)
      .then(res => {
        this.products = res.data.products
        this.pagination = res.data.pagination
        this.isLoading = false
      })
      .catch(err=>{
        Toast(err.response.data.message, 'error')
        this.isLoading = false
      })
    },
    // 切換類別
    filterProducts (category) {
      if (this.category !== category) {
        this.category = category
        this.getProducts()
        this.category = ''
      }
    }
  },
  getters: {
    sortProducts ({products}) {
      return products.sort((a,b)=>b.price-a.price)
    }
  }
})