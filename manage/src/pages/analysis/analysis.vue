<template>
  <div class="analysis">
    <div class="analysis-title">
      <p>即席查询</p>
    </div>
    <div class="analysis-box">
      <el-tabs type="border-card" v-model="taskType" @tab-click="taskTypeChange">
        <el-tab-pane label="大型安保任务" name="2"></el-tab-pane>
        <el-tab-pane label="路面日常核查" name="1"></el-tab-pane>
        <div class="analysis-tabs">
          <el-tabs v-model="xhCheckType">
            <el-tab-pane label="人员盘查" name="1"></el-tab-pane>
            <el-tab-pane label="车辆盘查" name="2"></el-tab-pane>
            <el-tab-pane label="护照盘查" name="3"></el-tab-pane>
            <!-- <el-tab-pane label="操作日志" name="4"></el-tab-pane> -->
          </el-tabs>
        </div>
        <personnelCheck v-show="xhCheckType==1"></personnelCheck>
        <carCheck v-show="xhCheckType==2"></carCheck>
        <passportCheck v-show="xhCheckType==3"></passportCheck>
        <!-- <operationLog v-show="xhCheckType==4"></operationLog> -->
      </el-tabs>
    </div>
  </div>
</template>
<style lang="less" scoped>
.analysis {
  position: relative;
  z-index: 2;
  padding-top: 60px;
}
.analysis-box{
  margin: 20px;
}
.analysis-title {
  background: white;
  margin: 0 auto;
  height: 50px;
  box-shadow: 0 2px 5px #eee;
  position: absolute;
  width: 100%;
  top: 0px;
  left: 0;
  z-index: 22;
  p {
    margin-left: 20px;
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
}
.analysis-tabs {
  padding: 10px 20px 0 20px;
  text-align: left;
}
.analysis-body {
  margin: 20px;
  padding-left: 20px;
  padding-right: 20px;
  background-color: #fff;
  border-radius: 6px;
}
.manageTop {
  display: flex;
  padding-top: 20px;
  padding-bottom: 20px;
}
.manage-inp1 {
  width: 200px;
  margin-right: 20px;
}
.manage-inp2 {
  width: 280px;
  margin-right: 20px;
}
.select {
  display: flex;
  padding-top: 20px;
  padding-bottom: 20px;
  border-top: 1px solid #f0f0f0;
}
</style>
<script>
import personnelCheck from "./personnelCheck";
import carCheck from './carCheck';
import passportCheck from './passportCheck';
import operationLog from './operationLog';
import minzu from './minzu.json';
export default {
  data() {
    return {
      xhCheckType: "1",
      taskType: "2",  // String 是 0:无任务，1:日常任务，2:大型安保 
    };
  },
  components: {
    personnelCheck: personnelCheck,
    carCheck: carCheck,
    passportCheck: passportCheck,
    operationLog: operationLog
  },
  methods: {
    taskTypeChange(d){
      this.$store.commit("TASKTYPE",{
        taskType: this.taskType
      });
    }
  }
}
</script>
