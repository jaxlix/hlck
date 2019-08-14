<template>
  <div class="taskPlanM">
  	<div class="teskContent">
  	  <div class="tesk_">
  	  	<el-input v-model="taskName" placeholder="请输入任务名称" class="inputPlan"></el-input>
        <el-button type="primary" @click="searchName" icon="el-icon-search">搜索</el-button>
        <div class="tesk_right">
          <el-button type="primary" @click="dialogTableVisible=true">任务下发</el-button>
          <el-button @click="daochu" type="primary">导出excel</el-button>
        </div>
  	  </div>
      <div class="taskPlanContent">
        <div class="complete">
            <el-form ref="form" :inline="true" label-width="80px">
              <el-form-item label="任务状态">
                <el-select v-model="finishStatus" @change="selectFinishStatus">
                  <el-option label="全部" value=""></el-option>
                  <el-option label="未完成" value="0"></el-option>
                  <el-option label="已完成" value="1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="任务类型">
                <el-select v-model="taskType" @change="selectTaskType">
                  <el-option label="无" value="0"></el-option>
                  <el-option label="日常任务" value="1"></el-option>
                  <el-option label="大型安保" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
        </div>
        <taskPlanList></taskPlanList> 
      </div>
  	</div>
    <el-dialog title="任务下发" :visible.sync="dialogTableVisible" :modal-append-to-body=false width="60%">
      <lowerTesk></lowerTesk>
    </el-dialog>
  </div>
</template>
<style lang="less" scoped>
  .taskPlanM{
    margin: 20px;
    .teskContent{
      background: white;
      padding: 20px;
      box-shadow: 0 0 10px #ccc;
      border-radius: 6px;
      .tesk_{
      	display: flex;
      	position: relative;
      	padding-bottom: 15px;
      	.inputPlan{
      	  width: 300px;
        }
        .tesk_right{
          position: absolute;
          right: 20px;
        }
      }
    }
  }
  .taskPlanContent{
  	border-top: 1px solid #d6d6d6;
  	.complete{
  	  font-size: 14px;
  	  text-align: left;
  	  margin-top: 10px;
  	  border-bottom: 1px solid #eee;
  	  em{
  	  	display: inline-block;
  	  	margin-left: 10px;
        cursor: pointer;
  	  }
  	}
  	.pagination{
  	  margin-top: 50px;
  	}
    .active{
      color: #409EFF
    }
  }
   
</style>
<script>
import lowerTesk from './lowerTesk/lowerTesk';
import taskPlanList from './taskPlanList/taskPlanList';
import {mapGetters} from 'vuex';
import '../../common/tools';

export default {
  data () {
    return {
      taskType: '0',
      taskName: '',
      dialogTableVisible: false,
      finishStatus: ''
    }
  },
  components:{
    lowerTesk: lowerTesk,
    taskPlanList: taskPlanList
  },
  computed: {
	  ...mapGetters({
      taskStatusCode: 'taskStatusCode'
    })
  },
  watch: {
    taskStatusCode(v){
      this.dialogTableVisible = false;
    }
  },
  methods: {
    selectFinishStatus(index) {
      this.$store.commit("FINISHSTATUS",{
        finishStatus: index
      });
    },
    selectTaskType(index){
      this.$store.commit("TASKTYPERW",{
        taskTypeRw: index
      });
    },
    daochu() {
      let params = {
        "taskType": this.taskType,
        "taskName": this.taskName,
        "finishStatus": this.finishStatus
      };
      xh_lx.downLoad(`${this.url}/xhHlckTwo/exportXhTask`, params);
    },
    searchName(){
      this.$store.commit("TASKNAME",{
        taskName: this.taskName
      });
    }
  }
}
</script>