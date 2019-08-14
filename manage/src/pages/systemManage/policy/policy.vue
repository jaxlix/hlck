<template>
  <div class="policy">
    <div class="policyTitle">
      <p>策略管理</p>
    </div>

    <el-tabs type="border-card" v-model="checkType" @tab-click="changeCheckType">
      <el-tab-pane label="人员" name="1"></el-tab-pane>
      <el-tab-pane label="车辆" name="2"></el-tab-pane>
      <el-tab-pane label="人像" name="5"></el-tab-pane>
      <div class="policy-body">
        <div class="policy-body-div">
          <p class="policy-body-title">盘查原因</p>
          <div class="policy-body-list">
            <p class="policy-body-total">共{{this.pcyy.length}}条</p>
            <ul class="policy-body-ul">
              <li v-for="item in pcyy" :key="item.checkReasonId">
                {{item.reasonName}}
                <i class="el-icon-edit" @click="edit(item,1)"></i>
                <i class="el-icon-delete" @click="open(item.checkReasonId,1)"></i>
              </li>
            </ul>
            <div class="policy-add" @click="dialogVisible=true,addType=1">+</div>
          </div>
        </div>
        <div class="policy-body-div">
          <p class="policy-body-title">处置结果</p>
          <div class="policy-body-list">
            <p class="policy-body-total">共{{this.czjg.length}}条</p>
            <ul class="policy-body-ul">
              <li v-for="item in czjg" :key="item.checkResultId">
                {{item.resultName}}
                <i class="el-icon-edit" @click="edit(item,2)"></i>
                <i class="el-icon-delete" @click="open(item.checkResultId,2)"></i>
              </li>
            </ul>
            <div class="policy-add" @click="dialogVisible=true,addType=2">+</div>
          </div>
        </div>
        <!-- <div class="policy-body-div">
          <p class="policy-body-title">对比源选择</p>
          <div class="policy-body-list">
            <p class="policy-body-total">共{{this.dbyxz.length}}条</p>
            <ul class="policy-body-ul">
              <li v-for="item in dbyxz" :key="item.sourceId">
                {{item.sourceName}}
                <i class="el-icon-edit" @click="edit(item,3)"></i>
                <i class="el-icon-delete" @click="open(item.sourceId,3)"></i>
              </li>
            </ul>
            <div class="policy-add" @click="dialogVisible=true,addType=3">+</div>
          </div>
        </div> -->
      </div>
    </el-tabs>

    <!-- 添加 -->
    <el-dialog title="添加" :visible.sync="dialogVisible" :modal-append-to-body="false">
      <el-form :model="form" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" v-model="form.describle"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改 -->
    <el-dialog title="修改" :visible.sync="dialogVisibleChange" :modal-append-to-body="false">
      <el-form :model="updForm" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="updForm.name"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" v-model="updForm.describle"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleChange = false">取 消</el-button>
        <el-button type="primary" @click="upd">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<style lang="less" scoped>
.policy {
  position: relative;
  z-index: 2;
  padding-top: 60px;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 10px;
}
.policyTitle {
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
.policy-body {
  padding-bottom: 40px;
  background-color: #fff;
  border-radius: 6px;
}
.policy-body:after {
  content: "";
  display: block;
  clear: both;
}
.policy-body-div {
  float: left;
  width: 50%;
  // height: 400px;
}
.policy-body-div:first-child {
  box-sizing: border-box;
  padding-left: 10px;
}
.policy-body-div:last-child {
  box-sizing: border-box;
  padding-right: 10px;
}
.policy-body-title {
  height: 40px;
  line-height: 40px;
  text-align: left;
  font-size: 12px;
  padding-left: 10px;
}
.policy-body-list {
  position: relative;
  height: 90%;
  margin-left: 10px;
  margin-right: 10px;
  border: 1px solid #d1d1d1;
  border-radius: 6px;
}
.policy-body-total {
  height: 40px;
  padding-left: 10px;
  line-height: 40px;
  color: #ccc;
  text-align: left;
  border-bottom: 1px solid #d8d8d8;
  font-size: 12px;
}
.policy-body-ul > li {
  position: relative;
  padding-top: 10px;
  padding-right: 40px;
  padding-bottom: 10px;
  padding-left: 15px;
  border-bottom: 1px solid #d8d8d8;
  text-align: left;
  font-size: 14px;
}
.policy-body-ul > li > i {
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 100%;
  text-align: center;
  cursor: pointer;
  color: #e70016;
}
.policy-body-ul > li > i.el-icon-edit {
  color: #409eff;
  right: 20px;
}
.policy-add {
  position: absolute;
  bottom: -15px;
  left: 0;
  width: 100%;
  height: 20px;
  line-height: 20px;
  background-color: #fff;
  border: 0;
  border-radius: 3px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  color: #ccc;
  cursor: pointer;
}
</style>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      dialogVisibleChange: false,
      form: {},
      updForm: {},
      checkType: "1", // 1查人，2查车，3查护照，4查驾照，5人像比对
      addType: "", // 1添加盘查原因 2添加处置结果 3添加对比源选择
      pcyy: [],
      czjg: [],
      // dbyxz: []
    };
  },
  methods: {
    // 盘查原因列表
    getXhCheckReason() {
      let params = new URLSearchParams();
      params.append("checkType", this.checkType);
      this.$post(`${this.url}/xhHlck/getXhCheckReason`, params).then(res => {
        if (res.code == 200) {
          let data = JSON.parse(res.data).list;
          this.pcyy = data;
        } else {
          this.$message.error("获取失败");
        }
      });
    },
    // 增加盘查原因
    addXhCheckReason() {
      this.dialogVisible = false;
      let params = new URLSearchParams();
      params.append("checkType", this.checkType);
      params.append("reasonName", this.form.name);
      params.append("reasonDescrible", this.form.describle);
      this.$post(`${this.url}/xhHlck/addXhCheckReason`, params).then(res => {
        if (res.code == 200) {
          this.getXhCheckReason();
          this.form = {};
          this.$message({
            type: "success",
            message: "添加成功!"
          });
        } else {
          this.$message.error("添加失败");
        }
      });
    },
    // 删除盘查原因
    deleteXhCheckReason(checkReasonId) {
      let params = new URLSearchParams();
      params.append("checkReasonId", checkReasonId);
      this.$post(`${this.url}/xhHlck/deleteXhCheckReason`, params).then(res => {
        if (res.code == 200) {
          for (let i = 0; i < this.pcyy.length; i++) {
            if (checkReasonId == this.pcyy[i].checkReasonId) {
              this.pcyy.splice(i, 1);
              break;
            }
          }
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        } else {
          this.$message.error("删除失败");
        }
      });
    },
    // 修改盘查原因
    updateXhCheckReason() {
      this.dialogVisibleChange = false;
      let params = new URLSearchParams();
      params.append("checkReasonId", this.updForm.checkReasonId);
      params.append("checkType", this.checkType);
      params.append("reasonName", this.updForm.name);
      params.append("reasonDescrible", this.updForm.describle);
      this.$post(`${this.url}/xhHlck/updateXhCheckReason`, params).then(res => {
        if (res.code == 200) {
          this.getXhCheckReason();
          this.updForm = {};
          this.$message({
            type: "success",
            message: "修改成功!"
          });
        } else {
          this.$message.error("修改失败");
        }
      });
    },
    // 处置结果列表
    getXhCheckResult() {
      let params = new URLSearchParams();
      params.append("checkType", this.checkType);
      this.$post(`${this.url}/xhHlck/getXhCheckResult`, params).then(res => {
        if (res.code == 200) {
          let data = JSON.parse(res.data).list;
          this.czjg = data;
        } else {
          this.$message.error("获取失败");
        }
      });
    },
    // 增加处置结果
    addXhCheckResult() {
      this.dialogVisible = false;
      let params = new URLSearchParams();
      params.append("checkType", this.checkType);
      params.append("resultName", this.form.name);
      params.append("resultDescrible", this.form.describle);
      this.$post(`${this.url}/xhHlck/addXhCheckResult`, params).then(res => {
        if (res.code == 200) {
          this.getXhCheckResult();
          this.form = {};
          this.$message({
            type: "success",
            message: "添加成功!"
          });
        } else {
          this.$message.error("添加失败");
        }
      });
    },
    // 删除处置结果
    deleteXhCheckResult(checkResultId) {
      let params = new URLSearchParams();
      params.append("checkResultId", checkResultId);
      this.$post(`${this.url}/xhHlck/deleteXhCheckResult`, params).then(res => {
        if (res.code == 200) {
          for (let i = 0; i < this.czjg.length; i++) {
            if (checkResultId == this.czjg[i].checkResultId) {
              this.czjg.splice(i, 1);
              break;
            }
          }
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        } else {
          this.$message.error("删除失败");
        }
      });
    },
    // 修改处置结果
    updateXhCheckResult() {
      this.dialogVisibleChange = false;
      let params = new URLSearchParams();
      params.append("checkResultId", this.updForm.checkResultId);
      params.append("checkType", this.checkType);
      params.append("resultName", this.updForm.name);
      params.append("resultDescrible", this.updForm.describle);
      this.$post(`${this.url}/xhHlck/updateXhCheckResult`, params).then(res => {
        if (res.code == 200) {
          this.getXhCheckResult();
          this.updForm = {};
          this.$message({
            type: "success",
            message: "修改成功!"
          });
        } else {
          this.$message.error("修改失败");
        }
      });
    },
    // 对比源列表
    // getXhSource() {
    //   let params = new URLSearchParams();
    //   params.append("type", this.checkType);
    //   this.$post(`${this.url}/xhHlck/getXhSource`, params).then(res => {
    //     if (res.code == 200) {
    //       let data = JSON.parse(res.data).list;
    //       this.dbyxz = data;
    //     } else {
    //       this.$message.error("获取失败");
    //     }
    //   });
    // },
    // 增加对比源
    // addXhSource() {
    //   this.dialogVisible = false;
    //   let params = new URLSearchParams();
    //   params.append("type", this.checkType);
    //   params.append("sourceCode", 'ceshi');
    //   params.append("serviceAddr", 'serviceAddr');
    //   params.append("sourceName", this.form.name);
    //   params.append("serviceDesc", this.form.describle);
    //   this.$post(`${this.url}/xhHlck/addXhSource`, params).then(res => {
    //     if (res.code == 200) {
    //       this.getXhSource();
    //       this.form = {};
    //       this.$message({
    //         type: "success",
    //         message: "添加成功!"
    //       });
    //     } else {
    //       this.$message.error("添加失败");
    //     }
    //   });
    // },
    // 删除对比源
    // deleteXhSource(sourceId) {
    //   let params = new URLSearchParams();
    //   params.append("sourceId", sourceId);
    //   this.$post(`${this.url}/xhHlck/deleteXhSource`, params).then(res => {
    //     if (res.code == 200) {
    //       for (let i = 0; i < this.dbyxz.length; i++) {
    //         if (sourceId == this.dbyxz[i].sourceId) {
    //           this.dbyxz.splice(i, 1);
    //           break;
    //         }
    //       }
    //       this.$message({
    //         type: "success",
    //         message: "删除成功!"
    //       });
    //     } else {
    //       this.$message.error("删除失败");
    //     }
    //   });
    // },
    // 修改对比源
    // updateXhSource() {
    //   this.dialogVisibleChange = false;
    //   let params = new URLSearchParams();
    //   params.append("sourceId", this.updForm.sourceId);
    //   params.append("type", this.checkType);
    //   params.append("sourceCode", 'ceshi');
    //   params.append("serviceAddr", 'serviceAddr');
    //   params.append("sourceName", this.updForm.name);
    //   params.append("serviceDesc", this.updForm.describle);
    //   this.$post(`${this.url}/xhHlck/updateXhSource`, params).then(res => {
    //     if (res.code == 200) {
    //       this.getXhSource();
    //       this.updForm = {};
    //       this.$message({
    //         type: "success",
    //         message: "修改成功!"
    //       });
    //     } else {
    //       this.$message.error("修改失败");
    //     }
    //   });
    // },
    open(id, type) {
      this.$confirm("删除后无法撤回, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        if (type == 1) {
          this.deleteXhCheckReason(id);
        } else if (type == 2) {
          this.deleteXhCheckResult(id);
        } else if (type == 3) {
          // this.deleteXhSource(id);
        }
      });
    },
    add() {
      if (this.addType == 1) {
        this.addXhCheckReason();
      } else if (this.addType == 2) {
        this.addXhCheckResult();
      } else if (this.addType == 3) {
        // this.addXhSource();
      }
    },
    edit(data, type) {
      let d = {};
      this.addType = type;
      if (type == 1) {
        d.checkReasonId = data.checkReasonId;
        d.name = data.reasonName;
        d.describle = data.reasonDescrible;
      } else if (type == 2) {
        d.checkResultId = data.checkResultId;
        d.name = data.resultName;
        d.describle = data.resultDescrible;
      } else if (type == 3) {
        // d.sourceId = data.sourceId;
        // d.name = data.sourceName;
        // d.describle = data.serviceDesc;
      }
      this.updForm = d;
      this.dialogVisibleChange = true;
    },
    upd() {
      if (this.addType == 1) {
        this.updateXhCheckReason();
      } else if (this.addType == 2) {
        this.updateXhCheckResult();
      } else if (this.addType == 3) {
        this.updateXhSource()
      }
    },
    changeCheckType() {
      this.getXhCheckReason();
      this.getXhCheckResult();
      // this.getXhSource();
    }
  },
  mounted() {
    this.getXhCheckReason();
    this.getXhCheckResult();
    // this.getXhSource();
  }
};
</script>




