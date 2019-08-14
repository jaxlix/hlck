<template>
  <div class="mask">
    <div class="auth">
      <div class="close" @click="close">×</div>
      <h4>人员授权</h4>
      <div class="selected">
        <p>所选人员</p>
        <div class="selectedDiv">
          <span v-for="item in authUser">{{item.name}}</span>
        </div>
      </div>
      <div class="autoRole">
        <p>授权角色</p>
		    <ul class="authList">
          <li v-for="(item, index) in authList" 
            @click="addActive(index, item.roleId, item.isAdmin)" 
            :class="{'active': index == curId}" 
            :roleId="item.roleId"
            ref="curId"
          >
          	{{item.roleName}}
          </li>
		    </ul>
      </div>
      <div class="authSureDiv">
      	<el-button type="primary" class="authSure" @click="authSure">确定</el-button>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
  .mask{
  	position: fixed;
  	width: 100%;
  	height: 100%;
  	left: 0;
  	top: 0;
  	background: rgba(0,0,0,0.4);
  	z-index: 6;
  	.auth{
  	  position: relative;
  	  width: 600px;
  	  background: white;
  	  margin:140px auto;
  	  border-radius: 5px;
  	  box-shadow: 0 0 4px #ccc;
  	  padding: 10px 30px;
  	  .close{
  	    position: absolute;
  	  	right: 10px;
  	    font-size: 26px;
  	    cursor: pointer;
  	  }
  	  >h4{
  	  	font-size: 14px;
  	  	color: #4688F4
  	  }

  	  .selected{
  	  	margin-top: 10px;
  	  	>p{
  	  	  font-size: 12px;
  	  	  color: #9c9c9c;
  	  	}
  	  	.selectedDiv{
  	  	  background: #D8D8D8;
  	  	  height: 150px;
  	  	  margin-top: 10px;
  	  	  border-radius: 2px;
          overflow: auto;
  	  	  span{
  	  	  	display: inline-block;
  	  	  	margin: 10px;
  	  	  	font-size: 14px;
  	  	  }
  	  	}
  	  }
  	  .autoRole{
  	  	font-size: 12px;
  	  	margin-top: 20px;
	  	>p{
	      color: #9c9c9c;
	      margin-bottom: 5px;
	  	}
	  	.authList{
	  	  li{
    			display: inline-block;
    			height: 24px;
    			text-align: center;
    			line-height: 24px;
    			border-radius: 2px;
    			border:1px solid #eee;
    			margin-right: 10px;
    			cursor: pointer;
    			padding: 0 10px;
    			margin-bottom: 10px;
	  	  }
	  	  .active{
  		    color: white;
  		    background: #409EFF;
  		  }
	  	}
	  }
	  .authSureDiv{
	  	margin-top: 30px;
	  	text-align: right;
	  }
  }
}
.selectedDiv::-webkit-scrollbar {
  width: 4px;    
  /*height: 4px;*/
}
.selectedDiv::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  background: rgba(0,0,0,0.2);
}
.selectedDiv::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  border-radius: 0;
  background: rgba(0,0,0,0.1);
}
</style>
<script>
  import {mapGetters} from 'vuex';

  export default {
    data() {
      return {
        options: [{
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '',
        authList: [],
        active: "",
        roleId:'',
        isAdmin: 0,
        curId: -1,
        newAuthUser: []
      }
    },
    computed: {
  	  ...mapGetters({
  	    authUser: 'authUser',
        checkboxOrNode : 'checkboxOrNode'
  	  })
  	},
    watch:{
      //分段加载大量数据，为了处理重绘时候，导致页面卡死
      authUser() {

        for(var i = 0 , len = 20 ; i < len; i++){
          this.newAuthUser.push(this.authUser[i])
        }
      }
    },
	  created() {
	    this.getRoleList();
	  },
    methods:{
      close() {
        this.$store.commit("AUTHEDIT",{
          authEdit: false
        });
      },
      getRoleList() {
 	 	    this.$post(`${this.url}/xhHlck/getXhRole`)
        .then((response) => {
          if(response.code == 200){
            let data = JSON.parse(response.data).list;
            this.authList = data; 
            
            if(this.authUser.length > 1){
              //处理多人原本角色不一致的问题
              for(var i = 0 , len = this.authList.length; i < len ; i++){
                try{
                  this.$refs.curId[i].className = '';
                }catch(err){}
              } 
              return;
            };
            
            this.getUserIdAuth();    
          }else{
            this.$message.error('新增失败');
          }    
        })
      },
      getUserIdAuth() {
        let params = new URLSearchParams();
        try{
          params.append('userId', this.authUser[0].userId);
        }catch(err){
          return;
        }
            
        this.$post(`${this.url}/xhHlck/getXhPower`,
          params
        )
        .then((response) => {
          if(response.code == 200){
            try{
              let roleId = JSON.parse(response.data).list[0].roleId;

              for(var i = 0 , len = this.authList.length; i < len ; i++){
                if(this.authList[i].roleId == roleId){
                  this.$refs.curId[i].className = 'active';
                }
              }               
            }catch(err){}
                      
          }else{
            this.$message.error('获取人员权限失败');
          }    
        })
      },
      addActive(index, roleId, isAdmin) {
        if(this.$refs.curId[index].className == 'active'){
          this.$refs.curId[index].className = '';
          this.curId = -1;
        }else{
          for(var i = 0, len = this.$refs.curId.length; i < len ; i++){
            this.$refs.curId[i].className = '';
          }
          this.$refs.curId[index].className = 'active';
          this.curId = index;
        }
        
        this.roleId = roleId; 
        this.isAdmin = isAdmin;
      },
      authSure() {
        let authUserIdArr = [],
            authUserNameArr = [],
            authUserOrgId = [],
            authUserDeptName = [];

        for(var i = 0 , len = this.authUser.length; i < len; i++){
          authUserIdArr.push(this.authUser[i].userId);
          authUserNameArr.push(this.authUser[i].name);
          authUserOrgId.push(this.authUser[i].orgId);
          authUserDeptName.push(this.authUser[i].deptName);
        }

        try{
           var roleId = this.$refs.curId[this.curId].getAttribute('roleId');
        }catch(err){}
       
      	let params = new URLSearchParams();
            params.append('roleId', roleId);
            params.append('userId', authUserIdArr.join(","));
            params.append('userName', authUserNameArr.join(","));
            params.append('deptId', authUserOrgId.join(","));
            params.append('deptName', authUserDeptName.join(","));
            params.append('isAdmin', this.isAdmin);
      	this.$post(`${this.url}/xhHlck/addXhPower`,
          params
        )
        .then((response) => {
          if(response.code == 200){
            this.$message({
              message: '授权成功',
              type: 'success'
            });

            this.$store.commit("AUTHEDIT",{
  	          authEdit: false
  	        });               
          }else{
            this.$message.error('授权失败');
          }    
        })
      }
    }
  }
</script>