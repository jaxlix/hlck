<template>
  <div class="taskPlanList">
	  <el-table
	    :data="tableData3"
      tooltip-effect="dark"
	    style="width: 100%"
	    @selection-change="handleSelectionChange">
	    <el-table-column
	      label="任务名称"
	      width="120">
	      <template slot-scope="scope">{{ scope.row.name }}</template>
	    </el-table-column>
	    <el-table-column
	      prop="status"
	      label="任务状态"
	      width="120">
	    </el-table-column>
	    <el-table-column
	      prop="address"
	      label="盘查地点"
	      show-overflow-tooltip>
	    </el-table-column>
	    <el-table-column
	      prop="lowerTime"
	      label="下发时间"
	      width="160">
	    </el-table-column>
	    <el-table-column
	      prop="makePeople"
	      label="制定人"
	      width="120">
	    </el-table-column>
	     <el-table-column label="操作">
	      <template slot-scope="scope">
	        <el-button
	          size="mini"
	          type="danger"
	          @click="handleDelete(scope.row.id,scope.row.batchNum)">取消</el-button>
	      </template>
      </el-table-column>
	  </el-table>
	  <el-pagination
	  background
	  layout="prev, pager, next"
	  :total="total"
	  class="pagination"
	   @current-change="handleCurrentChange"
	  >
	</el-pagination>
</div>
</template>
<style lang="less" scoped>
  .pagination{
  	margin-top: 20px;
  }
  .noData{
  	margin-top: 20px;
  	font-size: 16px
  }
</style>
<script>
  import {mapGetters} from 'vuex';

  export default {
    data() {
      return {
        tableData3: [],
        multipleSelection: [],
        total:0,
        num: 0,
        noData: true
      }
    },
    created() {
   	  this.getXhTask(0);
    },
    computed: {
	  ...mapGetters({
			taskName: 'taskName',
			finishStatus: 'finishStatus',
			taskTypeRw: 'taskTypeRw',
			taskStatusCode: 'taskStatusCode'
	  })
	},
	watch:{
      taskName(val) {
      	this.getXhTask(0, this.finishStatus, this.taskTypeRw, val);
			},
			finishStatus(val){
				this.getXhTask(0, val, this.taskTypeRw, this.taskName);
			},
			taskTypeRw(val){
				this.getXhTask(0, this.finishStatus, val, this.taskName);
			},
			taskStatusCode(){
				this.getXhTask(0, this.finishStatus, this.taskTypeRw, this.taskName);
			}
	},
    methods: {
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
      getXhTask(num, finishStatus,taskTypeRw, taskName) {
      	if(finishStatus == undefined){
      		finishStatus = ''
				}
				if(taskTypeRw == undefined){
      		taskTypeRw = ''
				}
				if(taskName == undefined){
					taskName = ''
				}
      	let params = new URLSearchParams();
            params.append('pageNum', num);
            params.append('pageSize', 10);
            params.append('taskName', taskName);
            params.append('finishStatus', finishStatus);
            params.append('taskType', taskTypeRw);
        this.$post(`${this.url}/xhHlck/getXhTask`,
   		    params
        )
        .then((response) => {
          if(response.code == 200){
          	this.tableData3 = [];
          	let task = JSON.parse(response.data).list;

          	if(task.length == 0){
          	  this.noData = true;
          	}else{
          	  this.noData = false;
          	}         

          	for(var i = 0 , len = task.length; i < len ; i++){
              let status = task[i].finishStatus === 0 ? "未完成" : "已完成";
              this.tableData3.push({
               	id : task[i].taskId,
                name: task[i].taskName,
  	            status: status,
  	            address: task[i].areaName,
  	            time:  task[i].startTime,
  	            makePeople: task[i].fromUserName,
  	            lowerTime: task[i].startTime,
  	            batchNum : task[i].batchNum
              })
          	}

          	this.total = JSON.parse(response.data).total;
                         
          }else{
            this.$message.error('获取任务列表失败');
          }    
        })
      },
      handleCurrentChange(val) {
        this.getXhTask(val, 0);
        this.num = val;
      },
      handleDelete(id,batchNum){
				this.$confirm('是否确定取消该任务?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
					let params = new URLSearchParams();
							params.append('taskId', id);
							params.append('batchNum', batchNum);
					this.$post(`${this.url}/xhHlck/deleteXhTask`,
						params
					).then((response) => {
						if(response.code == 200){
							this.$message({
								message: '删除成功',
								type: 'success'
							});

							this.getXhTask(this.num, this.getXhTaskData)
						}
					})
				})
      }
    }
  }
</script>