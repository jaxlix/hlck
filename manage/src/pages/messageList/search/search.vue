<template>
   <div class="mapSearch">
   	 <i class="el-icon-search"></i>
     <el-input 
        v-model="input"
        placeholder="综合搜索"
     ></el-input>
   </div>
</template>

<style lang="less" scoped>
  .mapSearch{
  	position: relative;
  	.el-icon-search{
  	  position: absolute;
  	  top: 65px;
  	  left:187px;
  	  font-size: 30px;
      color: white;
      z-index: 23;
    }
  }
  
</style>
<script>
export default {
  data() {
    return {
      input: ''
    }
  }
}
</script>
