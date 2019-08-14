<template>
  <div class="addUserContent">
  	<div class="add">
	    <div class="addList">
	  	  <span class="userName">角色名称<em>*</em></span>
	  	  <el-input v-model="userName" placeholder="角色名称" class="input"></el-input>
	  	</div>
	  	
      <div class="addList">
        <span>管理员<em>*</em></span>
        <i>该角色为管理员 </i>
        <el-switch
          v-model="isGly"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
      </div>

	  	<div class="addList power">
	  	  <span>分配权限<em>*</em></span>
	  	  <div class="addListRight">
	  	
  		    <div class="checkbox">
            <el-checkbox v-model="peopleCheck" @change="handleCheckAllChange">人员盘查</el-checkbox>
            <div style="margin: 15px 0;"></div>
            <div class="checkbox-group" v-show="false">
              <el-checkbox v-model="idCardCheck" @change="handleCheckedCitiesChange">身份证查询</el-checkbox>
              <el-checkbox v-model="passportCheck" @change="handleCheckedCitiesChange">护照查询</el-checkbox>
              <el-checkbox v-model="drivingCheck" @change="handleCheckedCitiesChange">驾照查询</el-checkbox>
              <el-checkbox v-model="NFCCheck" @change="handleCheckedCitiesChange">NFC识别</el-checkbox>
            </div>

    		    <div class="type">
    		      <el-checkbox v-model="carCheck">车辆查询</el-checkbox>
    		    </div>
    		    <div class="type">
    		      <el-checkbox v-model="record">核查记录</el-checkbox>
    		    </div>
    		    <div class="type">
    		      <el-checkbox v-model="statistics">核查统计</el-checkbox>
    		    </div>	
            <!-- <div class="type">
              <el-checkbox v-model="comparison">人像比对</el-checkbox>
            </div>	     -->
    		  </div>   
	  	  </div>  
	  	</div>
      <div class="sure">
        <el-button type="primary" class="sureButton" @click="addRole()">确定</el-button>
      </div>
	  </div>
  </div>
</template>
 <style lang="less" scoped>
  .addUserContent{
    border-radius: 2px;
    .add{
      background: white;
      padding: 0 20px;
    }
    .addList{
      display: flex;
      margin-bottom: 16px;
      i{
        font-size: 14px;
        margin-right: 15px;
      }
      .userName{
        position: relative;
        top: 10px;
      }
      >span{
      	display: inline-block;
      	width: 100px;
      	text-align: left;
      	font-size: 14px;
      	em{
      	  color: red;
      	  position: relative;
      	  top: 2px;
      	  left: 2px;
      	}
      }
      .textarea{
      	width: 600px;
      }
      .input{
      	width: 216px;
      }
      .checkbox{
      	margin-top: 8px;
      	.peopleSearch{
      	  margin-left: 40px;
      	}
      }
    }
    .power{
      display: flex;
      >span{
      	display: block;
      }
      .addListRight{
      	text-align: left;
      }
      .type{
      	margin-top: 10px;
      }
    }
    .sure{
      text-align: left;
      margin-top: 20px;
      margin-left: 100px;
      .sureButton{
      	height: 30px;
      	line-height: 0px;
      }
    }
  }
  .checkbox-group{
    padding-left: 40px;
  }
</style>
<script>
export default {
  data () {
    return {
      userName: '',
      roleId: '',
      peopleCheck: false,  // 人员盘查
      idCardCheck: false,  // 身份证查询
      passportCheck: false,  // 护照查询
      drivingCheck: false,  // 驾照查询
      NFCCheck: false,  // NFC查询
      carCheck: false,  // 车辆查询
      record: false,  // 核查记录
      statistics: false,  // 核查统计
      comparison: false, //人像比对
      isGly: false
    }
  },
  created(){
    console.log(this.rowData)
    this.userName = this.rowData.roleName;
    this.roleId = this.rowData.roleId;
    this.isGly = this.rowData.isAdmin==1;
    let roleStatus = JSON.parse(this.rowData.roleStatus);
    //{"peopleCheck":["身份证查询","护照查询","驾照查询","NFC识别"],
    //"carCheck":"车辆查询","record":"核查记录","statistics":"核查统计","comparison":"人像比对"}
    this.peopleCheck = roleStatus.peopleCheck ? true : false;
    if(roleStatus.peopleCheck){
      let str = roleStatus.peopleCheck.join(',');
      this.idCardCheck = str.indexOf('身份证查询') != -1 ? true : false;
      this.passportCheck = str.indexOf('护照查询') != -1 ? true : false;
      this.drivingCheck = str.indexOf('驾照查询') != -1 ? true : false;
      this.NFCCheck = str.indexOf('NFC识别') != -1 ? true : false;
    }
    this.carCheck = roleStatus.carCheck ? true : false;
    this.record = roleStatus.record ? true : false;
    this.statistics = roleStatus.statistics ? true : false;
    this.comparison = roleStatus.comparison ? true : false;
  },
  props:['rowData'],
  computed:{
    newData() {
      return this.rowData;
    }
  },
  watch:{
    newData(data) {
      this.userName = data.roleName;
      this.roleId = data.roleId;
      this.isGly = data.isAdmin==1;
      let roleStatus = JSON.parse(data.roleStatus);
      //{"peopleCheck":["身份证查询","护照查询","驾照查询","NFC识别"],
      //"carCheck":"车辆查询","record":"核查记录","statistics":"核查统计","comparison":"人像比对"}
      this.peopleCheck = roleStatus.peopleCheck ? true : false;
      if(roleStatus.peopleCheck){
        let str = roleStatus.peopleCheck.join(',');
        this.idCardCheck = str.indexOf('身份证查询') != -1 ? true : false;
        this.passportCheck = str.indexOf('护照查询') != -1 ? true : false;
        this.drivingCheck = str.indexOf('驾照查询') != -1 ? true : false;
        this.NFCCheck = str.indexOf('NFC识别') != -1 ? true : false;
      }
      this.carCheck = roleStatus.carCheck ? true : false;
      this.record = roleStatus.record ? true : false;
      this.statistics = roleStatus.statistics ? true : false;
      this.comparison = roleStatus.comparison ? true : false;
    }
  },
  methods: {
    handleCheckAllChange(val) {
      this.peopleCheck = val;
      this.idCardCheck = val;  // 身份证查询
      this.passportCheck = val;  // 护照查询
      this.drivingCheck = val;  // 驾照查询
      this.NFCCheck = val;
    },
    handleCheckedCitiesChange() {
      if(this.idCardCheck || this.passportCheck || this.drivingCheck || this.NFCCheck){
        this.peopleCheck=true
      }else{
        this.peopleCheck=false
      }
    },
    addRole() {
      if(!this.userName){
        this.$message({
          message: '角色名称不能为空',
          type: 'warning'
        });
        return;
      }
      let isAdmin = this.isGly ? 1 : 0;
      let arr = [];
      if(this.idCardCheck){
        arr.push('身份证查询');
      }
      if(this.passportCheck){
        arr.push('护照查询');
      }
      if(this.drivingCheck){
        arr.push('驾照查询');
      }
      if(this.NFCCheck){
        arr.push('NFC识别');
      }
      let json = {
        peopleCheck: this.peopleCheck ? arr : false,  // 人员盘查
        carCheck: this.carCheck ? '车辆查询' : false,  // 车辆查询
        record: this.record ? '核查记录' : false,  // 核查记录
        statistics: this.statistics ? '核查统计' : false,  // 核查统计
        comparison: this.comparison ? '人像比对' : false //人像比对
      };
  
      let params = new URLSearchParams();
      params.append('roleStatus', JSON.stringify(json));
      params.append('isAdmin', isAdmin);
      params.append('roleName', this.userName);
      params.append('roleId', this.roleId);

      this.$post(`${this.url}/xhHlck/updateXhRole`,
      params).then((response) => {
        if(response.code == 200){
          this.$message({
          message: '修改成功',
          type: 'success'
          });
          this.bus.$emit('dialogTableVisibleXg');
          this.bus.$emit('getXhRole');
        }else{
          this.$message.error('修改失败');
        }    
      })
    }
  }
}
</script>