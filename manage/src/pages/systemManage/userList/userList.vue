<template>
  <div class="addUser">
    <div class="addUserMnage">
      <p>角色列表</p>
    </div>
    <div class="addUserBody">
      <div class="manageTop">
        <div class="manageTop-inline">
          <el-input v-model="roleName" placeholder="请输入角色名称"></el-input>
        </div>
        <el-button type="primary" icon="el-icon-search" @click="searchPeople">搜索</el-button>
        <div class="manageTop-right">
          <el-button type="primary" style="margin-left:20px;" @click="dialogTableVisible=true">新增角色</el-button>
          <el-button type="danger" @click="delMore" style="margin-left:20px;">删除</el-button>
        </div>
      </div>
      <el-table :data="tableData" @selection-change="handleSelectionChange" style="width: 100%">
        <el-table-column
            type="selection"
            width="55">
        </el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="管理员">
          <template slot-scope="scope">
            <span>{{scope.row.isAdmin == 1 ? "是" : "否"}}</span>
          </template>
        </el-table-column>
        <el-table-column label="权限" prop="roleStatus" :formatter="quanxian"></el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="del(scope.row.roleId)">删除</el-button>
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
    <el-dialog title="新增角色" :visible.sync="dialogTableVisible" :modal-append-to-body="false">
      <addUserContent></addUserContent>
    </el-dialog>
    <el-dialog title="修改角色" :visible.sync="dialogTableVisibleXg" :modal-append-to-body="false">
      <userEdit :rowData="rowData"></userEdit>
    </el-dialog>
  </div>
</template>
<style lang="less" scoped>
.addUser {
  position: relative;
  z-index: 2;
  padding-top: 60px;
  .addUserMnage {
    background: white;
    margin: 0 auto;
    height: 50px;
    position: fixed;
    width: 100%;
    top: 60px;
    z-index: 4;
    left: 0;
    box-shadow: 0 2px 5px #eee;
    em {
      color: #9a9a9a;
    }
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
    span {
      display: inline-block;
      cursor: pointer;
    }
  }
  .addUserBody{
      margin: 20px;
      padding: 20px;
      background-color: #fff;
      border-radius: 6px;
    }
    .manageTop{
        display: flex;
        padding: 20px 0;
        border-bottom: 1px solid #d8d8d8;
        .manageTop-inline{
          width: 220px;
        }
        .manageTop-right{
          position: absolute;
          right: 40px;
        }
    }
}
</style>
<script type="text/javascript">
import addUserContent from './addUserContent';
import userEdit from './userEdit';

export default {
  name: "addUser",
  data() {
    return {
      dialogTableVisible: false,
      dialogTableVisibleXg: false,
      rowData: {},
      roleName: '',
      tableData: [],
      pageTotal: 1,
      pageNum: 1,
      noData: true,
      multipleSelection: [],
      paginationShow: true
    };
  },
  methods: {
    getXhRole() {
      let params = new URLSearchParams();
          params.append('roleName', this.roleName);
          params.append('pageNum', this.pageNum);
          params.append('pageSize', 10);
      this.$post(`${this.url}/xhHlck/getXhRole`,
        params
      ).then((response) => {
        if(response.code == 200){
          let page = JSON.parse(response.data);
          let data = JSON.parse(response.data).list;
          this.pageTotal = page.total;
          if(data.length == 0){
            this.tableData = [];
            this.noData = true;
            return;
          }
          this.tableData = data;
          this.noData = false;
        }else{
          this.$message.error('获取数据失败');
        }
      })
    },
    handleCurrentChange(val){
      this.pageNum = val;
      this.getXhRole();
    },
    searchPeople(){
      this.getXhRole()
    },
    handleSelectionChange(val){
      this.multipleSelection = val;
    },
    delMore(){
      let ids = '';
      this.multipleSelection.forEach((d,i)=>{
        ids += d.roleId+','
      });
      this.del(ids)
    },
    del(roleId){
      this.$confirm('确定删除角色?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = new URLSearchParams();
          params.append('roleId', roleId);
          this.$post(`${this.url}/xhHlck/deleteXhRole`,
            params
          ).then((response) => {
            if(response.code == 200){
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getXhRole()
            }else{
              this.$message.error('删除失败');
            }
          })
        })
    },
    handleEdit(d){
      this.rowData = d;
      this.dialogTableVisibleXg = true;
    },
    jueseDel(){

    },
    initBus(){
      this.bus.$on('setDialogTableVisible', () => {
          this.dialogTableVisible = false
      });
      this.bus.$on('dialogTableVisibleXg', () => {
          this.dialogTableVisibleXg = false
      });
      this.bus.$on('getXhRole', () => {
          this.getXhRole()
      });
    },
    quanxian(row){
      let d = JSON.parse(row.roleStatus);
      let t = '';
      let o = {
        peopleCheck: '人员盘查',
        idCardCheck: '身份证查询',
        passportCheck: '护照查询',
        drivingCheck: '驾照查询',
        NFCCheck: 'NFC查询',
        carCheck: '车辆查询',
        record: '核查记录',
        statistics: '核查统计',
        comparison: '人像比对'
      }
      if(d.peopleCheck){
        t += '人员盘查('+d.peopleCheck.join(',')+');';
      }
      if(d.carCheck){
        t+='车辆查询;'
      }
      if(d.record){
        t+='核查记录;'
      }
      if(d.statistics){
        t+='核查统计;'
      }
      if(d.comparison){
        t+='人像比对;'
      }
      return t
    },
  },
  components: {
    addUserContent: addUserContent,
    userEdit: userEdit
  },
  mounted(){
    this.initBus();
    this.getXhRole();
  }
};
</script>
