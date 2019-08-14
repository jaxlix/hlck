<template>
  <div class="manageContent">
    <div class="manageTop">
      <el-input v-model="input" placeholder="请输入人员名字" ></el-input>
      <el-button type="primary" icon="el-icon-search" @click="searchPeople">搜索</el-button>
      <el-button type="primary" style="margin-left:380px;" @click="authorize()">授权</el-button>
    </div>

    <div class="bottom">
      <tableData></tableData>
      <manageRole></manageRole>
       <!--  <paging></paging> -->
    </div>
  </div>
</template>
<style lang="less" scoped>
  .manageTop{
  	display: flex;
  	padding: 20px;
  }
  .bottom{
    text-align: left;
    margin-left: 20px;
    border-top: 1px solid #eee;
  }
  .pagination{
    margin:50px auto;
  }
</style>
<script>
import tableData from './tableData';
import manageRole from './manageRole/manageRole';
import {mapGetters} from 'vuex';
// import paging from '../../../components/paging/paging';
export default {
  data() {
    return {
      input: '',
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }],
      value: '所属部门',
      currentCheckArr:[]
    }
  },
  computed: {
    ...mapGetters({
      currentCheckAuth: 'currentCheckAuth'
    })
  },
  methods:{
    searchPeople() {
      if(!this.input){
        this.$message({
          message: '搜索内容不能为空',
          type: 'warning'
        });
        return;
      }

      let params = new URLSearchParams();
          params.append('name', this.input);

      this.$post(`${this.url}/xhHlckTwo/getSysUser`,
        params
      )
       .then((response) => {
        if(response.code == 200){
          let data = JSON.parse(response.data).list;
          this.$store.commit("SEARCHPEOPLE",{
            'searchPeople': data
          })
        }else{
          this.$message.error('新增失败');
        }    
      })
    },
    authorize() {
      this.currentCheckArr = [];
      this.$store.commit("AUTHEDIT",{
        authEdit: true
      });
   
      for(var i = 0 , len = this.currentCheckAuth.length ; i < len; i++){
        this.currentCheckArr.push({
          userId : this.currentCheckAuth[i].userId,
          name : this.currentCheckAuth[i].name,
          orgId : this.currentCheckAuth[i].orgId,
          deptName : this.currentCheckAuth[i].deptName
        })
      }
      
      this.$store.commit("AUTHEUSER",this.deteleObject(this.currentCheckArr));
    }
  },
  components:{
    tableData : tableData,
    manageRole: manageRole
    // paging : paging
  }
}
</script>