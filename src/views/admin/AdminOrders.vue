<template>
  <VueLoading :active="isLoading">
    <img src="@/assets/loading.svg" alt="">
  </VueLoading>
  <div class="container">
    <div class="card shadow-sm rounded-top mt-4">
      <div class="card-header bg-transparent pb-1">
        <div class="input-group">
          <span class="input-group-text border-0 bg-transparent ps-8 pe-1">
            <i class="bi bi-search"></i>
          </span>
          <input type="search" class="form-control border-0 shadow-none">
        </div>
      </div>
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-hover mb-0">
            <thead class="bg-primary-light">
              <tr class="align-middle">
                <th scope="col" class="ps-4"></th>
                <th scope="col" class="py-3">購買時間</th>
                <th scope="col">Email</th>
                <th scope="col">購買款項</th>
                <th scope="col">應付金額</th>
                <th scope="col">是否付款</th>
                <th scope="col" class="pe-2">編輯</th>
              </tr>
            </thead>
            <tbody class="text-nowrap">
              <tr class="align-middle" v-for="order in orders" :key="order.id" :class="{ 'text-secondary': !order.is_paid }">
                <td></td>
                <td>{{ date(order.create_at )}}</td>
                <td>{{ order.user.email }}</td>
                <td>
                  <ul class="list-unstyled">
                    <li v-for="(product) in order.products" :key="product.id">
                      {{ product.product.title }} 數量：{{ product.qty }}
                      {{ product.product.unit }}
                    </li>
                  </ul>
                </td>
                <td class="text-end">{{ order.total }}</td>
                <td>
                  <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" role="switch" :id="order.id"
                      v-model="order.is_paid" @change="updatePaid(order)">
                    <label class="form-check-label" :for="order.id">
                      <span v-if="order.is_paid">已付款</span>
                      <span v-else>未付款</span>
                    </label>
                  </div>
                </td>
                <td class="pe-2">
                  <div class="btn-group">
                      <button type="button" class="btn btn-outline-gray-dark btn-sm" @click="openModal('view', order)">
                        檢視
                      </button>
                      <button type="button" class="btn btn-outline-danger btn-sm" @click="openModal('delete', order)">
                        刪除
                      </button>
                    </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- pagination -->
      <div class="card-footer bg-transparent -mt-xs-1">
        <Pagination :pagination="pagination" :get-items = "getOrdersData" @change-page="getOrdersData"></Pagination>
      </div>
    </div>
  </div>
  <!-- Modal -->
  <OrderModal 
    ref="orderModal" 
    :temp-order="tempOrder"  
    @update-paid="updateOrdersData"></OrderModal>
  <DelModal ref="delModal" :temp-item="tempOrder" @delete-item="delOrder"></DelModal>
  <!-- Modal -->
</template>

<script>
import Swal from 'sweetalert2'
import OrderModal from '@/components/OrderModal.vue'
import DelModal from '@/components/DelModal.vue';
import Pagination from '@/components/PaginationComponent.vue';

const { VITE_API_URL,VITE_API_PATH } = import.meta.env;

export default {
  components:{
    Pagination,DelModal,OrderModal
  },
  data(){
		return {
			tempOrder:{},
			orders: [],
      pagination: {},
      orderModal: '',
      isLoading: false,
      methods: ''
		}
	},
	methods:{
		getOrdersData(pageNum = 1){
      this.isLoading = true
			this.$http.get(`${VITE_API_URL}api/${VITE_API_PATH}/admin/orders/?page=${pageNum}`)
				.then(res=>{
					this.orders = res.data.orders;
          this.pagination = res.data.pagination;
          this.isLoading = false
				})
				.catch(err=>{
          Swal.fire({
            icon: 'error',
            title: err.response.data.message,
            showConfirmButton: false,
            timer: 1500
          })
					this.isLoading = false
				})
		},
		updateOrdersData(){
      this.isLoading = true
			let url = `${VITE_API_URL}api/${VITE_API_PATH}/admin/order/${this.tempOrder.id}`;
			let http = 'put';

			this.$http[http](url, { data: this.tempOrder })
        .then((res) => {
          this.$refs.orderModal.hide();
          Swal.fire({
            icon: 'success',
            title: res.data.message,
            showConfirmButton: false,
            timer: 1500
          })
				this.getOrdersData();
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
		delOrder() {
      this.isLoading = true
			const url = `${VITE_API_URL}api/${VITE_API_PATH}/admin/order/${this.temporder.id}`;

			this.$http.delete(url)
				.then(res => {
        this.$refs.delModal.hide()
				Swal.fire({
            icon: 'success',
            title: res.data.message,
            showConfirmButton: false,
            timer: 1500
          })
				this.getOrdersData();
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
		openModal(methods,item){
			if(methods === "view"){
				this.tempOrder ={...item};
				this.$refs.orderModal.show();
			}else if(methods === "delete"){
				this.tempOrder ={...item};
				this.$refs.delModal.show()
			}
		},
    date(time) {
      const localDate = new Date(time * 1000);
      return localDate.toLocaleDateString();
    }
	},
	mounted(){
    this.getOrdersData();
	}
}
</script>
