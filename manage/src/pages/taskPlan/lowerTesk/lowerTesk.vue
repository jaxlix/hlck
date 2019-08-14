<template>
  <div class="lowerTesk">
      <div class="site">
        <div class="siteSearch">
          <div class="siteContent">

            <div class="examineNumber">
              <p>
                任务类型
                <em>*</em>
              </p>
              <el-select v-model="taskType">
                <el-option label="无" value="0"></el-option>
                <el-option label="路面日常核查" value="1"></el-option>
                <el-option label="大型安保任务" value="2"></el-option>
              </el-select>
            </div>

            <div class="examineNumber">
              <p>
                任务名称
                <em>*</em>
              </p>
              <el-input v-model="taskName" placeholder="请输入内容" class="teskName"></el-input>
            </div>

            <div class="examineNumber">
              <p>
                检查地点
                <em>*</em>
              </p>
              <el-select v-model="value" placeholder="请选择" @change="selecteArea">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
            <div id="map" style="display:none"></div>
            <div class="examineNumber">
              <p>
                时间范围
                <em>*</em>
              </p>
              <el-date-picker
                v-model="value3"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd HH:mm:ss"
                @change="dateTime"
              ></el-date-picker>
            </div>

            <div class="examineNumber">
              <p>
                盘查次数
                <em>*</em>
              </p>
              <el-input-number
                v-model="num1"
                :min="1"
                :max="1000"
                label="描述文字"
                style="width:220px;"
              ></el-input-number>
            </div>

            <div class="lowerPeople">
              <p>
                下发人员
                <em>*</em>
              </p>
              <div class="lowerDiv">
                <div class="lowerDivLeft">
                  <div class="search">
                    <el-input v-model="zTreeinput" placeholder="请输入人员名字" style="width:150px;"></el-input>
                    <el-button type="primary" icon="el-icon-search" @click="zTreesearchPeople">搜索</el-button>
                  </div>
                  <zTree></zTree>
                </div>
                <ul class="peopleList">
                  <li v-for="(item, index) in peopleArr" :key="index"
                    @click="selected(item.name, item.userId , item.orgId, item.eName, index)"
                    :class="{ active: isActive }"
                    ref="active"
                  >{{item.name}},{{item.userNum}},{{item.eName}}</li>
                </ul>
                <div class="lowerDivRight">
                  <p>已选择个联系人</p>
                  <ul>
                    <li v-for="(item) in selectedPeople" :key="item.userId">
                      {{item.name}}
                      <span @click="deleteOne(item.userId)">×</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="sure">
            <el-button type="primary" class="lowerSure" @click="lowerSure">确定</el-button>
          </div>
        </div>
      </div>
  </div>
</template>
<style lang="less" scoped>
.lowerTesk {
  position: relative;
  z-index: 1;
  .site {
    .siteSearch {
      background: white;
      #map {
        height: 300px;
        width: 1000px;
      }
      > p {
        text-align: left;
        padding: 10px;
        font-size: 14px;
        em {
          color: red;
          position: relative;
          top: 2px;
          left: 2px;
        }
      }
    }
    .sure {
      text-align: left;
      .lowerSure {
        height: 30px;
        line-height: 0px;
        margin-top: 15px;
        margin-left: 100px;
        margin-bottom: 30px;
      }
    }
  }
  .siteContent {
    padding: 20px;
    font-size: 14px;
    .examineNumber {
      .teskName {
        width: 216px;
      }
      display: flex;
      margin-bottom: 10px;
      .number {
        width: 200px;
      }
      > p {
        margin-right: 30px;
        line-height: 40px;
        em {
          color: red;
          position: relative;
          top: 2px;
          left: 2px;
        }
      }
    }
    .lowerPeople {
      display: flex;
      margin-top: 20px;
      em {
        color: red;
        position: relative;
        top: 2px;
        left: 2px;
      }
    }
    .lowerDiv {
      display: flex;
      width: 700px;
      border: 1px solid #ccc;
      border-radius: 2px;
      margin-left: 30px;
      .lowerDivLeft {
        flex: 1;
        padding: 15px;
        .search {
          display: flex;
          margin-bottom: 20px;
        }
      }
      .peopleList {
        flex: 1.5;
        border-left: 1px solid #ccc;
        .noData1 {
          color: #9a9a9a;
          line-height: 54px;
          border-bottom: none;
        }
        .noData1:hover {
          background: white;
        }
        li {
          height: 34px;
          line-height: 34px;
          border-bottom: 1px solid #eee;
          cursor: pointer;
        }
        .active {
          background: #409eff;
          color: white;
        }
        li:hover {
          background: #eee;
        }
      }
      .lowerDivRight {
        border-left: 1px solid #eee;
        flex: 1;
        p {
          color: #9a9a9a;
          text-align: left;
          padding: 15px;
        }
        ul {
          li {
            padding: 10px 20px;
            position: relative;
            text-align: left;
            span {
              display: block;
              width: 16px;
              height: 16px;
              color: white;
              position: absolute;
              right: 10px;
              top: 14px;
              background: #ccc;
              text-align: center;
              border-radius: 100%;
              line-height: 16px;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}
.el-dialog__body {
  padding: 0;
}
</style>
<script type="text/javascript">
import zTree from "../../../components/ztree/zTree";

import { mapGetters } from "vuex";

export default {
  name: "HelloWorld",
  data() {
    return {
      taskType: '0',
      number: "",
      options: [],
      value: "",
      value3: [],
      num1: 1,
      peopleArr: [],
      selectedPeople: [],
      isActive: false,
      noData1: true,
      taskName: "",
      adcode: "",
      province: "",
      zTreeinput: ""
    };
  },
  computed: {
    ...mapGetters({
      orgId: "orgId"
    })
  },
  watch: {
    orgId() {
      this.getPeopleList(this.orgId.orgId);
    }
  },
  created() {
    this.getSiteList();
    this.initTime();
  },
  methods: {
    initTime() {
      let month =
        new Date().getMonth() + 1 < 10
          ? "0" + (new Date().getMonth() + 1)
          : new Date().getMonth() + 1;
      let time =
        new Date().getFullYear() + "-" + month + "-" + new Date().getDate();
      this.value3 = [`${time} 00:00:00`, `${time} 23:59:59`];
    },
    loadMap(val) {
      minemap.domainUrl = this.mapUrl;
      minemap.dataDomainUrl = this.dataDomainUrl;
      minemap.spriteUrl = `${this.mapUrl}/minemapapi/${
        this.version
      }/sprite/sprite`;
      minemap.serviceUrl = `${this.mapUrl}/service`;
      minemap.accessToken = "25cc55a69ea7422182d00d6b7c0ffa93";
      minemap.solution = 2365;
      var map = new minemap.Map({
        container: "map",
        style: `${this.mapUrl}/service/solu/style/id/2365` /*底图样式*/,
        center: [121.90154, 29.46968], //[106.71,26.57], /*地图中心点*/
        zoom: 10 /*地图默认缩放等级*/,
        pitch: 0 /*地图俯仰角度*/,
        maxZoom: 17 /*地图最大缩放等级*/,
        minZoom: 3 /*地图最小缩放等级*/
      });

      let longlat = [
        JSON.parse(val).longitude,
        JSON.parse(val).latitude
      ].join();

      minemap.service.queryReverseGeoCodingResult(
        longlat,
        1,
        1000,
        1000,
        0,
        (error, results) => {
          console.log(results);
          this.adcode = results.data.adcode;
          this.province = results.data.dist;
        }
      );
    },
    teskManage() {
      this.$router.push({
        path: "/taskPlan"
      });
    },
    getSiteList() {
      this.$post(`${this.url}/xhHlck/getXhArea`).then(response => {
        if (response.code == 200) {
          let data = JSON.parse(response.data).list;
          for (var i = 0, len = data.length; i < len; i++) {
            this.options.push({
              value: JSON.stringify({
                longitude: data[i].longitude,
                latitude: data[i].latitude,
                areaId: data[i].areaId,
                areaName: data[i].areaName,
                radius: data[i].radius
              }),
              label: data[i].areaName
            });
          }
        } else {
          this.$message.error("查询失败");
        }
      });
    },
    lowerSure() {
      if (!this.taskName) {
        this.$message({
          message: "任务名称不能为空",
          type: "warning"
        });
        return;
      } else if (!this.value) {
        this.$message({
          message: "检查地点不能为空",
          type: "warning"
        });
        return;
      } else if (this.selectedPeople.length == 0) {
        this.$message({
          message: "请选择下发人员",
          type: "warning"
        });
        return;
      }

      var toUserId = [],
        toUserName = [],
        deptId = [],
        deptName = [];
      for (var i = 0, len = this.selectedPeople.length; i < len; i++) {
        toUserId.push(this.selectedPeople[i].userId);
        toUserName.push(this.selectedPeople[i].name);
        deptId.push(this.selectedPeople[i].orgId);
        deptName.push(this.selectedPeople[i].eName);
      }

      let params = new URLSearchParams();
      params.append("taskType", this.taskType);
      params.append("taskName", this.taskName);
      params.append("areaId", JSON.parse(this.value).areaId);
      params.append("areaName", JSON.parse(this.value).areaName);
      params.append("latitude", JSON.parse(this.value).latitude);
      params.append("longitude", JSON.parse(this.value).longitude);
      params.append("radius", JSON.parse(this.value).radius);

      params.append("fromUserId", localStorage.getItem("userId"));
      params.append("fromUserName", localStorage.getItem("userName"));
      params.append("toUserId", toUserId.join(""));
      params.append("toUserName", toUserName.join(""));
      params.append("deptId", deptId.join(""));
      params.append("deptName", deptName.join(""));

      params.append("zoneCode", this.adcode);
      params.append("zoneName", this.province);

      params.append("startTime", this.value3[0]);
      params.append("endTime", this.value3[1]);

      params.append("minTargetNum", this.num1);

      this.$post(`${this.url}/xhHlck/addXhTask`, params).then(response => {
        if (response.code == 200) {
          this.$message({
            message: "任务下发成功",
            type: "success"
          });

          this.$store.commit("TASKSTATUSCODE", {
            taskStatusCode: !this.$store.taskStatusCode
          });
        } else {
          this.$message.error("创建失败");
        }
      });
    },
    getPeopleList(orgId) {
      let params = new URLSearchParams();
      params.append("orgId", orgId);
      params.append("pageNum", "");
      params.append("pageSize", "");
      this.$post(`${this.url}/xhHlckTwo/getSysUser`, params).then(response => {
        if (response.code == 200) {
          let page = JSON.parse(response.data);
          let data = JSON.parse(response.data).list;
          if (data.length == 0) {
            this.noData1 = true;
          } else {
            this.noData1 = false;
          }
          this.peopleArr = data;
        } else {
          this.$message.error("新增失败");
        }
      });
    },
    selected(name, userId, orgId, eName, index) {
      var result = this.selectedPeople.some(item => {
        if (item.userId == userId) {
          return true;
        }
      });

      if (result) {
        this.$message({
          message: "此人在添加列表已存在",
          type: "warning"
        });
        return;
      }

      this.selectedPeople.push({
        name: name,
        userId: userId,
        orgId: orgId,
        eName: eName
      });

      for (var i = 0, len = this.peopleArr.length; i < len; i++) {
        this.$refs.active[index].className = "active";
      }
    },
    deleteOne(userId) {
      for (var i = 0, len = this.peopleArr.length; i < len; i++) {
        if (this.peopleArr[i].userId == userId) {
          this.$refs.active[i].className = "";
        }
      }

      for (var i = 0, len = this.selectedPeople.length; i < len; i++) {
        if (this.selectedPeople[i].userId == userId) {
          this.selectedPeople.splice(i, 1);
          return;
        }
      }
    },
    zTreesearchPeople() {
      if (!this.zTreeinput) {
        this.$message({
          message: "搜索内容不能为空",
          type: "warning"
        });
        return;
      }

      let params = new URLSearchParams();
      params.append("name", this.zTreeinput);

      this.$post(`${this.url}/xhHlckTwo/getSysUser`, params).then(response => {
        if (response.code == 200) {
          let data = JSON.parse(response.data).list;
          this.peopleArr = data;
        } else {
          this.$message.error("新增失败");
        }
      });
    },
    selecteArea(val) {
      this.loadMap(val);
    },
    dateTime(val) {
      this.value3 = val;
    }
  },
  components: {
    zTree: zTree
  }
};
</script>