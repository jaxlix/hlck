<template>
   <div class="roleMask" v-if="manageRole">
    <div class="roleMaskContent">
      <p>管理角色</p>
      <div class="close" @click="close">×</div>
      <el-table
	    :data="tableData"
	    style="width: 100%">
	    <el-table-column
	      label="角色名"
	     >
	      <template slot-scope="scope">
	        <span>{{ scope.row.roleName }}</span>
	      </template>
	    </el-table-column>
	   
	    <el-table-column label="操作" width="180">
	      <template slot-scope="scope">
	        <el-button
	          size="mini"
	          @click="handleEdit( scope.row.roleId)">删除
	        </el-button>	 
	      </template>
	    </el-table-column>
	  </el-table>
      
	  <paging class="managePage"></paging>
    </div>
  </div>
</template>
<style scoped lang="less">
  .roleMask{
  	position: fixed;
  	width: 100%;
  	height: 100%;
  	left: 0;
  	top: 0;
  	background: rgba(0,0,0,0.4);
  	z-index: 6;
  	.roleMaskContent{
  	  position: relative;
  	  width: 600px;
  	  background: white;
  	  margin:140px auto;
  	  border-radius: 5px;
  	  box-shadow: 0 0 4px #ccc;
  	  overflow: hidden;
  	  >p{
  	  	background: #409EFF;
  	  	color: white;
  	  	height: 40px;
  	  	line-height: 40px;
  	  	text-align: center;
  	  }
  	  .close{
  	    position: absolute;
  	  	right: 10px;
  	  	top: 10px;
  	    font-size: 26px;
  	    cursor: pointer;
  	    color: white;
  	  }
  	  .managePage{
  	  	text-align: center;
  	  	margin:20px;
  	  }
  	}
  }
</style>
<script>
  import paging from '../../../../components/paging/paging';

  import {mapGetters} from 'vuex';
  export default {
  	data() {
      return {
        tableData: [],
        curNum: 1,
      }
    },
    computed: {
  	  ...mapGetters({
  	    manageRole: 'manageRole',
  	    pageNum: 'pageNum'
  	  })
  	},
  	watch:{
      manageRole() {
        this.getRoleList(1);
      },
      pageNum(val) {
      	if(val){
      	  this.curNum = this.pageNum; 
	        this.getRoleList(this.curNum) 	
      	} 
	    }
  	},
    methods:{
      close() {
        this.$store.commit("MANAGEROLE",{
	        manageRole: false
	      });
      },
      getRoleList(num) {
      	let params = new URLSearchParams();
      	    params.append('pageNum', this.curNum);
            params.append('pageSize', 10);
      	this.$post(`${this.url}/xhHlck/getXhRole`,
      	 params)
        .then((response) => {
          if(response.code == 200){
            let data = JSON.parse(response.data).list;
            this.tableData = data;

            this.$store.commit("PAGE",{
              'pageTotal': JSON.parse(response.data).total
            })
          }else{
          	this.$message.error('获取失败');
          }    
        })
      },
      handleEdit(id) {
      	let params = new URLSearchParams();
            params.append('roleId', id);
           
      	this.$post(`${this.url}/xhHlck/deleteXhRole`,
      		params)
        .then((response) => {
          if(response.code == 200){
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.$store.commit("MANAGEROLE",{
    		      manageRole: false
    		    });
          }else{
          	this.$message.error('删除失败');
          }    
        })
      }
    },
    components:{
      paging : paging
    }
  }
</script>