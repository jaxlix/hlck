<template>
  <div class="banner">
		<h1 class="manageName">核录查控系统</h1>
		<div class="admin">
			<!-- <span>消息（0）</span> -->
			<img src="../../assets/logo.png">
			<span>{{userName}}</span>
      <!-- <i class="el-icon-arrow-down"></i>
      <div class="header_div">
        <div class="adjust" @click="centerDialogVisible = true">修改密码</div>
        <div class="logout" @click="logout">退出登录</div>
      </div> -->

      <el-popover
      width="100"
      trigger="click">
      <div class="header_div" style="text-align:center;line-height:32px;font-size:14px;color:#4a4a4a;cursor:pointer">
        <div class="adjust" @click="centerDialogVisible = true">修改密码</div>
        <div class="logout" @click="logout">退出登录</div>
      </div>
      <i class="el-icon-arrow-down" slot="reference"></i>
    </el-popover>

			
		</div>
  
    <el-dialog
      title="修改密码"
      :visible.sync="centerDialogVisible"
      width="30%"
      :modal-append-to-body="false"
      center>
      <h1 style="font-size:20px;text-align:center;margin-top:20px;">修改密码</h1>
      <el-input v-model="password" placeholder="新密码" style="margin:40px 0 20px 0"></el-input>
      <el-input v-model="repassword" placeholder="确认新密码"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sure()">确 定</el-button>
      </span>
    </el-dialog>
 </div>
</template>
<style lang="less" scoped>
  .banner{
		position: relative;
  	width:100%;
  	.manageName{
  	  font-size: 22px;
  	  position: absolute;
  	  z-index: 21;
  	  color: white;
  	  width: 200px;
  	  line-height: 60px
  	}
  	.el-menu-demo{
  	  padding-left: 240px
  	}
  	.admin{
  	  position: absolute;
  	  right: 50px;
  	  top: 16px;
  	  img{
  	  	width: 36px;
  	  	height: 36px;
  	  	border-radius: 100%;
  	  	margin-right: 5px;
  	  }
      .el-icon-arrow-down{
        color: white;
        margin-left: 4px;
        cursor: pointer;
      }
  	  .logout{
  	  	cursor: pointer;
  	  }
  	  span{
  	  	color: white;
  	  }
      .header_div{
        position: absolute;
        right: 0px;
        background: rgb(37, 37, 37);
        color: white;
        top: 50px;
        border-radius: 3px;
        z-index: 22;
        >div{
          width: 120px;
          height: 34px;
          text-align: center;
          line-height: 34px;
          font-size: 13px;
          color: #ccc;
          cursor: pointer;
        }
      }
  	}
  }
  
</style>
<script>
 
  export default {
    data() {
      return {
        activeIndex2: '1',
        userName: '',
        centerDialogVisible: false,
        password: '',
        repassword: ''
      };
    },
    created() {
      this.getUserName();
      this.getCurrentIndex();
    },
    watch:{
      '$route' (to, from) {
      	if(from.path == '/'){
      	  this.getUserName();
      	}
      }
    },
    methods: {
      getCurrentIndex() {
        this.activeIndex2 = sessionStorage.getItem("tabIndex");
      },
      getUserName() {
      	let userName = localStorage.getItem('userName');
  	    if(!userName){
          this.$router.push({
            path:"/"
          });
  	    }else{
  	      this.userName = userName;
  	    }
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      logout() {
      	localStorage.clear();
      	this.$router.push({
  	      path:"/"
  	    });
      },
      jump(num){
        sessionStorage.setItem("tabIndex",num);
      	switch(num){
      	  case 1 :
  	  	  	this.$router.push({
  		        path:"/messageList"
  		      });
		        break;
		      case 2 :
    	  	  this.$router.push({
    		      path:"/taskPlan"
    		    });
		        break;
           case 3 :
            this.$router.push({
              path:"/analysis"
            });
            break;
		      case 4 : 
  	        this.$router.push({
  	          path:"/systemManage"
						});
						break;
					case 6 :
						this.$router.push({
							path:"/policy"
						});
						break;
					case 7 :
						this.$router.push({
							path:"/blacklist"
						});
						break;
					case 8 :
						this.$router.push({
							path:"/InterfaceManage"
						});
						break;
        }
      },
      sure() {
        if(!this.password || !this.repassword){
          this.$message({
            showClose: true,
            message: '新密码和确认新密码不能为空',
            type: 'warning'
          });
          return
        }

        if(this.password != this.repassword){
          this.$message({
            showClose: true,
            message: '新密码和确认新密码的值不一致',
            type: 'warning'
          });
          return
        }

        let userId = localStorage.getItem("userId"),
            userNum = localStorage.getItem("userNum");

        let params = new URLSearchParams();
            params.append('userId', userId);
            params.append('userNum', userNum);
            params.append('password', this.password);

        this.$post(`${this.url}/xhHlck/updateXhPassWordByUserId`, params)
        .then(res => {
          if (res.code == 200) {
            this.$message({
              message: '修改成功',
              type: 'success'
            });

            this.centerDialogVisible = false;
          }else{
            this.$message.error('修改失败');
          }
        })
      }
    }
  }
</script>
