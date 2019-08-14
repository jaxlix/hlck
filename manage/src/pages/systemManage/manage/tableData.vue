<template>
  <div class="tableData">
    <pepleAuth v-if="authEdit"></pepleAuth>

    <div class="listData">
      <div class="dataHeader">
        <div>
          <el-checkbox 
            v-model= "allChecked"
            :disabled = "isDisabled"
            @change="checkeOAll()"
          ></el-checkbox>
        </div>
        <div class="first">
         用户名
        </div>
        <div class="first">
         警号
        </div>
        <div class="first">
         部门
        </div>
        <div class="first">
         操作
        </div>
      </div>

      <div class="dataContent">
        <ul>
          <li v-for="item in tableData">
            <div class="data">
              <el-checkbox 
               v-model="item.checked"
               @change="checkeOne(item)"></el-checkbox>
            </div>
            <div class="data">
             {{item.name}}
            </div>
            <div class="data">
              {{item.userNum}}
            </div>
            <div class="data">
              {{item.deptName}}
            </div>
            <div class="data"
              @click="handleEdit(
                item.userId,
                item.name,
                item.orgId, 
                item.deptName 
              )">
             授权
            </div>

          </li>
        </ul>
      </div>
    </div>

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
  .dataHeader{
    margin-top: 20px;
    padding-bottom: 20px;
    display: flex;
    >div{
      flex: 1;
      text-align: center
    }
  }
  .dataContent{
    ul{
      >li{
        display: flex;
        border-top: 1px solid #eee;
        >div{
          flex: 1;
          text-align: center;
          height: 60px;
          line-height: 60px;
        }
      }
      li:hover{
        background: #fbfbfb;
      };
    }
  }
</style>
<script>
  import {mapGetters} from 'vuex';
  import pepleAuth from "./pepleAuth";

  export default {
    data() {
      return {
        checked: true,
        tableData: [],
        allChecked:false,
        paginationShow: true,
        pageTotal: 1,
        pageNum: 1,
        noData: true,
        pageType : 1, // 1代表前一步是点击了
        flag: true,  //为了解决多个checkbox的id 传递的问题，只能让它传第一个
        checkedPeople: [],
        isDisabled: false
      }
    },
    computed: {
      ...mapGetters({
        orgId: 'orgId',
        authEdit: 'authEdit',
        searchPeople: 'searchPeople',
        allPeoplePartId: 'allPeoplePartId',
        checkboxOrNode: 'checkboxOrNode',
        refreshPage: 'refreshPage'
      })
    },
    watch:{
      orgId() {
        this.paginationShow = false;
        this.$nextTick(function () {
          this.paginationShow = true;
        })
        this.getPeopleList(this.orgId.orgId, 1);
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
      },
      refreshPage() {
        this.pageNum = 1;
      },

      allPeoplePartId() {
        this.getCurrentDeptAllPeople(this.allPeoplePartId, this.pageNum);
        //在树形结果中选中，查出此部门以及底部门所有的人员
        this.getAllPeople(this.allPeoplePartId);
      }
    },
    methods: {
      //单选
      checkeOne(val){

        var idIndex = this.checkedPeople.findIndex((value, index, arr) => {
          return value.userId == val.userId; 
        })
        
        if(idIndex == -1){
          this.checkedPeople.push(val);
        }else{
          this.checkedPeople.splice(idIndex, 1);
        }

        let checkedArr = [];

        //全选框的状态
        if(this.checkedPeople == 0){
          this.allChecked = false;
        }

       // this.checkedPeople = this.deteleObject(this.checkedPeople);
        
        this.$store.commit("CURRENTCHECKAUTH",{
          data : new Date().getTime(),
          currentCheckAuth : this.checkedPeople
        });

        for(var i = 0 , len = this.tableData.length; i < len ; i++){
          if(this.checkedPeople.includes(this.tableData[i])){
            this.allChecked = true;
          }else{
            this.allChecked = false;
            return;
          }
        }
      },
      //本页人员全选
      checkeOAll() {  
        if(this.allChecked == true){
          this.tableData.forEach((val)=>{
            val.checked = true;
            this.checkedPeople.push(val);
          })
        }else{
          
          this.tableData.forEach((val)=>{
            val.checked = false;
            var idIndex = this.checkedPeople.findIndex((value, index, arr) => {
              return value.userId == val.userId; 
            })
            this.checkedPeople.splice(idIndex, 1);
          })
        } 

        this.$store.commit("CURRENTCHECKAUTH",{
          data : new Date().getTime(),
          currentCheckAuth : this.checkedPeople
        });
      },

      getAllPeople(id) {
        let params = new URLSearchParams();
            params.append('orgId', id);
        this.$post(`${this.url}/xhHlckTwo/getUserByOrgidAndSubDeptUser`,
          params
        )
        .then((response) => {
          if(response.code == 200){  
            let data = JSON.parse(response.data).list;

            if(data.length == 0){
              this.checkedPeople = [];
              this.$store.commit("CURRENTCHECKAUTH",{
                data : new Date().getTime(),
                currentCheckAuth : this.checkedPeople
              });
            }

            data.forEach((val)=>{
              let obj = ({
                checked:true,
                userId: val.userId,
                name: val.name,
                orgId: val.orgId,
                userNum: val.userNum,
                deptName : val.eName
              })
              this.checkedPeople.push(obj);
            })


            this.$store.commit("CURRENTCHECKAUTH",{
              data : new Date().getTime(),
              currentCheckAuth : this.checkedPeople
            });
          }
        });
      },
      getCurrentDeptAllPeople(id, pageNum) { 
        let params = new URLSearchParams();
            params.append('orgId', id);
            params.append('pageNum', pageNum);
            params.append('pageSize', 10);
        this.$post(`${this.url}/xhHlckTwo/getUserByOrgidAndSubDeptUser`,
          params
        )
        .then((response) => {
          if(response.code == 200){   
            this.isDisabled = false;
            this.tableData = [];  
            let page = JSON.parse(response.data);  
            let data = JSON.parse(response.data).list;           
            this.pageTotal = page.total;
            if(data.length == 0){
              this.tableData = [];
              this.isDisabled = true;
              this.allChecked = false;
              return;
            }
            for(var i = 0 , len = data.length; i < len ; i++){
              this.tableData.push({
                checked:true,
                userId: data[i].userId,
                name: data[i].name,
                orgId: data[i].orgId,
                userNum: data[i].userNum,
                deptName : data[i].eName
              })
            }
            this.allChecked = true;
            this.flag = true;
          }else{
            this.$message.error('查询失败');
            
          }    
        })
      },
      getPeopleList(orgId, pageNum) {
        let params = new URLSearchParams();
            params.append('orgId', orgId);
            params.append('isEnable', 1);
            params.append('isActive', 1);
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
              this.isDisabled = true;
              this.allChecked = false;
              return;
            }

            this.isDisabled = false;

            for(var i = 0 , len = data.length; i < len ; i++){
              
              //如果已经包含了该数据，就让checkbox 默认选中，反之，取消选择
              let checked = JSON.stringify(this.checkedPeople)
                           .indexOf(data[i].userId) 
                            == -1 ? false : true;
              let newResult = {
                checked: checked,
                userId: data[i].userId,
                name: data[i].name,
                orgId: data[i].orgId,
                userNum: data[i].userNum,
                deptName : data[i].eName
              } 

              this.tableData.push(newResult); 
              
              //处理全选的勾选状态 
              this.tableData.forEach(val =>{
                let count = 0 ;
                if(val.checked == true){
                  count ++;
                  if(count == this.tableData.length){
                    this.allChecked = true;
                  }
                }else{
                  this.allChecked = false;
                }
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

        this.$store.commit("AUTHEUSER",[{
          userId : userId,
          name : name,
          orgId: orgId,
          deptName: deptName
        }]);
      },
      handleCurrentChange(val){
        this.pageNum = val;
        if(this.checkboxOrNode === 1){
          this.getCurrentDeptAllPeople(this.allPeoplePartId, val);
        }else{
          this.getPeopleList(this.orgId.orgId, val);
        }  
      }
    },
    components:{
      pepleAuth : pepleAuth
    }
  }
</script>