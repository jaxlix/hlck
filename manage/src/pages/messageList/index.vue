<template>
  <div class="manage">
    <div id="map" class="map"></div>
    <!-- <search></search> -->
    <peopleSearch :zdfwNum="zdfwNum" :rypcNum="rypcNum"></peopleSearch>
  </div>
</template>
<style lang="less" scoped>
  .manage{
    position: relative;
    z-index: 1;
    .map{
      position: fixed;
      width: 100%;
      height: 100%;
    }
  }
</style>
<script>
import {mapGetters} from 'vuex';
import search from './search/search';
import peopleSearch from './peopleSearch/peopleSearch';
import '../../common/tools.js';
var map = null;
export default {
  data () {
    return {
      arr: {
        "type": "FeatureCollection",
        "features": [],
        "xhCheckType": "1,2,3",
        "panchaArr": []
      },
      zdfwNum: 0,
      rypcNum: 0
    }
  },
  computed: {
    ...mapGetters({
      xhCheckType: 'xhCheckType'
    })
  },
  watch: {
    xhCheckType(val){
      this.getCheckDataUserDept();
      this.removeAllMarker(this.panchaArr);
    }
  },
  mounted(){
    this.addMark()
  },
  methods:{
    addMark() {
      minemap.domainUrl = this.mapUrl;
      minemap.dataDomainUrl = this.dataDomainUrl;
      minemap.spriteUrl = `${this.mapUrl}/minemapapi/${this.version}/sprite/sprite`;
      minemap.serviceUrl = `${this.mapUrl}/service`;
      minemap.accessToken = '25cc55a69ea7422182d00d6b7c0ffa93';
      minemap.solution = 2365;
      map = new minemap.Map({
        container: 'map',
        style: `${this.mapUrl}/service/solu/style/id/2365`, /*底图样式*/
        center: [106.74,26.57], /*地图中心点*/
        zoom: 10, /*地图默认缩放等级*/
        pitch: 0, /*地图俯仰角度*/
        maxZoom:17, /*地图最大缩放等级*/
        minZoom:3,  /*地图最小缩放等级*/
      });
      this.getXhArea();
      this.getCheckDataUserDept();
    },
    getXhArea() { // 检查站
      let params = new URLSearchParams();
      this.$post(`${this.url}/xhHlck/getXhArea`,params)
        .then((res) => {
          if(res.code == 200){
            let list = JSON.parse(res.data).list;
            this.zdfwNum = list.length;
            let markerList = [];
            for(let i=0; i < list.length ; i++){
              let el = document.createElement('div');
              el.id = 'marker';
              el.style["background-color"] = "#2B81FF";
              el.style.width = "50px";
              el.style.height = "50px";
              el.style["border-radius"] = "50%";
              el.style.cursor = "pointer";
              let marker = new minemap.Marker(el, {offset: [-25, -25]}).setLngLat([list[i].longitude,list[i].latitude]);
              markerList.push(marker);
            }
            this.addAllMarker(markerList);
          }else{
            this.$message({
              message: '查询失败',
              type: 'warning'
            });
          }    
        })
    },
    getCheckDataUserDept(){ // 人员盘查
      let params = new URLSearchParams();
      params.append('xhCheckType', this.xhCheckType);
      params.append('startTime', xh_lx.timeFormate('yyyy-MM-dd',new Date()));
      params.append('endTime', xh_lx.timeFormate('yyyy-MM-dd',new Date()));
      this.$post(`${this.url}/xhHlckTwo/getCheckDataUserDept`,params)
        .then((res) => {
          if(res.code == 200){
            let data = JSON.parse(res.data);
            let personList = data.personList || [];
            let passportList = data.passportList || [];
            let carList = data.carList || [];
            let list = personList.concat(passportList).concat(carList);
            // list = [{jd: 106.74,wd: 26.57}];
            this.panchaArr = list;
            this.rypcNum = list.length;
            let markerList = [];
            for(let i=0; i < list.length ; i++){
              let el = document.createElement('div');
              el.id = 'marker';
              el.style["background-color"] = "#e70012";
              el.style.width = "10px";
              el.style.height = "10px";
              el.style["border-radius"] = "50%";
              el.style.cursor = "pointer";
              let marker = new minemap.Marker(el, {offset: [-25, -25]}).setLngLat([list[i].jd,list[i].wd]);
              markerList.push(marker);
            }
            this.addAllMarker(markerList);
          }
        })
    },
    addAllMarker(arr){
      map.addMarkers(arr);
    },
    removeAllMarker(arr) {
      map.removeMarkers(arr);
    }
  },
  components:{
    search : search,
    peopleSearch : peopleSearch
  }
}
</script>

