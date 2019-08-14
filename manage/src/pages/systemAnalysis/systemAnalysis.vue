<template>
  <div class="information">
    <div class="information-title">
      <p>系统分析</p>
    </div>
    <div class="information-body">
      <el-form class="search-form" ref="form" :inline="true" label-width="80px">
        <el-form-item label="时间">
            <el-date-picker
              v-model="dateTime"
              @change="changeDate"
              type="daterange"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
        </el-form-item>
      </el-form>

      <h3 class="title">数据情况</h3>
      <div class="wrap">
        <div class="statistics">
          <div class="total" style="width:100px">  
            <h1>{{collectCarSum+collectPersonSum+checkCarSum+checkPersonSum}}</h1>
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
        
        <h3 class="title">盘查访问情况</h3>
        <div id="pancha"></div>
        <h3 class="title">数据录入情况</h3>
        <div id="shujuluru"></div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.information {
  position: relative;
  z-index: 2;
  padding-top: 60px;
}
.information-title {
  background: white;
  margin: 0 auto;
  height: 50px;
  box-shadow: 0 2px 5px #eee;
  position: fixed;
  width: 100%;
  top: 60px;
  left: 0;
  z-index: 22;
  p {
    margin-left: 240px;
    text-align: left;
    line-height: 20px;
    height: 20px;
    font-weight: bold;
    font-size: 15px;
    border-left: 3px solid black;
    padding-left: 6px;
    position: relative;
    top: 15px;
  }
}
.information-body {
  margin: 20px;
  padding-left: 20px;
  padding-right: 20px;
  background-color: #fff;
  border-radius: 6px;
}
.title {
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  text-align: left;
}
.data-msg {
  display: flex;
  div {
    flex: 1;
    height: 200px;
  }
}
#pancha, #shujuluru {
  height: 400px;
}
.search-form{
    padding-top: 20px;
    margin-bottom: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
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
      height: 140px;
      background: white;
      bottom: 0;
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
    .iconfont{
    font-size: 22px;
  }
</style>
<script>
import echarts from "echarts";

export default {
  data() {
    return {
        checkPersonSum: '',
        checkCarSum: '',
        collectPersonSum: '',
        collectCarSum: '',
        dateTime: []
    };
  },
  created(){
    this.getOneMonth()
  },
  methods: {
    zhutu(id, data) {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById(id));
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ["人员盘查", "车辆盘查", "护照盘查"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: data.dateList
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: data.dataList
      });
    },
    zhexian(id, data) {console.log(data.lrDataList);
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById(id));
        // 绘制图表
        myChart.setOption({
            tooltip: {
                trigger: 'axis'
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            legend: {
              data: ["人员录入", "车辆录入", "护照录入"]
            },
            xAxis: {
                type: 'category',
                data: data.dateList
            },
            yAxis: {
                type: 'value'
            },
            series: data.lrDataList
        });
    },
    getCkCtTotalGroupByDay() {
      let params = new URLSearchParams();
      params.append("startDate", this.dateTime[0]);
      params.append("endDate", this.dateTime[1]);
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
          let dateList = [];
          let dataList = [
              {
                name: "人员盘查",
                type: "bar",
                data: []
              },
              {
                name: "车辆盘查",
                type: "bar",
                data: []
              },
              {
                name: "护照盘查",
                type: "bar",
                data: []
              }
          ];
          checkList.forEach((d,i)=>{
            dateList.push(d.currentDate);
            dataList[0].data.push(d.personCount);
            dataList[1].data.push(d.carCount);
            dataList[2].data.push(d.passPortCount);
          });
          let pcData = {
            dataList: dataList,
            dateList: dateList
          }
          this.zhutu("pancha", pcData);
          // 录入情况列表
          let collectList = data.collectList;
          let lrDataList = [
            {
              name:'人员录入',
              stack: '总量',
              type: 'line',
              data: []
            },
            {
              name:'车辆录入',
              stack: '总量',
              type: 'line',
              data: []
            },
            {
              name:'护照录入',
              stack: '总量',
              type: 'line',
              data: []
            }
          ];
          collectList.forEach((d,i)=>{
            lrDataList[0].data.push(d.personCount);
            lrDataList[1].data.push(d.carCount);
            lrDataList[2].data.push(d.passPortCount);
          });
          let lrData = {
            lrDataList: lrDataList,
            dateList: dateList
          }
          this.zhexian('shujuluru', lrData);
        } else {
          this.$message.error("获取列表失败");
        }
      });
    },
    getOneMonth(){
      let arr = [];
      let d = new Date();
      let y = d.getFullYear();
      let m = d.getMonth()+1;
      m = m > 9 ? m : '0'+m;
      let day = d.getDate();
      day = day > 9 ? day : '0'+day;
      arr[1] = y+'-'+m+'-'+day;

      let s = new Date(d.getTime()-30*24*60*60*1000);
      let sy = s.getFullYear();
      let sm = s.getMonth()+1;
      sm = sm > 9 ? sm : '0'+sm;
      let sd = s.getDate();
      sd = sd > 9 ? sd : '0'+sd;
      arr[0] = sy+'-'+sm+'-'+sd;
      this.dateTime = arr
    },
    changeDate(){
      this.getCkCtTotalGroupByDay()
    }
  },
  mounted() {
    this.getCkCtTotalGroupByDay();
  }
};
</script>
