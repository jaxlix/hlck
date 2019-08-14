<template>
  <div class="tableData">
    <!-- <pepleAuth v-if="authEdit"></pepleAuth> -->
      
    <el-table
        :data="tableData"
        style="width: 100%">

        <el-table-column
            type="selection"
            width="55">
        </el-table-column>

        <el-table-column
            label="姓名"
        >
            <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
            </template>
        </el-table-column>

        <el-table-column
            label="被查次数"
        >
            <template slot-scope="scope">
            <el-popover placement="top">
                <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.userNum }}</el-tag>
                </div>
            </el-popover>
            </template>
        </el-table-column>


        <el-table-column
            label="平均时间间隔"
        >
            <template slot-scope="scope">
            <el-popover placement="top">
                <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.deptName }}</el-tag>
                </div>
            </el-popover>
            </template>
        </el-table-column>

        <el-table-column
            label="登记人"
        >
            <template slot-scope="scope">
            <el-popover placement="top">
                <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.deptName }}</el-tag>
                </div>
            </el-popover>
            </template>
        </el-table-column>
     
        <el-table-column label="操作" width="180">
            <template slot-scope="scope">
            <el-button
                size="mini"
                @click="handleEdit( scope.row.userId, scope.row.name,scope.row.orgId, scope.row.deptName )">授权
            </el-button>   
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
    >
    </el-pagination>
    </div>
</template>
<style lang="less" scoped>
  .pagination{
    margin: 30px auto;
  }
  .noData{
    text-align: center;
    font-size: 16px;
    margin-top:50px;
    color: #737373;
  }
</style>
<script>
  import {mapGetters} from 'vuex';
//   import pepleAuth from "./pepleAuth";

  export default {
    data() {
      return {
        tableData: [],
        paginationShow: true,
        pageTotal: 1,
        pageNum: 1,
        noData: true
      }
    },
    computed: {
      ...mapGetters({
        orgId: 'orgId',
        authEdit: 'authEdit',
        searchPeople: 'searchPeople'
      })
    },
    watch:{
      orgId() {
        this.getPeopleList(this.orgId.orgId, this.pageNum);
      },
      searchPeople() {
        this.tableData = [];
        this.pageTotal = this.searchPeople.length;
        for(var i = 0 , len = this.searchPeople.length; i < len ; i++){
          this.tableData.push({
            userId: this.searchPeople[i].userId,
            name: this.searchPeople[i].name,
            orgId: this.searchPeople[i].orgId,
            userNum: this.searchPeople[i].userNum,
            deptName : this.searchPeople[i].eName
          })
        }
      }
    },
    methods: {
      getPeopleList(orgId, pageNum) {
        let params = new URLSearchParams();
            params.append('orgId', orgId);
            params.append('isEnable', 1);
            params.append('isDeleted', 0);
            params.append('secretLevel', 0);
            params.append('pageNum', pageNum);
            params.append('pageSize', 10);
        this.$post(`${this.url}/xhHlckTwo/getSysUser`,
          params
        )
        .then((response) => {
          if(response.code == 200){

            this.tableData = [];
            let page = JSON.parse(response.data);
            let data = JSON.parse(response.data).list;
            
            this.pageTotal = page.total;

            if(data.length == 0){
              this.tableData = [];
              this.noData = true;
              return;
            }
            this.noData = false;

            for(var i = 0 , len = data.length; i < len ; i++){
              this.tableData.push({
                userId: data[i].userId,
                name: data[i].name,
                orgId: data[i].orgId,
                userNum: data[i].userNum,
                deptName : data[i].eName
              })
            }
     
          }else{
            this.$message.error('新增失败');
          }    
        })      
      },
      handleEdit(userId, name,orgId, deptName ) {
        this.$store.commit("AUTHEDIT",{
          authEdit: true
        });

        this.$store.commit("AUTHEUSER",{
          userId : userId,
          name : name,
          orgId: orgId,
          deptName: deptName
        });
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      handleCurrentChange(val){
        this.pageNum = val;
        this.getPeopleList(this.orgId.orgId, val);
      }
    },
    components:{
    //   pepleAuth : pepleAuth
    }
  }
</script>