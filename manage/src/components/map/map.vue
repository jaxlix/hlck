<template>
  <div id="map">
  	
  </div>
</template>
<script type="text/javascript">
  export default {
    data() {
      return {

      }
    },
    mounted() {
      this.initMap()
    },
    initMap() {
      minemap.domainUrl = this.mapUrl;
	    minemap.dataDomainUrl = this.dataDomainUrl;
	    minemap.spriteUrl = `${this.mapUrl}/minemapapi/${this.version}/sprite/sprite`;
	    minemap.serviceUrl = `${this.mapUrl}/service`;
	    minemap.accessToken = '25cc55a69ea7422182d00d6b7c0ffa93';
	    minemap.solution = 2365;
	    var map = new minemap.Map({
	      container: 'map',
	      style: `${this.mapUrl}/service/solu/style/id/2365`, /*底图样式*/
	      center: [106.71,26.57], /*地图中心点*/
	      zoom: 10, /*地图默认缩放等级*/
	      pitch: 0, /*地图俯仰角度*/
	      maxZoom:17, /*地图最大缩放等级*/
	      minZoom:3,  /*地图最小缩放等级*/
	    });
    }
  }
</script>