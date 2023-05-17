<template>
  <div id="productModal" ref="productModal" class="modal fade" tabindex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="productModalLabel" class="modal-title">
            <span v-if="isNew">新增產品</span>
            <span v-else>編輯產品</span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <v-form ref="form" v-slot="{ errors }" @submit="$emit('updateProducts',modalProduct)">
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="mb-3">
                  <label for="imageUrl" class="form-label">主要圖片</label>
                  <input v-model="modalProduct.imageUrl" type="text" class="form-control mb-2" id="imageUrl" placeholder="請輸入圖片連結">
                </div>
                
                <div class="mb-3">
                  <label for="uploadFile" class="form-label">或 上傳圖片</label>
                  <input type="file" id="uploadFile" class="form-control" ref="fileInput" @change="uploadFile"/>
                </div>

                <img class="img-fluid mb-3" :src="modalProduct.imageUrl">

                <h3 class="mb-3">多圖新增</h3>
                
                <div class="mb-3" v-for="(imageUrl, key) in modalProduct.imagesUrl" :key="key">
                  <label for="imagesUrl" class="form-label">圖片網址</label>
                  <input type="text" class="form-control"
                          placeholder="請輸入圖片連結" id="imagesUrl" v-model="modalProduct.imagesUrl[key]">
                  <img class="img-fluid" :src="modalProduct.imagesUrl[key]">
                </div>
                <div v-if="!modalProduct.imagesUrl || !modalProduct.imagesUrl.length || modalProduct.imagesUrl[modalProduct.imagesUrl.length-1]">
                  <button type="button" class="btn btn-outline-primary btn-sm d-block w-100" @click="createImagesUrl">
                      新增圖片
                  </button>
                </div>
                <div v-else>
                  <button type="button" class="btn btn-outline-danger btn-sm d-block w-100" @click="deleteImagesUrl">
                      刪除圖片
                  </button>
                </div>
              </div>
              <div class="col-sm-8">
                <div class="mb-3">
                  <label for="title" class="form-label">標題</label>
                  <!-- <input id="title" type="text" class="form-control" placeholder="請輸入標題" v-model="modalProduct.title"> -->
                  <v-field id="title" name="標題" type="text" class="form-control" placeholder="請輸入標題" v-model="modalProduct.title"
                    :class="{ 'is-invalid': errors['標題'] }"
                    rules="required"></v-field>
                  <ErrorMessage name="標題" class="invalid-feedback"></ErrorMessage>
                </div>
              
                <div class="row">
                  <div class="mb-3 col-md-6">
                    <label for="category" class="form-label">分類</label>
                    <!-- <input id="category" type="text" class="form-control" placeholder="請輸入分類" v-model="modalProduct.category"> -->
                    <v-field id="category" name="分類" type="text" class="form-control"  placeholder="請輸入分類" v-model="modalProduct.category"
                    :class="{ 'is-invalid': errors['分類'] }"
                    rules="required"></v-field>
                    <ErrorMessage name="分類" class="invalid-feedback"></ErrorMessage>
                  </div>
                  <div class="mb-3 col-md-6">
                    <label for="price" class="form-label">單位</label>
                    <!-- <input id="unit" type="text" class="form-control" placeholder="請輸入單位" v-model="modalProduct.unit"> -->
                    <v-field id="unit" name="單位" type="text" class="form-control"  placeholder="請輸入單位" v-model="modalProduct.unit"
                    :class="{ 'is-invalid': errors['單位'] }"
                    rules="required"></v-field>
                    <ErrorMessage name="單位" class="invalid-feedback"></ErrorMessage>
                  </div>
                </div>
    
                <div class="row">
                  <div class="mb-3 col-md-6">
                    <label for="origin_price" class="form-label">原價</label>
                    <!-- <input id="origin_price" type="number" min="0" class="form-control" placeholder="請輸入原價" v-model="modalProduct.origin_price"> -->
                    <v-field id="origin_price" name="原價" type="number" class="form-control"  placeholder="請輸入原價" v-model.number="modalProduct.origin_price"
                    :class="{ 'is-invalid': errors['原價'] }"
                    min="0"
                    rules="required|min_value:0|numeric|integer"></v-field>
                    <ErrorMessage name="原價" class="invalid-feedback"></ErrorMessage>
                  </div>
                  <div class="mb-3 col-md-6">
                    <label for="price" class="form-label">售價</label>
                    <!-- <input id="price" type="number" min="0" class="form-control" placeholder="請輸入售價" v-model="modalProduct.price"> -->
                    <v-field id="price" name="售價" type="number" class="form-control"  placeholder="請輸入售價" v-model.number="modalProduct.price"
                      :class="{ 'is-invalid': errors['售價'] }"
                      min="0"
                      rules="required|min_value:0|numeric|integer"></v-field>
                    <ErrorMessage name="售價" class="invalid-feedback"></ErrorMessage>
                  </div>
                </div>
                <hr>
                <div class="mb-3">
                    <label for="description" class="form-label">產品描述</label>
                    <textarea id="description" type="text" class="form-control"
                            placeholder="請輸入產品描述" v-model="modalProduct.description">
                    </textarea>
                </div>
                <div class="mb-3">
                    <label for="content" class="form-label">說明內容</label>
                    <textarea id="description" type="text" class="form-control"
                            placeholder="請輸入說明內容" v-model="modalProduct.content">
                    </textarea>
                </div>
                <div class="mb-3">
                  <div class="form-check">
                      <input id="is_enabled" class="form-check-input" type="checkbox"
                              :true-value="1" :false-value="0" v-model="modalProduct.is_enabled">
                      <label class="form-check-label" for="is_enabled">是否啟用</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                取消
            </button>
            <button type="button" class="btn btn-primary">
                確認
            </button>
          </div>
        </v-form>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import Modal from 'bootstrap/js/dist/modal.js'
const { VITE_API_URL,VITE_API_PATH } = import.meta.env;

export default {
  props:['tempProduct','isNew'],
  data() {
    return {
      productModal: ''
    }
  },
  methods:{
    uploadFile () {
      const formData = new FormData()
      formData.append('file-to-upload', this.$refs.fileInput.files[0])
      const url = `${VITE_API_URL}/api/${VITE_API_PATH}/admin/upload`

      Swal.fire({
        title: '上傳圖片中',
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading()
        },
        willClose: () => {
          this.$http.post(url, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
            .then(res => {
              if (res.data.success) {
                this.modalProduct.imageUrl = res.data.imageUrl
              }
              this.$refs.fileInput.value = ''
            })
            .catch(err => {
              Swal.fire({
                icon: 'error',
                title: err.response.data.message
              })
              this.$refs.fileInput.value = ''
            })
        }
      })
    },
    createImagesUrl () {
      if (!this.modalProduct.imagesUrl) {
        this.modalProduct.imagesUrl = []
      }
      this.modalProduct.imagesUrl.push('')
    },
    deleteImagesUrl () {
      this.modalProduct.imagesUrl.pop()
    },
    show() {
      this.productModal.show()
    },
    hide() {
      this.productModal.hide()
    }
  },
  mounted() {
    this.productModal = new Modal(this.$refs.productModal)
  },
  computed: {
    modalProduct () {
      return this.tempProduct
    }
  }
}
</script>