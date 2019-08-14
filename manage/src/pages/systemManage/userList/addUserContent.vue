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
          inactive-color="#ccc">
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
      peopleCheck: true,  // 人员盘查
      idCardCheck: true,  // 身份证查询
      passportCheck: true,  // 护照查询
      drivingCheck: true,  // 驾照查询
      NFCCheck: true,  // NFC查询
      carCheck: true,  // 车辆查询
      record: true,  // 核查记录
      statistics: true,  // 核查统计
      comparison: true, //人像比对
      isGly: false
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

        this.$post(`${this.url}/xhHlck/addXhRole`,
          params
        )
        .then((response) => {
          if(response.code == 200){
            this.$message({
              message: '新增成功',
              type: 'success'
            });
            this.bus.$emit('setDialogTableVisible');
            this.bus.$emit('getXhRole');
          }else{
            this.$message.error('新增失败');
          }    
        })
    }
  }
}
</script>