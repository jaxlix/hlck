<template>
  <div class="analysis-body">
    <div class="manageTop">
      <div style="width:220px;">
        <el-input v-model="userName" placeholder="用户名称"></el-input>
      </div>
      <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
      <el-button type="primary" style="position:absolute;right:0;" @click="daochu">导出excel</el-button>
    </div>
    <div class="select">
      <el-select v-model="checkType" @change="search" placeholder="核查类型">
        <el-option
          v-for="item in checkTypeOptions"
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
        <el-table-column prop="loginId" label="登录账号"></el-table-column>
        <el-table-column prop="userName" label="用户名称"></el-table-column>
        <el-table-column prop="deptName" label="部门名称"></el-table-column>
        <el-table-column prop="beCheckIdCard" label="被查人员身份证号"></el-table-column>
        <el-table-column prop="beCheckName" label="被查人员姓名"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
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
  position: relative;
  display: flex;
  padding-top: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #f0f0f0;
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
import '../../../common/tools';

export default {
  data() {
    return {
      tableData: [],
      paginationShow: true,
      pageTotal: 1,
      pageNum: 1,
      noData: true,
      userName: "",
      dateTime: [],
      checkType: '',
      checkTypeOptions: [
        {name:'全部',value:''},
        {name:'查人',value:'person'},
        {name:'查车',value:'car'},
        {name:'查护照',value:'passport'},
        {name:'驾照',value:'driver'},
        {name:'物品',value:'goods'}
    ]
    }
  },
  methods: {
    getXhLog() {
        let params = new URLSearchParams();
        params.append("checkType", this.checkType);
        params.append("startTime", this.dateTime[0]||'');
        params.append("endTime", this.dateTime[1]||'');
        params.append("userName", this.userName);
        params.append("pageNum", this.pageNum);
        params.append("pageSize", 10);
        this.$post(`${this.url}/xhHlck/getXhLog`, params)
        .then(response => {
            if (response.code == 200) {
                this.tableData = [];
                let data = JSON.parse(response.data);
                let list = data.list;
                this.pageTotal = data.total;
                if (list.length == 0) {
                    this.tableData = [];
                    this.noData = true;
                    return;
                }
                this.noData = false;
                this.tableData = list;
            } else {
                this.$message.error("获取列表失败");
            }
        }
      );
    },
    search() {
      this.getXhLog()
    },
    daochu(){
        let params = {
            "checkType": this.checkType,
            "startTime": this.dateTime[0]||'',
            "endTime": this.dateTime[1]||'',
            "userName": this.userName
        };
        xh_lx.downLoad(`${this.url}/xhHlckTwo/exportXhLog`, params);
    },
    handleCurrentChange(val){
      this.pageNum = val;
      this.getXhLog();
    }
  },
  mounted() {
    this.getXhLog();
  }
};
</script>
