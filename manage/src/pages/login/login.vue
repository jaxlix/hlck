<template>
	<div class="login_">
	  <div class="top">核录查控&nbsp;·&nbsp;用数据改变未来</div>
		<div class="content">
		  <div class="login">
			<div class="title">核录查控登录</div>
			<div class="line">
			  <img class="smallImg" src="../../assets/icon1.png" />
			  <input placeholder="请输入账号" type="text" v-model="userName"/>
			</div>
			<div class="line">
			  <img class="smallImg" src="../../assets/icon2.png" />
		      <input placeholder="请输入密码" type="password" v-model="password"/>
			</div>
			<button type="button" class="logBut" @click="login">登&nbsp;&nbsp;录</button>
		</div>
	  </div>
	</div>
</template>
<style type="text/css">
.login_{
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	top: 0;
	height: 100%;
	background-image: url("../../assets/bg2.jpg") ;
	background-size: 100%;
	z-index: 22;
}
body {
	
	text-align: center;
	background-size: 100% 100%;
	height: 100%;
	overflow: hidden;
	background-repeat: no-repeat;
	background-position: center;
	background-attachment: fixed;
}

.top {
	background: #ffffff2e;
	width: 100%;
	position: absolute;
	top: 0;
	line-height: 80px;
	left: 0px;
	right: 0px;
	color: #fff;
	text-align: left;
	padding-left: 80px;
	font-size: 26px;
	font-weight: 600;
}

.login {
	background: #fff;
	width: 21%;
	text-align: center;
	padding: 70px 2%;
	border-radius: 2px;
	position: absolute;
	top: 23%;
	right: 5%;
}

.title {
	font-weight: 600;
	font-size: 22px;
	color: #333;
	margin-bottom: 40px;
}

.line {
	border-bottom: 1px solid #d8d8d8;
	margin: 22px 1%;
	width: 96%;
}

.line input {
	border: none;
	padding: 0px 1%;
	margin: 1%;
	background: #fff;
	width: 84%;
	font-size: 16px;
	line-height: 30px;
	outline: none;
}

.line .smallImg {
	width: 26px;
	float: left;
	vertical-align: middle;
	margin-top: 1px;
}

.logBut {
	background: #8BC34A;
	padding: 10px 80px;
	border: none;
	color: #fff;
	margin-top: 40px;
	font-size: 16px;
	cursor:pointer;
}
</style>
<script type="text/javascript">
   export default {
     data(){
       return {
       	 userName : '',
       	 password : ''
       }
     },
     methods: {
       login() {
       	if(this.loginId == ''){
       	  this.$message({
            message: '登录账号不能为空',
            type: 'warning'
          });
          return;
       	}

       	if(this.password == ''){
       	   this.$message({
             message: '密码不能为空',
             type: 'warning'
           });
           return;
       	}
 		let params = new URLSearchParams();
          params.append('loginId', this.userName);
          params.append('password', this.password);

        this.$post(`${this.url}/xhHlck/loginCheck`,
          params
        )
        .then((response) => {

          if(response.code == 200){
            this.$message({
              message: '登录成功',
              type: 'success'
            });
            localStorage.setItem("userNum", JSON.parse(response.data).list.userNum);
            localStorage.setItem("userName", JSON.parse(response.data).list.name);
            localStorage.setItem("userId", JSON.parse(response.data).list.userId);
            
            this.$router.push({
		      path:"/messageList"
		    });

          }else if(response.code == 502){
          	this.$message({
              message: '暂无权限',
              type: 'warning'
						});

          }else{
            this.$message({
              message: '登录失败，账号密码错误',
              type: 'warning'
            });
          }    
        })
       	
       }
     }
   }
</script>