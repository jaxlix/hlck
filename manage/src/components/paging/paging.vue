<template>
  <el-pagination
    background
    layout="prev, pager, next"
    :total="pageTotal"
    class="pagination"
    v-if="paginationShow" 
    @current-change="handleCurrentChange"
  >
  </el-pagination>
</template>
<script>
  import {mapGetters} from 'vuex';

  export default {
    data() {
      return {
        paginationShow : true
      }
    },
    computed: {
	    ...mapGetters({
	 	    pageTotal: 'pageTotal',
	    })
    },
    methods:{
      handleCurrentChange(val) {
        this.$store.commit("PAGE",{
          pageTotal: this.pageTotal,
          pageNum: val
        });       
      }
    }
  }
</script>