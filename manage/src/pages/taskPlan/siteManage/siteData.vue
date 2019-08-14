<template>
  <div class="siteData">
    <div class="search">
      <el-input placeholder="站点名称" v-model="areaName" class="input-with-select">
        <el-button type="primary" @click="search" slot="append">搜索</el-button>
      </el-input>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        label="检查站名称"
        width="280">
        <template slot-scope="scope">
          <span>{{ scope.row.areaName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="盘查地点"
        width="280">
        <template slot-scope="scope">
          <span>{{ scope.row.locationName}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="盘查范围"
        width="140">
        <template slot-scope="scope">
          <span>{{ scope.row.radius/1000 }} km</span>
        </template>
      </el-table-column>
       <el-table-column
        label="创建时间"
        width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      class="pagination"
      v-if="paginationShow" 
      @current-change="handleCurrentChange"
      >
    </el-pagination>
  </div>
</template>
<style scoped lang="less">
  .siteData{
    padding: 20px;
    .search{
      width: 300px;
    }
    .pagination{
      margin:30px;
    }
    .siteContent{
      padding: 20px;
      font-size: 14px;
      display: flex;
      text-align: left;
      .siteInput{
        width: 300px;
      }   
    }
  }
</style>
<script>
  export default {
    data() {
      return {
        tableData: [],
        total : 1,
        paginationShow : true,
        areaName: ''
      }
    },
    props: ['siteData'],
    computed: {
      getUpdate() {
        return this.siteData
      }
    },
    watch:{
      getUpdate() {
        this.loadSideData(0);
      }
    },
    created() {
      this.loadSideData(0);
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        this.$confirm('确定删除检查站'+row.areaName+'?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = new URLSearchParams();
          params.append('areaId', row.areaId);
          this.$post(`${this.url}/xhHlck/deleteXhArea`,
            params
          ).then((response) => {
            if(response.code == 200){
              this.$message({
                message: '删除成功',
                type: 'success'
              });
              
              this.loadSideData(0);

            }else{
              this.$message.error('删除失败');
            }    
          })
        });
      },
      loadSideData(pageNum) {
        let params = new URLSearchParams();
            params.append('areaName', this.areaName);
            params.append('pageNum', pageNum);
            params.append('pageSize', 10);

        this.$post(`${this.url}/xhHlck/getXhArea`,
          params
        )
        .then((response) => {
          if(response.code == 200){
            this.total = JSON.parse(response.data).total;
            this.tableData = JSON.parse(response.data).list;
          }else{
            this.$message.error('新增失败');
          }    
        })
      },
      handleCurrentChange(val){
        this.loadSideData(val)
      },
      search() {
        this.loadSideData(0);
      }
    }
  }
</script>
