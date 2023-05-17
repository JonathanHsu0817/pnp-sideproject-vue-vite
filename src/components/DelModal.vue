<template>
  <div id="delModal" ref="delModal" class="modal fade" tabindex="-1"
      aria-labelledby="delProductModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 id="delProductModalLabel" class="modal-title">
            <span>刪除產品{{ tempItem.title || `訂單編號 ${tempItem.id}` }}</span>
          </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>是否刪除<strong class="text-danger mb-2">{{ tempItem.title || `訂單編號 ${tempItem.id}` }}</strong> (刪除後將無法恢復)。</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
            <button type="button" class="btn btn-danger" @click="$emit('deleteProduct')">
                確認刪除
            </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Modal from 'bootstrap/js/dist/modal.js';

  export default {
    props:['delProduct','tempItem'],
    data() {
      return {
        delModal: ''
      };
    },
    methods:{
      show(){
        this.delModal.show()
      },
      hide(){
        this.delModal.hide()
      }
    },
    mounted() {
      this.delModal = new Modal(this.$refs.delModal)
    }
  }
</script>