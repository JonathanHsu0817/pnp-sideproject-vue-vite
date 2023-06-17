import { defineStore } from 'pinia'

import axios from 'axios'
import { Toast } from '@/methods/toast.js'

const { VITE_API_URL, VITE_API_PATH } = import.meta.env;

export default defineStore("orderStore", {
  state: () => ({
    order: {
      products: [],
      user: {
        address: "",
        email: "",
        name: "",
        tel: "",
      },
    },
    orders: [],
    pagination: {},
    currentPage: 1,
    ordersTotal: 0,
    totalCategory: {},
    chartDataTotal: [],
    chartDataCategory: [],
    orderNotPaidNum: 0,
  }),
  actions: {
    // 取得單一訂單資料
    getOrder(id) {
      axios.get(`${VITE_API_URL}/api/${VITE_API_PATH}/order/${id}`)
        .then((res) => {
          console.log(res.data)
          this.order = "";
          this.order = res.data.order;
        })
        .catch((err) => {
          Toast(err.response.data.message, 'error')
        });
    },

    // 取得後台所有訂單資料
    getOrders(page = 1) {
      this.currentPage = page;
      axios.get(`${VITE_API_URL}/api/${VITE_API_PATH}/admin/orders?page=${page}`)
        .then((res) => {
          this.orders = res.data.orders;
          this.pagination = res.data.pagination;
          
          // this.getLastOrdersTotal(this.orders);
        })
        .catch((err) => {
          Toast(err.response.data.message, 'error')
        });
    },

    // 取得最新 10 筆訂單且已付款總額
    getLastOrdersTotal(orders) {
      const orderIsPaid = orders.filter((order) => {
        return order.is_paid === true;
      });
      this.ordersTotal = orderIsPaid.reduce(
        (sum, current) => sum + current.total,
        0
      );
      this.chartDataTotal = orderIsPaid.map((item) => {
        return item.total;
      });
    },

    // 取得圖表所需資料(銷售類別)
    getCategoryChartData() {
      const ordersProducts = this.orders.map((order) => {
        return order.products;
      });
      ordersProducts.forEach((products) => {
        Object.values(products).forEach((item) => {
          this.totalCategory[item.product.category]
            ? (this.totalCategory[item.product.category] += 1)
            : (this.totalCategory[item.product.category] = 1);
        });
      });
      this.chartDataCategory = Object.entries(this.totalCategory);
    },

    // 取得未付款訂單總數
    getNotPaidOrders() {
      const orderNotPaid = this.orders.filter((order) => {
        return order.is_paid === false;
      });
      this.orderNotPaidNum = orderNotPaid.length;
    },

    createDate(ms) {
      const timer = new Date(ms * 1000);
      const y = timer.getFullYear();
      const m =
        timer.getMonth() + 1 >= 10
          ? timer.getMonth() + 1
          : `0${timer.getMonth() + 1}`;
      const d = timer.getDate() >= 10 ? timer.getDate() : `0${timer.getDate()}`;
      return `${y}/${m}/${d}`;
    },
  },
});
