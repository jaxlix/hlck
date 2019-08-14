<template>
  <div id="app">
    <el-container style="height: 100%;">
      <el-header style="background-color:#252525;">
        <banner></banner>
      </el-header>

      <el-container>
        <el-aside width="200px" style="background-color: #35373F;">
          <el-menu
            :default-active="indexActive"
            @select="select"
            class="el-menu-vertical-demo"
            background-color="#35373F"
            text-color="#fff"
            active-text-color="#4285F4"
            :router=true
          >
            <el-menu-item index="/messageList">
              <i class="iconfont iconerji-yingyonggailan"></i>
              <span slot="title">概览</span>
            </el-menu-item>

            <el-submenu index="2">
              <template slot="title">
                <i class="iconfont iconrenwu"></i>
                <span>任务安排</span>
              </template>
              <el-menu-item index="/taskPlan"><i class="iconfont"></i>任务列表</el-menu-item>
              <el-menu-item index="/taskPlan/siteManage"><i class="iconfont"></i>站点管理</el-menu-item>
            </el-submenu>

            <el-submenu index="3">
              <template slot="title">
                <i class="iconfont iconfenxi"></i>
                <span>查询分析</span>
              </template>
              <el-menu-item index="/analysis"><i class="iconfont"></i>即席查询</el-menu-item>
              <el-menu-item index="/informationList"><i class="iconfont"></i>信息列表</el-menu-item>
              <el-menu-item index="/systemAnalysis"><i class="iconfont"></i>系统分析</el-menu-item>
            </el-submenu>

            <el-submenu index="4">
              <template slot="title">
                <i class="iconfont iconxitongguanli"></i>
                <span>系统管理</span>
              </template>
              <el-menu-item index="/systemManage"><i class="iconfont"></i>授权管理</el-menu-item>
              <el-menu-item index="/systemManage/policy"><i class="iconfont"></i>策略管理</el-menu-item>
              <el-menu-item index="/systemManage/blacklist"><i class="iconfont"></i>黑名单管理</el-menu-item>
              <el-menu-item index="/systemManage/InterfaceManage"><i class="iconfont"></i>第三方接口管理</el-menu-item>
              <el-menu-item index="/systemManage/userList"><i class="iconfont"></i>角色列表</el-menu-item>
              <el-menu-item index="/systemManage/logManage"><i class="iconfont"></i>日志管理</el-menu-item>
            </el-submenu>
            
          </el-menu>
        </el-aside>

        <el-main>
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import banner from "./components/banner/banner";
import './assets/icon/iconfont.css';
import {mapGetters} from 'vuex';
export default {
  name: "App",
  data(){
    return {
      indexActive: sessionStorage.getItem('indexActive') || '/messageList'
    }
  },
  components: {
    banner: banner
  },
  methods: {
    select(index){
      sessionStorage.setItem('indexActive', index)
    }
  }
};
</script>

<style>
html,
body {
  background: rgb(245, 245, 245);
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.mapSearch .el-input__inner {
  background: rgba(0, 0, 0, 0.5);
  width: 70%;
  margin: 0 auto;
  margin-top: 50px;
  height: 60px;
  border-radius: 100px;
  color: white;
  font-size: 16px;
  padding-left: 50px;
}
.el-table th > .cell {
  text-align: center;
}
.el-table .cell {
  text-align: center;
}
.inputPlan .el-input__inner {
  width: 300px;
}
.el-loading-mask {
  position: fixed;
  width: 100%;
  z-index: 10;
  top: 0;
  left: 0;
}
.el-table__empty-block {
  display: none;
}

.minemap-popup {
  max-width: 200px;
}
.resultContent li {
  margin: 0 2px !important;
}

.markContent p {
  padding: 4px;
  text-align: left;
}
.markContent p span {
  padding: 0px 10px;
}
.el-aside::-webkit-scrollbar {
    display: none;
}
.el-aside{
  position: relative;
  z-index: 20;
}
.el-main{
  padding: 0;
}
.el-menu-vertical-demo{
  text-align: left;
}
.iconfont{
  margin-right: 10px;
}
.iconrenwu, .iconfenxi, .iconxitongguanli{
  margin-right: 5px;
  font-size: 24px;
}
.banner .el-dialog__header{
  background: #4285F4;
  text-align: left;
}
.banner .el-dialog__title{
  color: white;
}
.banner .el-dialog__headerbtn .el-dialog__close{
  color: white;
}
</style>
