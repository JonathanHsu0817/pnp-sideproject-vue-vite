<template>
  <div class="d-flex" :class="{'sidebar-toggled': isOpened }">
    <aside class="sidebar vh-100 border-end d-flex bg-white flex-column">
      <!-- 1. 後台名稱 -->
      <a href="#" class="d-block px-5 pb-2 bg-primary ">
        <h1 class="mb-0 lh-1">
          <img src="https://raw.githubusercontent.com/JonathanHsu0817/pnp-sideproject-vue-vite/50c90f0d43b9d9a02c615d063406e45a35470573/public/Logo.svg" width="104" alt="">
          <span class="fs-6 text-white">- 後台管理</span></h1>
      </a>
      <!-- 2. 選單 -->
      <div class="overflow-auto">
        <!-- <div>
          <a href="#" class="sidebar-link">
            <div class="px-5">
              首頁
            </div>
          </a>
        </div> -->

        <div>
          <a href="#" class="sidebar-link" id="btn-collapse" @click="menuToggle">
            <div class="d-flex justify-content-between align-items-center px-5">
              <p class="mb-0">
                訂單管理
              </p>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down" viewBox="0 0 16 16">
                <path d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z"/>
              </svg>
            </div>
          </a>
          <div class="collapse" id="menu-order">
            <router-link to="/admin/orders" class="sidebar-link">
              <div class="ps-9">
                訂單列表
              </div>
            </router-link>
            <!-- <a href="#" class="sidebar-link active">
              
            </a> -->
            <!-- <a href="#" class="sidebar-link">
              <div class="ps-9">
                單一訂單細節
              </div>
            </a> -->
          </div>
        </div>

        <div>
          <router-link to="/admin/products" class="sidebar-link">
            <div class="px-5">
              產品列表
            </div>
          </router-link>
        </div>

        <div>
          <router-link to="/admin/coupons" class="sidebar-link">
            <div class="px-5">
              優惠券管理
            </div>
          </router-link>
        </div>
      </div>
      <!-- 3. 登出按鈕 -->
      <a href="#" @click.prevent="logout" class="sidebar-link mt-auto">
        <div class="px-5">
          登出按鈕
        </div>
      </a>
    </aside>
    <main class="main">
      <div class="bg-white w-100 border-bottom sticky-top">
        <a href="#"
        class="d-inline-block py-4 px-5 border-end" @click.prevent="isOpened = !isOpened">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrows-angle-expand" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707z"/>
        </svg>
        </a>
      </div>
      <div class="p-5">
        <RouterView></RouterView>
      </div>
      
      <!-- <div class="p-5">
        主要內容
        <ul class="nav nav-pills mb-4">
          <li class="nav-item">
            <a class="nav-link active rounded-pill" aria-current="page" href="#">Active
              <span class="badge rounded-pill text-bg-light">900</span>
            </a>
          </li>
          <li class="nav-item rounded-pill">
            <a class="nav-link" href="#">Link
              <span class="badge rounded-pill text-bg-light">600</span>
            </a>
          </li>
          <li class="nav-item rounded-pill">
            <a class="nav-link" href="#">Link</a>
          </li>
          <li class="nav-item rounded-pill">
            <a class="nav-link disabled">Disabled</a>
          </li>
        </ul>

        <div class="card shadow-sm">
          <div class="card-header bg-transparent">
            <div class="input-group">
              <div class="dropdown pt-1">
                <button class="btn btn-outline-dark dropdown-toggle btn-sm" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  操作
                </button>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#">Action</a></li>
                  <li><a class="dropdown-item" href="#">Another action</a></li>
                  <li><a class="dropdown-item" href="#">Something else here</a></li>
                </ul>
              </div>
              <span class="input-group-text border-0 bg-transparent pe-1">
                <i class="bi bi-search"></i>
              </span>
              <input type="search" class="form-control border-0 shadow-none">
            </div>
          </div>
          <div class="card-body p-0">
            <div class="table-responsive">
              <table class="table table-hover mb-0">
                <thead class="bg-light">
                  <tr class="align-middle">
                    <th scope="col" class="ps-5"></th>
                    <th scope="col" class="py-3">訂單編號</th>
                    <th scope="col">Email</th>
                    <th scope="col">用戶姓名</th>
                    <th scope="col">購買品項</th>
                    <th scope="col">付款狀態</th>
                    <th scope="col">購買金額</th>
                    <th scope="col" class="pe-5">編輯</th>
                  </tr>
                </thead>
                <tbody class="text-nowrap">
                  <tr class="align-middle">
                    <td scope="row" class="py-4 ps-5">
                      <input type="checkbox" class="form-check-input">
                    </td>
                    <td>AX123456788</td>
                    <td>ab1234@email.com</td>
                    <td>卡小伯</td>
                    <td>六角西餐:大麥克全家餐</td>
                    <td><div class="text-muted">尚未付款</div></td>
                    <td class="text-end">900</td>
                    <td class="pe-4">
                      <div class="btn-group">
                        <a href="#" class="btn btn-sm btn-outline-dark">編輯
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                          </svg>
                        </a>
                        <button class="btn btn-outline-dark btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                          操作
                        </button>
                        <ul class="dropdown-menu">
                          <li><a class="dropdown-item" href="#">修改狀態</a></li>
                          <li><a class="dropdown-item text-danger" href="#" id="delBtn" data-bs-order-id="AX123456788">刪除訂單</a></li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                  <tr class="align-middle">
                    <td scope="row" class="py-4 ps-5">
                      <input type="checkbox" class="form-check-input">
                    </td>
                    <td>AX123456789</td>
                    <td>ab1234@email.com</td>
                    <td>卡小伯</td>
                    <td>六角西餐:大麥克全家餐</td>
                    <td><div class="text-muted">尚未付款</div></td>
                    <td class="text-end">900</td>
                    <td class="pe-4">
                      <div class="btn-group">
                        <a href="#" class="btn btn-sm btn-outline-dark">編輯
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                          </svg>
                        </a>
                        <button class="btn btn-outline-dark btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                          操作
                        </button>
                        <ul class="dropdown-menu">
                          <li><a class="dropdown-item" href="#">修改狀態</a></li>
                          <li><a class="dropdown-item" href="#">刪除訂單</a></li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="card-footer bg-transparent">
            <nav aria-label="Page navigation example">
              <ul class="pagination justify-content-end align-items-center mb-0 py-3">
                <li class="page-item">
                  <a class="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                <li class="page-item"><a class="page-link" href="#">1</a></li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item">
                  <a class="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          Modal
          <div class="modal fade" id="delModal">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalLabel">刪除訂單</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  確認刪除「<span id="delText"></span>」的訂單嗎？
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-outline-dark" data-bs-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-danger">確認刪除</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> -->
    </main>
  </div>
</template>

<script>
import Collapse from 'bootstrap/js/dist/collapse.js'
// const { VITE_API_URL } = import.meta.env;

export default {
  data() {
    return {
      isOpened: false,
      orderToggle: '',
      status: false,
    }
  },
  methods: {
    logout(){
      document.cookie = `hexschool=; expires=${new Date()}`;
      this.$router.push('/');
    },
    menuToggle(){
      this.orderToggle.toggle()
    }
  },
  mounted() {
    this.orderToggle = new Collapse('#menu-order',{
      toggle:true
    })
  }
}
</script>
