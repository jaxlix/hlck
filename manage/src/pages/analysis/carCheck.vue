<template>
  <div class="analysis-body">
    <div class="manageTop">
      <div class="manage-inp2">
        <el-input v-model="nameOrIdCard" placeholder="被查人员姓名"></el-input>
      </div>
      <div class="manage-inp2">
        <el-input v-model="cphm" placeholder="被查车牌号"></el-input>
      </div>
      <div class="manage-inp2">
        <el-input v-model="orgName" @focus="showBumen = true" clearable @clear="clearBumen" placeholder="部门"></el-input>
      </div>
      <div class="manage-inp2">
        <el-input v-model="checkPersonName" @focus="showRenyuan = true" clearable @clear="clearRenyuan" placeholder="部门人员"></el-input>
      </div>
      <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
      <el-button type="primary" style="margin-left:20px;" @click="daochu">导出excel</el-button>
    </div>

    <div class="select">
      <el-select v-model="areaId" @change="selecter" placeholder="核查地点">
        <el-option
          v-for="item in placeOptions"
          :key="item.areaId"
          :label="item.areaName"
          :value="item.areaId"
        ></el-option>
      </el-select>&nbsp;&nbsp;
      <el-select v-model="checkResultId" @change="selecter" placeholder="处置结果">
        <el-option
          v-for="item in resultOptions"
          :key="item.checkResultId"
          :label="item.resultName"
          :value="item.checkResultId"
        ></el-option>
      </el-select>&nbsp;&nbsp;
      <el-date-picker
        v-model="dateTime"
        type="datetimerange"
        @change="selecter"
        value-format="yyyy-MM-dd HH:mm"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
    </div>

    <div class="tableData">
      <el-table :data="tableData" style="width: 100%">
        <!-- <el-table-column type="selection" width="55"></el-table-column> -->
        <el-table-column prop="vehiclePlateNo" label="车牌号"></el-table-column>
        <el-table-column prop="vehicleColor" label="车辆颜色"></el-table-column>
        <el-table-column prop="vehicleManufacturer" label="制造厂商"></el-table-column>
        <el-table-column prop="vehicleMotorNo" label="发动机号"></el-table-column>
        <el-table-column prop="vehicleGroundNo" label="车架编号"></el-table-column>
        <el-table-column prop="personsInVehicle" label="车主姓名"></el-table-column>
        <el-table-column prop="checkTypeName" label="车主证件号"></el-table-column>
        <el-table-column prop="checkPersonId" label="登录id"></el-table-column>
        <el-table-column prop="name" label="盘查人姓名"></el-table-column>
        <el-table-column prop="eName" label="盘查人单位"></el-table-column>
        <el-table-column prop="areaName" label="盘查地点"></el-table-column>
        <el-table-column prop="checkTime" label="盘查时间"></el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="showDetails(scope.row)">详情</el-button>
            </template>
        </el-table-column>
      </el-table>

      <el-pagination
        background
        layout="prev, pager, next"
        :total="pageTotal"
        class="pagination"
        v-if="paginationShow"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
    <el-dialog title="详情" :visible.sync="dialogTableVisible" :modal-append-to-body="false">
      <table class="table-detail">
        <tr>
          <td>车牌号:</td>
          <td>{{rowData.vehiclePlateNo}}</td>
          <td>车辆颜色:</td>
          <td>{{rowData.vehicleColor}}</td>
        </tr>
        <tr>
          <td>制造厂商:</td>
          <td>{{rowData.vehicleManufacturer}}</td>
          <td>发动机号:</td>
          <td>{{rowData.vehicleMotorNo}}</td>
        </tr>
        <tr>
          <td>车架编号:</td>
          <td>{{rowData.vehicleGroundNo}}</td>
          <td>车主姓名:</td>
          <td>{{rowData.personsInVehicle}}</td>
        </tr>
        <tr>
          <td>车主证件号:</td>
          <td>{{rowData.vehiclePersonsCard}}</td>
          <td>盘查时间:</td>
          <td>{{rowData.checkTime}}</td>
        </tr>
        <tr>
          <td>盘查人姓名:</td>
          <td>{{rowData.compareDesc}}</td>
          <td>盘查人单位:</td>
          <td>{{rowData.checkTime}}</td>
        </tr>
        <!-- <tr><td class="table-img" colspan="4"><img src="../../assets/people.png" alt=""></td></tr> -->
      </table>
    </el-dialog>
    <el-dialog title="选择部门" :visible.sync="showBumen" :modal-append-to-body="false">
      <el-tree
        :data="bumenData"
        node-key="id"
        :check-on-click-node="true"
        @node-expand="expand"
        @node-click="chooseBumen"
        :props="defaultProps">
      </el-tree>
    </el-dialog>
    <el-dialog title="选择人员" :visible.sync="showRenyuan" :modal-append-to-body="false">
      <div v-if="orgId === ''">请先选择部门</div>
      <div v-if="orgId && userList.length===0">暂无人员</div>
      <el-radio-group v-if="userList.length > 0" @change="checkRadio" v-model="checkPersonId" size="medium" style="text-align:left;">
        <el-radio class="radio" v-for="(item, index) in userList" :key="index" :label="item.loginId" border>{{item.name}}</el-radio>
      </el-radio-group>
    </el-dialog>
  </div>
</template>
<style lang="less" scoped>
.analysis {
  position: relative;
  z-index: 2;
  padding-top: 60px;
}
.analysis-title {
  background: white;
  margin: 0 auto;
  height: 50px;
  box-shadow: 0 2px 5px #eee;
  position: fixed;
  width: 100%;
  top: 60px;
  left: 0;
  z-index: 22;
  p {
    margin-left: 240px;
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
.table-detail{
  width: 100%;
  tr{
    td{
      padding: 5px;
      border: 1px solid #c6cbd4; 
    }
    td:nth-child(2n-1){
      text-align: right;
    }
    td:nth-child(2n){
      text-align: left;
    }
    td.table-img{
      text-align: left;
      img{
        width: 164px;
        height: 164px;
        border-radius: 50%;
      }
    }
  }
}
.radio{
  margin: 10px !important;
}
</style>
<script>
import minzu from "./minzu.json";
import {mapGetters} from 'vuex';
import '../../common/tools';

export default {
  data() {
    return {
      tableData: [],
      rowData: {},
      paginationShow: true,
      dialogTableVisible: false,
      noData: true,
      pageTotal: 1,
      pageNum: 1,
      nameOrIdCard: "",
      cphm: "",
      dateTime: [],
      areaId: '',
      placeOptions: [],
      checkResultId: "",
      resultOptions: [],
      showBumen: false,
      orgId: '',
      orgName: '',
      checkPersonId: '',
      checkPersonName: '',
      bumenData: [{
        id: '4bc9e4b4-dc9e-4b3b-981e-09ecdec171ac',
        label: '贵州省公安厅',
        children: []
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      alreadyLoad: {}, // 保存已经加载的部门id
      userList: [],  // 部门人员
      showRenyuan: false
    };
  },
  computed: {
	  ...mapGetters({
			taskType: 'taskType',
    })
  },
  watch:{
    taskType(){
      this.getCheckData()
    }
  },
  methods: {
    getCheckData() {
        let params = new URLSearchParams();
        params.append("xhTaskType", this.taskType);
        params.append("xhCheckType", 2);
        params.append("nameOrIdCard", this.nameOrIdCard);
        params.append("cphm", this.cphm);
        params.append("areaId", this.areaId);
        params.append("checkResultId", this.checkResultId);
        params.append("startTime", this.dateTime[0]||'');
        params.append("endTime", this.dateTime[1]||'');
        params.append("pageNum", this.pageNum);
        params.append("pageSize", 10);
        params.append("checkPersonId", this.checkPersonId);
        params.append("orgId", this.orgId);
        this.$post(`${this.url}/xhHlckTwo/getCheckDataUserDept`, params).then(
            response => {
            if (response.code == 200) {
                this.tableData = [];
                let page = JSON.parse(response.data);
                let data = JSON.parse(response.data).carList;
                this.pageTotal = page.sumCar;
                if (data.length == 0) {
                    this.tableData = [];
                    this.noData = true;
                    return;
                }
                this.noData = false;
                this.tableData = data;
            } else {
                this.$message.error("获取列表失败");
            }
            }
        );
    },
    showDetails(d){
      this.rowData = d;
      this.dialogTableVisible = true;
    },
    search() {
      this.getCheckData();
    },
    selecter(){
      this.getCheckData()
    },
    daochu() {
      let params = {
        "xhTaskType": this.taskType,
        "xhCheckType": 2,
        "nameOrIdCard": this.nameOrIdCard,
        "cphm": this.cphm,
        "areaId": this.areaId,
        "checkResultId": this.checkResultId,
        "startTime": this.dateTime[0]||'',
        "endTime": this.dateTime[1]||'',
        "checkPersonId": this.checkPersonId,
        "orgId": this.orgId
      };
      xh_lx.downLoad(`${this.url}/xhHlckTwo/exportCheckDataUserDept`, params);
    },
    handleCurrentChange(val){
      this.pageNum = val;
      this.getCheckData();
    },
    getXhArea() {
      let params = new URLSearchParams();
      this.$post(`${this.url}/xhHlck/getXhArea`, params).then(response => {
        if (response.code == 200) {
          let data = JSON.parse(response.data).list;
          let arr = [{areaId:'', areaName: '全部核查地点'}];
          data.forEach((d,i)=>{
            arr.push({areaId: d.areaId, areaName: d.areaName})
          });
          this.placeOptions = arr;
        } else {
          this.$message.error("获取核查地点失败");
        }
      });
    },
    getXhCheckResult() {
      let params = new URLSearchParams();
      params.append('checkType', 2);
      this.$post(`${this.url}/xhHlck/getXhCheckResult`, params).then(
        response => {
          if (response.code == 200) {
            let data = JSON.parse(response.data).list;
            let arr = [{checkResultId: '',resultName: '全部处置结果'}];
            data.forEach((d,i)=>{
              arr.push({checkResultId: d.checkResultId,resultName: d.resultName});
            });
            this.resultOptions = arr;
          } else {
            this.$message.error("获取处置结果失败");
          }
        }
      );
    },
    getDept(orgId) {
      this.alreadyLoad[orgId] = 1;
        let params = new URLSearchParams();
        params.append('orgId', orgId);
        this.$post(`${this.url}/xhHlckTwo/getSubDeptByOrgid`,params)
        .then((response) => {
          if(response.code == 200){
            let list = JSON.parse(response.data).list;
            let arr = [];
            list.forEach((d,i)=>{
              let obj = {};
              obj.id = d.orgId;
              obj.label = d.name;
              obj.children = [];
              arr.push(obj);
            });
            // 将数据添加到对应的节点
            const dataFormatter = function(data, arr, orgId){
              for (let i = 0 ; i < data.length; i++) {
                if (data[i].id == orgId) {
                  data[i].children = arr;
                  return false
                }else if(i == data.length-1){
                  dataFormatter(data[i].children, arr, orgId);               
                }
              }
            }
            dataFormatter(this.bumenData, arr, orgId);
          }else{
            this.$message.error('查询失败');
          }
        })  
      },
    // 节点展开时触发
      expand(data, node){
        data.children.forEach((d,i)=>{
          if(!this.alreadyLoad[d.id]){
            this.getDept(d.id)
          }
        })
      },
      chooseBumen(data, node){
        if(data.children.length === 0){
          this.orgId = data.id
          this.orgName = data.label
          this.showBumen = false
          this.getSysUser()
        }
      },
      getSysUser(){
        let params = new URLSearchParams()
        params.append('orgId', this.orgId)
        this.$post(`${this.url}/xhHlckTwo/getSysUser`,params)
        .then( res => {
          if(res.code === 200){
            let data = JSON.parse(res.data).list || []
            this.userList = data
          }
        })
      },
      checkRadio(d){
        for(let i=0; i< this.userList.length;i++){
          if(this.userList[i].loginId === d){
            this.checkPersonName = this.userList[i].name
            break
          }
        }
        this.showRenyuan = false
      },
      clearRenyuan(){
        this.checkPersonId = ''
      },
      clearBumen(){
        this.orgId = ''
      }
  },
  mounted() {
    this.getCheckData()
    this.getXhArea()
    this.getXhCheckResult()
    this.getDept('4bc9e4b4-dc9e-4b3b-981e-09ecdec171ac')
  }
};
</script>
