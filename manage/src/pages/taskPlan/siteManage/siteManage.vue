<template>
  <div class="lowerTesk">
  	<div class="lowerTeskTitle">
      <p>站点管理</p>
  	</div>

    <div class="site">
      <div class="siteSearch">
        <p>盘查站点<em>*</em></p>

        <div class="siteManageContent">
          <div class="params">
            <p>
              <span>盘查半径：</span>
              <el-input-number v-model="radius"  :min="1" :max="100" label="描述文字" class="radius"></el-input-number>
              <em>km</em>
            </p>
            <p>
              <span>站点名：</span>
              <el-input v-model="siteName" placeholder="请输入内容" class="radius"></el-input>
            </p>

            <p>
              <span style="margin-right:10px;">搜索名：</span>
              <el-input v-model="teskName" placeholder="请输入搜索内容" class="searchSite"></el-input>
              <el-button type="primary" round class="searchButtom" @click="searchSite">搜索</el-button>            
            </p>
          </div>
          <div class="result">
            <p>搜索结果</p>
            <div class="resultContent">
              <div class="noData" v-if="noData">
                暂无结果
              </div>
              <div class="content" v-for="(item, index) in mapResult" :key="index">
                <div class="contentLeft" @click="prevCircle(index,item.geom_display.coordinates, 12)">
                  <span>{{index + 1}}</span>
                  <p style="margin-bottom:5px;font-size:14px;">{{item.name}}</p>
                  <p style="color:#676767">{{item.address}}</p>
                </div>
                <div class="contentRight" v-show="setSiteButton" ref="coordinates">
                  <span @click="setSite(item.address,item.geom_display.coordinates)">设置站点</span>
                  <span @click="cancle()" style="margin-top:4px;background:rgb(249, 5, 5)">取消</span>
                </div>
              </div>
              <paging></paging>
            </div>
           </div>
        </div>

        <div id="map"></div>
        
        <siteData :siteData="siteData"></siteData>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
  .lowerTesk{
  	position: relative;
    z-index: 2;
    padding-top: 50px;
    .lowerTeskTitle{
      background: white;
      position: fixed;
      width: 100%;
      top: 60px;
      left: 0;
      z-index: 3;
      margin:0 auto;
      height: 50px;
      box-shadow: 0 2px 5px #eee;
      em{
      	color: #9a9a9a;
      }
      span{
      	cursor: pointer;
      }
      p{
      	margin-left:240px;
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
    .site{
      margin: 20px;
      .siteSearch{
      	position: relative;
        background: white;
        box-shadow: 0 0px 5px #ccc;
        .siteManageContent{
          position: absolute;
          z-index: 2;
          font-size: 14px;      
          width: 300px;
          height: 300px;
          .params{
          	background: white;
          	height: 164px;
          	width: 350px;
          	box-shadow: 0px 0px 10px #ccc;
          	margin-left: 10px;
          	p{
          	  text-align: left;
          	  padding: 10px;
          	  display: flex;
          	  span{
          	  	display: inline-block;
          	  	width: 70px;
          	  	margin-top: 10px;
          	  }
              em{
                font-size: 16px;
                margin-top: 10px;
                padding-left:6px;
                color: #828282
              }
              .searchButtom{
                margin-left: 20px;
                line-height: 0;
                margin-top: 2px;
              }
          	  .searchSite{
          	  	width: 150px
          	  }
          	  .radius{
          	  	width: 200px;
          	  	margin-left: 10px;
          	  	height: 24px;
          	  }
          	}
          }
          .result{
            background: white;
            height: 220px;
            width: 350px;
            -webkit-box-shadow: 0px 0px 10px #ccc;
            box-shadow: 0px 0px 10px #ccc;
            margin-left: 10px;
            margin-top: 10px;
            border-radius: 2px;
            >p{
              text-align: left;
              padding: 10px;
            }
            .resultContent{
              .noData{
                font-size: 16px;
                color: #7d7d7d;
                line-height: 80px;
              }
              height: 170px;
              overflow: auto;
              .content{
                width: 90%;
                margin:0 auto;
                position: relative;
                border-radius: 5px;
                display: flex;
                padding:10px;
                .contentLeft{
                  cursor: pointer;
                  flex: 3;
                  text-align: left;
                  padding:10px 0;
                  span{
                    position: absolute;
                    display: block;
                    width: 20px;
                    height: 20px;
                    background: red;
                    border-radius: 20px;
                    text-align: center;
                    line-height: 20px;
                    color: white;
                  }
                  p{
                    margin-left:30px;
                  } 
                }
                .contentRight{
                  flex: 1;
                  span{
                    display: inline-block;
                    width: 80px;
                    height: 30px;
                    line-height: 30px;
                    cursor: pointer;
                    border-radius: 30px;
                    background: #409EFF;
                    color: white;
                  }
                }
              }
              .content:hover{
                background: rgba(0,0,0,0.1)
              };
            }
            .resultContent{
              overflow-x: hidden;
              overflow-y: auto;
              color: #000;
              font-size: .7rem;
              font-family: "\5FAE\8F6F\96C5\9ED1",Helvetica,"黑体",Arial,Tahoma;
            }
            /*滚动条样式*/
            .resultContent::-webkit-scrollbar {/*滚动条整体样式*/
              width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
              height: 4px;
            }
            .resultContent::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
              border-radius: 5px;
              -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
              background: rgba(0,0,0,0.2);
            }
            .resultContent::-webkit-scrollbar-track {/*滚动条里面轨道*/
              -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
              border-radius: 0;
              background: rgba(0,0,0,0.1);
            }
          }
        }
        #map{
          height: 430px;
          // width: 1000px;
        }
        >p{
          text-align: left;
          padding: 10px;
          font-size: 14px;
          em{
          	color: red;
          	position: relative;
          	top: 2px;
          	left: 2px;
          }
        }
      }       
    }
  }
</style>
<script type="text/javascript">
import {mapGetters} from 'vuex';

import zTree from '../../../components/ztree/zTree';
import siteData from './siteData';
import paging from '../../../components/paging/paging'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      curNum: 1,
      inputPlan: '',
      mapResult: [],
      siteName: '',
      setSiteButton: false,
      prevClickNum: -1,
      teskName: '',
      radius: 1,
      noData: true,
      map:'',
      siteData: Object, //传递true 为更新数据
      geojson:{
        "type": "FeatureCollection",
        "features": []
      }
    }
  },
  mounted(){
  	this.loadMap();
  },
  computed: {
    ...mapGetters({
      pageNum: 'pageNum'
    })
  },
  watch:{
    pageNum() {
      this.curNum = this.pageNum;
      if(this.curNum){
        this.searchSite();
      }   
    }
  },
  methods:{
  	loadMap() {
  	  minemap.domainUrl = this.mapUrl;
      minemap.dataDomainUrl = this.dataDomainUrl;
      minemap.spriteUrl = `${this.mapUrl}/minemapapi/${this.version}/sprite/sprite`;
      minemap.serviceUrl = `${this.mapUrl}/service`;
      minemap.accessToken = '25cc55a69ea7422182d00d6b7c0ffa93';
      minemap.solution = 2365;
      this.map = new minemap.Map({
        container: 'map',
        style: `${this.mapUrl}/service/solu/style/id/2365`, /*底图样式*/
        center: [106.71,26.57], /*地图中心点*/
        zoom: 10, /*地图默认缩放等级*/
        pitch: 0, /*地图俯仰角度*/
        maxZoom:17, /*地图最大缩放等级*/
        minZoom:3,  /*地图最小缩放等级*/

      });
      this.map.getCanvas().style.cursor = 'pointer';
      this.mapClick();
  	},
    mapClick() {
      this.map.on("click",  (e)=> {
    
        var lngLat = e.lngLat;
        let lng = lngLat.lng;
        let lat = lngLat.lat;
      
        /**
         * 这个获取经纬度有两种方式，lngLat是我们的基本返回对象，用户可以用
         * 1 lngLat.lng 获取经度     lngLat.lat 获取纬度
         * 2 lngLat.toArray()   获取一个数组 [经度，纬度]
         */
        this.mark([lng , lat] , this.radius ,10);  //1作为标示，从点击地图定位
        minemap.service.queryReverseGeoCodingResult( [lng , lat].join(','), this.radius, 1000, 1000, 0,  (error, results)=> {
          if(error){
            this.$message.error('查询结果失败');
          }else{
            this.teskName = results.data.restName;
            this.searchSite()        
          }
        }); 
      })
    },
    cancle() {
      this.loadMap();
      this.$refs.coordinates[this.prevClickNum].style.display = 'none';  
    },
    searchSite() {
      if(!this.teskName){
        this.$message({
          message: '搜索名不能为空',
          type: 'warning'
        });
        return;
      }

      minemap.service.queryRoadSearchResult('520000', this.teskName, this.curNum, 10,  (error, results)=> {
        if(error){
          this.$message.error('查询结果失败');
        }else{   
          this.noData = false;
          this.mapResult = results.data.rows;   
          console.log(results.data)      
          this.$store.commit("PAGE",{
            'pageTotal': results.data.totalCount
          }) 
        }
      });
    },
    prevCircle(index,data ,zoom) {
      try{
        this.$refs.coordinates[this.prevClickNum].style.display = 'none';       
      }catch(err){}
      
      if(!this.radius){
        this.$message({
          message: '不能为空',
          type: 'warning'
        });
        return;
      }
      
      //记录下上一次搜索结果点击是哪一个
      this.prevClickNum = index;
    
      this.$refs.coordinates[index].style.display = 'block';

      //画圆
      this.mark(data,this.radius , zoom)  
    },
    mark(longlat, radius, zoom){
      if(zoom == 12){
        this.map = new minemap.Map({
          container: 'map',
          style: `${this.mapUrl}/service/solu/style/id/2365`, /*底图样式*/
          center: longlat, /*地图中心点*/
          zoom: zoom, /*地图默认缩放等级*/
          pitch: 0, /*地图俯仰角度*/
          maxZoom:17, /*地图最大缩放等级*/
          minZoom:3,  /*地图最小缩放等级*/

        });
        var center = longlat;
        var options = {steps: 64, units: 'kilometers', properties: {foo: 'bar'}};
        var cirlceGeo = turf.circle(center, radius, options);
        this.map.on("load", ()=> {
          this.map.addSource("polygon", {
            "type": "geojson",
            "data": cirlceGeo
          }); 
       
          this.map.addLayer({
            "id": "polygon",
            "type": "fill",
            "source": "polygon",
            "layout": {},
            "paint": {
              "fill-color": "blue",
              "fill-opacity": 0.6
            }
          });
        })
      }
    },
    setSite(areaName, coordinates) {
      if(!this.siteName){
        this.$message({
          message: '站点名不能为空',
          type: 'warning'
        });
        return;
      }
      let params = new URLSearchParams();
          params.append('areaName', this.siteName);
          params.append('locationName', areaName);
          params.append('longitude', coordinates[0]);
          params.append('latitude', coordinates[1]);
          params.append('radius', this.radius * 1000);

        this.$post(`${this.url}/xhHlck/addXhArea`,
          params
        )
        .then((response) => {
          if(response.code == 200){
            this.$message({
              message: '新增成功',
              type: 'success'
            });
            this.loadMap();
            this.$refs.coordinates[this.prevClickNum].style.display = 'none';  
            this.siteData = {
              'upDate' : true
            };
          }else{
            this.$message.error('新增失败');
          }    
        })
    }
  },
  components:{
    zTree : zTree,
    siteData : siteData,
    paging : paging
  }
}
</script>