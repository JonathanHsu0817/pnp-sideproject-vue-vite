<template>
  <VueLoading :active="isLoading">
    <img src="@/assets/loading.svg" alt="">
  </VueLoading>
  <div class="container">
    <div class="text-end mt-4">
      <button class="btn btn-primary" @click="openModal('new')">
        建立新的產品
      </button>
    </div>
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
                <th scope="col" class="py-3">分類</th>
                <th scope="col">產品名稱</th>
                <th scope="col">原價</th>
                <th scope="col">售價</th>
                <th scope="col">是否啟用</th>
                <th scope="col" class="pe-2">編輯</th>
              </tr>
            </thead>
            <tbody class="text-nowrap">
              <tr class="align-middle" v-for="product in products" :key="product.id">
                <td></td>
                <td>{{product.category}}</td>
                <td>{{product.title}}</td>
                <td>{{product.origin_price}}</td>
                <td>{{product.price}}</td>
                <td>
                  <span class="text-success" v-if="product.is_enabled==1">啟用</span>
                  <span v-else>未啟用</span>
                </td>
                <td class="pe-2">
                  <div class="btn-group">
                    <button type="button" class="btn btn-outline-secondary btn-sm" @click="openModal('edit',product)">
                      編輯
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                      </svg>
                    </button>
                    <button type="button" class="btn btn-outline-danger btn-sm" @click="openModal('delete',product)">
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
        <Pagination :pagination="pagination" @change-page="getProductsData"></Pagination>
      </div>
    </div>
  </div>
  <!-- Modal -->
  <ProductModal 
    ref="productModal" 
    :temp-product="tempProduct" 
    :is-new="isNew" 
    @update-product="updateProductsData"></ProductModal>
  <DelModal ref="delModal" :temp-item="tempProduct" @delete-item="delProduct"></DelModal>
  <!-- Modal -->
</template>

<script>
import Swal from 'sweetalert2'
import ProductModal from '@/components/ProductModal.vue'
import DelModal from '@/components/DelModal.vue';
import Pagination from '@/components/PaginationComponent.vue';

const { VITE_API_URL,VITE_API_PATH } = import.meta.env;

export default {
  components:{
    Pagination,DelModal,ProductModal
  },
  data(){
		return {
			tempProduct:{
				imagesUrl: []
			},
			products: [],
			isNew: false,
      pagination: {},
      productModal: '',
      isLoading: false
		}
	},
	methods:{
		getProductsData(pageNum = 1){
      this.isLoading = true
			this.$http.get(`${VITE_API_URL}/api/${VITE_API_PATH}/admin/products/?page=${pageNum}`)
				.then(res=>{
					this.products = res.data.products;
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
		updateProductsData(){
      this.isLoading = true
			let url = `${VITE_API_URL}/api/${VITE_API_PATH}/admin/product`;
			let http = 'post';

			if(!this.isNew){
				url = `${VITE_API_URL}/api/${VITE_API_PATH}/admin/product/${this.tempProduct.id}`;
				http = 'put';
			}

			this.$http[http](url, { data: this.tempProduct })
        .then((res) => {
          this.$refs.productModal.hide();
          Swal.fire({
            icon: 'success',
            title: res.data.message,
            showConfirmButton: false,
            timer: 1500
          })
				this.getProductsData();
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
		delProduct() {
      this.isLoading = true
			const url = `${VITE_API_URL}/api/${VITE_API_PATH}/admin/product/${this.tempProduct.id}`;

			this.$http.delete(url)
				.then(res => {
        this.$refs.delModal.hide()
				Swal.fire({
            icon: 'success',
            title: res.data.message,
            showConfirmButton: false,
            timer: 1500
          })
				this.getProductsData();
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
		openModal(isNew,item){
			if(isNew === "new"){
				this.tempProduct ={
					imagesUrl:[]
				}
				this.isNew = true;
				this.$refs.productModal.show();
			}else if(isNew === "edit"){
				this.tempProduct ={...item};
				this.isNew = false;
				this.$refs.productModal.show();
			}else if(isNew === "delete"){
				this.tempProduct ={...item};
				this.$refs.delModal.show()
			}
		}
	},
	mounted(){
    this.getProductsData();
	}
}
</script>
