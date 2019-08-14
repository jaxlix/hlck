<template>
  <div class="information">
    <div class="information-title">
      <p>信息列表</p>
    </div>
    <div class="information-body">
      <h3 class="title">{{date}}</h3>
      <div class="box1">
        <div id="diqu"></div>
        <div id="renwu"></div>
        <div id="bumen"></div>
      </div>
      <h3 class="title">任务完成情况</h3>
      <div id="renwuAllYear"></div>
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
.box1 {
  display: flex;
  div {
    flex: 1;
    height: 300px;
  }
}
#renwuAllYear {
  height: 400px;
}
</style>
<script>
import echarts from "echarts";
import '../../common/tools';

export default {
  data() {
    return {
    };
  },
  computed: {
    date() {
      let d = new Date();
      let y = d.getFullYear();
      let m = d.getMonth() + 1;
      m = m > 9 ? m : "0" + m;
      let day = d.getDate();
      day = day > 9 ? day : "0" + day;
      let w = d.getDay();
      let weekday = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
      return `${y}/${m}/${day} ${weekday[w]}`;
    }
  },
  methods: {
    zhexian(id, data) {
      console.log(data);
      var myChart = echarts.init(document.getElementById(id));
      myChart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: data.titleList
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
        series: [
          {
            name: "所有任务",
            type: "bar",
            data: data.all
          },
          {
            name: "已完成任务",
            type: "bar",
            data: data.ywc
          }
        ]
      });
    },
    bingtu(id,data) {
      var myChart = echarts.init(document.getElementById(id));
      myChart.setOption({
        title : {
            text: data.title,
            subtext: '',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: data.titleList
        },
        series : [
            {
                name: '访问来源',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data: data.dataList,
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
      });
    },
    getCkTkCtTotalBtwDay() {
      let params = new URLSearchParams();
      params.append("startDate", xh_lx.timeFormate('yyyy-MM-dd', new Date()));
      params.append("endDate", xh_lx.timeFormate('yyyy-MM-dd', new Date()));
      this.$post(`${this.url}/xhHlckTwo/getCkTkCtTotalBtwDay`, params).then(res => {
        if (res.code == 200) {
          // 盘查情况（查人、查车、查护照）
          let checkList = JSON.parse(res.data).checkList;
          let checkData = {
            'title':'盘查情况',
            'titleList': ['人员盘查','车辆盘查','护照盘查'],
            'dataList': [
              {value: checkList.personCount, name:'人员盘查'},
              {value: checkList.carCount, name:'车辆盘查'},
              {value: checkList.passPortCount, name:'护照盘查'}
            ]
          };
          // 任务完成情况（完成、未完成）
          let taskList = JSON.parse(res.data).taskList;
          let taskData = {
            'title':'任务完成情况',
            'titleList': ['已完成','未完成'],
            'dataList': [
              {value: taskList.finishNum, name:'已完成'},
              {value: taskList.unFinishNum, name:'未完成'}
            ]
          };
          // 数据录入情况（人、车、物品）
          let collectList = JSON.parse(res.data).collectList;
          let collectData = {
            'title':'数据录入情况',
            'titleList': ['人员录入','车辆录入','物品录入'],
            'dataList': [
              {value: collectList.personCount, name:'人员录入'},
              {value: collectList.carCount, name:'车辆录入'},
              {value: collectList.goodsCount, name:'物品录入'}
            ]
          };
          this.bingtu("diqu", checkData);
          this.bingtu("renwu", taskData);
          this.bingtu("bumen", collectData);
        } else {
          this.$message.error("获取列表失败");
        }
      });
    },
    getTaskTotalGroupByDay(){
      let params = new URLSearchParams();
      params.append("startDate", xh_lx.timeFormate('yyyy-MM-dd', new Date(new Date().getTime()-30*24*60*60*1000)));
      params.append("endDate", xh_lx.timeFormate('yyyy-MM-dd', new Date()));
      this.$post(`${this.url}/xhHlckTwo/getTaskTotalGroupByDay`, params).then(res => {
        if (res.code == 200) {
          let list = JSON.parse(res.data).list;
          let dateList = [];
          let all = [];
          let ywc = [];
          list.forEach((d,i)=>{
            dateList.push(d.currentDate);
            all.push(d.sum);
            ywc.push(d.finishNum);
          });
          let data = {
            titleList: ['所有任务', '已完成任务'],
            dateList: dateList,
            all: all,
            ywc: ywc
          }
          this.zhexian("renwuAllYear",data);
        }else {
          this.$message.error("获取列表失败");
        }
      })
    }
  },
  mounted() {
    this.getCkTkCtTotalBtwDay();
    this.getTaskTotalGroupByDay();
  }
};
</script>
