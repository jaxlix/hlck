<template>
  <div class="peopleSearch">
    <div class="shaixuan">
      <div class="shaixuan-select">
        <span>查看</span>
        <el-select v-model="value" @change="change" placeholder="全部" size="mini">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="shaixuan-right">
        <span class="blue"></span>
        <span>站点范围（{{zdfwNum}}）</span>
        <span class="red"></span>
        <span>人员盘查（{{rypcNum}}）</span>
      </div>
    </div>
  	<div class="wrap">
      <p>今日数据统计</p>
      
      <div class="statistics">
        <div class="total" style="width:100px">  
           <h1>{{collectCarSum + collectPersonSum + checkCarSum + checkPersonSum}}</h1>
           <p>总使用量(次)</p>
        </div>

        <div class="addCar">
           <i class="iconfont iconcar"></i>
           <p>{{collectCarSum}}</p>
           <div>新增车辆录入</div>
        </div>

        <div class="people">
          <i class="iconfont iconrenyuan"></i>
          <p>{{collectPersonSum}}</p>
          <div>新增人员录入</div>
        </div>
 
         <div class="car">
           <i class="iconfont iconcheliangchaxun"></i>
           <p>{{checkCarSum}}</p>
           <div>车辆查询</div>
        </div>

        <div class="passcad">
          <i class="iconfont iconrenyuanchaxun"></i>
          <p>{{checkPersonSum}}</p>
          <div>人员查询</div>
        </div>
      </div>
	  </div>
  </div>
</template>
<style scoped lang="less">
.shaixuan{
  display: flex;
  justify-content: space-between;
  position: fixed;
  left: 260px;
  bottom: 200px;
  width: 527px;
  height: 50px;
  padding: 0 10px;
  line-height: 50px;
  background-color: #fff;
  box-shadow: 0 0 10px #ccc;
  .shaixuan-select{
    display: flex;
    width: 200px;
    span{
      width: 80px;
    }
  }
  .shaixuan-right{
    .blue{
      display: inline-block;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: #2B81FF;
    }
    .red{
      display: inline-block;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: #F54336;
    }
  }
}
  .peopleSearch{
    .deputy{
      >p{
        span{
          display: inline-block;
          width: 14px;
          height: 14px;
          background: #d81e06;
          border-radius: 100%;
          font-size: 12px;
        }
      }
    }
  	.wrap{
      .total{
        border-right: 1px solid #aaa;
        h1{
          color: #409EFF;
          font-weight: bold;
          font-size: 40px;
          margin-top: 20px;
          margin-bottom: 30px;
        }
      }
  	  padding: 0 100px;
      position: fixed;
      width: 70%;
      left: 260px;
      height: 140px;
      background: white;
      bottom: 0;
      box-shadow: 0 0 10px #ccc;
      padding:20px 40px;
      .statistics{
        display: flex;
        margin-top: 20px;
        >div{
          text-align: center;;
          flex: 1;
          img{
            width: 30px;
          }
          >div{
            margin-top: 10px;
          }
        }
        p{
          margin-top: 10px;
        }
      }
      >p{
        text-align: left;
      }
  	}
  }
  .iconfont{
    font-size: 22px;
  }
</style>
<script>
  import '../../../common/tools';

  export default {
    data() {
      return {
        checkPersonSum: '',// 盘查人总数量
        checkCarSum: '',// 盘查车总数量
        collectPersonSum: '',// 录入人总数量
        collectCarSum: '',// 录入车总数量
        total : 0,
        options: [
          {value: '1,2,3', label: '全部'},
          {value: '1', label: '查人'},
          {value: '2', label: '查车'},
          {value: '3', label: '查护照'}
        ],
        value: '1,2,3'
      }
    },
    props: ['zdfwNum', 'rypcNum'],
    methods:{
      getCkCtTotalGroupByDay() {
        let params = new URLSearchParams();
        params.append("startDate", xh_lx.timeFormate('yyyy-MM-dd',new Date()));
        params.append("endDate", xh_lx.timeFormate('yyyy-MM-dd',new Date()));
        this.$post(`${this.url}/xhHlckTwo/getCkCtTotalGroupByDay`, params).then(res => {
          if (res.code == 200) {
            let data = JSON.parse(res.data);
            // 盘查人总数量
            this.checkPersonSum = data.checkPersonSum;
            // 盘查车总数量
            this.checkCarSum = data.checkCarSum;
            // 盘查护照总数量
            let checkPassPortSum = data.checkPassPortSum;
            // 录入人总数量
            this.collectPersonSum = data.collectPersonSum;
            // 录入车总数量
            this.collectCarSum = data.collectCarSum;
            // 录入护照总数量
            let collectPassPortSum = data.collectPassPortSum;

            // 盘查列表
            let checkList = data.checkList;
            // 录入情况列表
            let collectList = data.collectList;
          } else {
            this.$message.error("获取列表失败");
          }
        });
      },
      change(){
        this.$store.commit('XHChECKTYPE', {xhCheckType: this.value});
      }
    },
    mounted(){
      this.getCkCtTotalGroupByDay()
    }
  }
</script>