<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-end align-items-center mb-0 py-2">
      <li class="page-item"
        :class="{ disabled: !pages.has_pre}">
        <a class="page-link" href="#" aria-label="Previous" 
          @click="getProducts(pages.current_page-1)">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>

      <li class="page-item"
        :class="{ active: page === pages.current_page }"
        v-for="page in pages.total_pages" :key="page +'page'">
        <a class="page-link" href="#" @click="$emit('change-page',page)">{{page}}</a>
      </li>

      <li class="page-item"
        :class="{ disabled: !pages.has_next }">
        <a class="page-link" href="#" aria-label="Next" 
          @click="getProducts(pages.current_page+1)">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
  export default {
    props:['pages','getProducts']
  }
</script>

