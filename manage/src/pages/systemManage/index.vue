<template>
  <div class="systemManage">
    <div class="systemManageTitle">
      <p>授权管理</p>
  	</div>
    <systemManage></systemManage>
  </div>
</template>
<style lang="less" scoped>
  .systemManage{
    position: relative;
    margin:0 auto;
    z-index: 2;
    .systemManageTitle{
      background: white;
      margin:0 auto;
      height: 50px;
      box-shadow: 0 2px 5px #eee;
      position: fixed;
      width: 100%;
      top: 60px;
      left: 0;
      z-index: 22;
      p{
      	margin-left:240px;
      	text-align: left;
      	line-height: 20px;
      	height: 20px;
      	font-weight: bold;
      	font-size: 15px;
      	border-left: 3px solid black;
      	padding-left: 6px;
      	position: relative;
      	top: 15px;
      }
      span{
      	display: inline-block;
      	border-left: 2px solid black;
      	padding-right: 20px;
      }
    }
  }
</style>
<script>
import systemManage from './manage/systemManage';
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components:{
    systemManage : systemManage
  }
}
</script>