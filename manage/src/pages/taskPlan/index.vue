<template>
  <div class="taskPlan">
    <div class="taskPlanTitle">
      <p>任务列表</p>
  	</div>
    <taskPlan></taskPlan>
  </div>
</template>
<style lang="less" scoped>
  .taskPlan{
    position: relative;
    z-index: 1;
    padding-top: 50px;
    .taskPlanTitle{
      position: fixed;
      top: 60px;
      left: 0;
      width: 100%;
      z-index: 3;
      background-color: #fff;
      margin:0 auto;
      height: 50px;
      box-shadow: 0 2px 5px #eee;
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
import taskPlan from './taskPlan'

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components:{
    taskPlan : taskPlan
  }
}
</script>