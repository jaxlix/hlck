<template>
    <div class="blacklist">
        <div class="blacklistTitle">
            <p>黑名单管理</p>
  	    </div>
        <div class="blacklistBody">
            <div class="manageTop">
                <el-input class="search-inp" v-model="loginName" placeholder="请输入盘查人姓名"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
                <div style="position:absolute;right:0;">
                  <el-button type="primary" style="margin-left:20px;" @click="dialogFormVisible=true">黑名单设置</el-button>
                  <el-button type="primary" style="margin-left:20px;" @click="daochu">导出excel</el-button>
                </div>
            </div>
            <div class="select">
              <el-select v-model="intervalTime" @change="search" placeholder="时间间隔">
                <el-option
                  v-for="item in timeOptions"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>&nbsp;&nbsp;
              <el-select v-model="num" @change="search" placeholder="盘查次数">
                <el-option
                  v-for="item in timesOptions"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>&nbsp;&nbsp;
              <el-select v-model="isBlack" @change="search" placeholder="拉黑">
                <el-option
                  v-for="item in laheiOptions"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>&nbsp;&nbsp;
              <el-date-picker
                    v-model="dateTime"
                    @change="search"
                    type="daterange"
                    value-format="yyyy-MM-dd"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
              </el-date-picker>
            </div>

            <div class="tableData">
              <el-table :data="tableData" style="width: 100%">
                <!-- <el-table-column type="selection" width="55"></el-table-column> -->
                <el-table-column prop="cardName" label="姓名"></el-table-column>
                <el-table-column prop="num" label="被查次数"></el-table-column>
                <el-table-column prop="intervalTime" label="时间间隔"></el-table-column>
                <el-table-column prop="isBlack" label="拉黑">
                  <template slot-scope="scope">
                    {{scope.row.isBlack==0?'否':'是'}}
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="220px">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="detail(scope.row)">详情</el-button>
                        <el-button type="warning" size="mini" @click="addXhBlackList(scope.row)">拉黑</el-button>
                        <el-button type="danger" size="mini" @click="del(scope.row.blackListId)">删除</el-button>
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
        </div>

        <!-- 黑名单设置 -->
        <el-dialog title="黑名单设置" :visible.sync="dialogFormVisible" :modal-append-to-body="false">
            <el-form ref="form" :model="form" label-width="120px">
                <el-form-item label="被查次数">
                    <el-select v-model="form.num" placeholder="请选择" style="width:100%;">
                      <el-option
                        v-for="item in timesOptionsSet"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="时间间隔">
                    <el-select v-model="form.intervalTime" placeholder="请选择" style="width:100%;">
                      <el-option
                        v-for="item in timeOptionsSet"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addSet">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 详情 -->
        <el-dialog title="详情" :visible.sync="dialogDetail" :modal-append-to-body="false">
          <table class="table-detail">
            <tr>
              <td>被盘查人姓名</td>
              <td>盘查地点</td>
              <td>盘查时间</td>
              <td>盘查人</td>
            </tr>
            <tr v-for="(d, i) in rowData" :key="i">
              <td>{{d.cardName}}</td>
              <td>{{d.areaName}}</td>
              <td>{{d.checkTime}}</td>
              <td>{{d.loginName}}</td>
            </tr>
          </table>
        </el-dialog>
    </div>
</template>
<style lang="less" scoped>
    .blacklist{
        position: relative;
        z-index: 2;
        padding-top: 60px;
    }
    .blacklistTitle{
        background: white;
        height: 50px;
        box-shadow: 0 2px 5px #eee;
        position: absolute;
        width: 100%;
        top: 0px;
        left: 0;
        z-index: 22;
        p{
            margin-left:20px;
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
    .blacklistBody{
        margin-top: 20px;
        margin-left: 20px;
        margin-right: 20px;
        padding: 0 20px 20px 20px;
        background-color: #fff;
    }
    .manageTop{
      position: relative;
        display: flex;
        padding: 20px 0;
        border-bottom: 1px solid #d8d8d8;
        .search-inp{
          width: 220px;
        }
    }
    .el-form-item__content{
      text-align: left;
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
  }
}
</style>

<script>
import '../../../common/tools';

  export default {
    data() {
      return {
        tableData: [],
        rowData: [],
        timeOptions: [
            {name:'全部',value:''},
            {name:'1天',value:'1'},
            {name:'2天',value:'2'},
            {name:'3天',value:'3'},
            {name:'4天',value:'4'},
            {name:'5天',value:'5'},
            {name:'6天',value:'6'},
            {name:'7天',value:'7'},
            {name:'8天',value:'8'},
            {name:'9天',value:'9'},
            {name:'10天',value:'10'},
        ],
        timeOptionsSet: [
            {name:'1天',value:'1'},
            {name:'2天',value:'2'},
            {name:'3天',value:'3'},
            {name:'4天',value:'4'},
            {name:'5天',value:'5'},
            {name:'6天',value:'6'},
            {name:'7天',value:'7'},
            {name:'8天',value:'8'},
            {name:'9天',value:'9'},
            {name:'10天',value:'10'},
        ],
        intervalTime: '',
        timesOptions: [
            {name:'全部',value:''},
            {name:'1次',value:'1'},
            {name:'2次',value:'2'},
            {name:'3次',value:'3'},
            {name:'4次',value:'4'},
            {name:'5次',value:'5'},
            {name:'6次',value:'6'},
            {name:'7次',value:'7'},
            {name:'8次',value:'8'},
            {name:'9次',value:'9'},
            {name:'10次',value:'10'},
        ],
        timesOptionsSet: [
            {name:'1次',value:'1'},
            {name:'2次',value:'2'},
            {name:'3次',value:'3'},
            {name:'4次',value:'4'},
            {name:'5次',value:'5'},
            {name:'6次',value:'6'},
            {name:'7次',value:'7'},
            {name:'8次',value:'8'},
            {name:'9次',value:'9'},
            {name:'10次',value:'10'},
        ],
        num: '',
        checkType: 'person,car,passport,driver',
        laheiOptions: [
          {name: '全部', value: ''},
          {name: '已拉黑', value: '1'},
          {name: '未拉黑', value: '0'},
        ],
        isBlack: '',
        dateTime: '',
        pageNum: 1,
        pageTotal: 1,
        paginationShow: true,
        dialogFormVisible: false,
        dialogDetail: false,
        loginName: '',
        form: {num: '1', intervalTime: '1'}
      }
    },
    methods: {
      getTableData(){
        let params = new URLSearchParams();
        params.append("loginName", this.loginName);
        params.append("num", this.num);
        params.append("intervalTime", this.intervalTime);
        params.append("isBlack", this.isBlack);
        if(this.dateTime == null || this.dateTime == ''){
          params.append("checkTimeStart", '');
          params.append("checkTimeEnd", '');
        }else{
          params.append("checkTimeStart", this.dateTime[0]);
          params.append("checkTimeEnd", this.dateTime[1]);
        }
        params.append("pageNum", this.pageNum);
        params.append("pageSize", 10);
        this.$post(`${this.url}/xhHlck/getXhBlackList`, params)
        .then(res => {
            if (res.code == 200) {
              var data = JSON.parse(res.data);
              var list = data.list;
              this.pageTotal = data.total;
              this.tableData = list;
            }
        })
      },
      daochu(){
        let params = {
          "checkType": this.checkType,
          "startTime": this.dateTime ? this.dateTime[0] : '',
          "endTime": this.dateTime ? this.dateTime[1] : '',
          "isBlack": this.isBlack
        };
        xh_lx.downLoad(`${this.url}/xhHlckTwo/exportXhBlackList`, params);
      },
      detail(d){
        let params = new URLSearchParams();
        params.append("checkId", d.checkId);
        params.append("checkType", d.checkType);
        this.$post(`${this.url}/xhHlckTwo/getXhBlackListByCheckIdType`, params)
        .then(res => {
            if (res.code == 200) {
              var data = JSON.parse(res.data).list;
              this.rowData = data;
              this.dialogDetail = true;
            }
        })
      },
      addXhBlackList(data){
        this.$confirm('是否确定拉黑'+data.cardName+'?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = new URLSearchParams();
              params.append('blackListId', data.blackListId);
              params.append('isBlack', 1);
							params.append('checkType', data.checkType);
							params.append('startTime', data.startTime || '');
							params.append('endTime', data.endTime || '');
							params.append('num', data.num);
							params.append('intervalTime', data.intervalTime);
							params.append('cardNo', data.cardNo);
							params.append('cardName', data.cardName);
							params.append('checkCount', data.checkCount);
							params.append('checkTime', data.checkTime);
							params.append('loginId', data.loginId);
							params.append('loginName', data.loginName);
					this.$post(`${this.url}/xhHlck/updateXhBlackList`,
						params
					).then((response) => {
						if(response.code == 200){
							this.$message({
								message: '拉黑成功',
								type: 'success'
              });
              this.getTableData()
						}
					})
				})
      },
      del(id){
        this.$confirm('是否确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
					let params = new URLSearchParams();
					params.append('blackListId', id);
					this.$post(`${this.url}/xhHlck/deleteXhBlackList`,
						params
					).then((response) => {
						if(response.code == 200){
							this.$message({
								message: '删除成功',
								type: 'success'
							});
							this.getTableData()
						}
					})
				})
      },
      handleCurrentChange(val){
        this.pageNum = val;
        this.getTableData();
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      search(){
        this.getTableData()
      },
      addSet(){
        let params = new URLSearchParams();
        params.append('num', this.form.num);
        params.append('intervalTime', this.form.intervalTime);
        this.$post(`${this.url}/xhHlck/addOrUpdateXhBlackListSet`,params)
        .then((response) => {
						if(response.code == 200){
              this.dialogFormVisible = false;
							this.$message({
								message: '设置成功',
								type: 'success'
							});
						}
					})
      },
      getXhBlackListSet(){
        let params = new URLSearchParams();
        this.$post(`${this.url}/xhHlck/getXhBlackListSet`,params)
        .then((response) => {
						if(response.code == 200){
              let d = JSON.parse(response.data).list;
              this.form = {
                num: d.num || '1',
                intervalTime: d.intervalTime || '1'
              }
						}
					})
      }
    },
    mounted(){
      this.getTableData();
      this.getXhBlackListSet();
    }
  }
</script>