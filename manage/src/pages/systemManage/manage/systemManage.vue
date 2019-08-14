<template>
  <div class="systemManage">
  	<div class="zTreeLeft">
  	  <zTree></zTree>
  	</div>
  	<div class="manageRight">
      <manageContent></manageContent>
  	</div>
  </div>
</template>
<style lang="less" scoped>
  .systemManage{
    margin: 70px 20px 20px 20px;
    z-index: 1;
    display: flex;
    border-radius: 2px;
    .manageRight{
      width: 1000px;
      background: white;
      box-shadow: 0 0px 5px #ccc;
    }
    .zTreeLeft{
      width: 300px;
      padding: 15px;
      box-shadow: 0 0px 5px #ccc;
      background: white;
    }
  }
</style>
<script>
import zTree from '../../../components/ztree/zTree'
import manageContent from './manageContent'

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components:{
  	zTree : zTree,
    manageContent : manageContent
  }
}
</script>