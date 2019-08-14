<template>
  <div class="blacklist">
    <div class="blacklistTitle">
      <p>第三方接口管理</p>
    </div>
    <div class="blacklistBody">
      <div class="content-list">

        <div class="item" v-for="(item, index) in dataList" :key="index">
          <div class="title">
            {{item.companyName}}
            <i @click="updCompanyName(item.companyId, item.companyName)" class="el-icon-edit"></i>
          </div>

          <div class="item-item" v-for="(data ,key) in item.apis" :key="key">
            <div class="caozuo">
              <el-popover
                placement="bottom"
                trigger="click">
                <p @click="showUpd(data)" style="text-align:center;line-height:30px;cursor: pointer;"><i class="el-icon-edit"></i> 编辑</p>
                <p @click="del(data.interfaceId)" style="text-align:center;line-height:30px;cursor: pointer;"><i class="el-icon-delete"></i> 删除</p>
                <span slot="reference" class="el-icon-more"></span>
              </el-popover>
            </div>
            <div class="jiekou">
              <div class="jiekou-title">接口名称</div>
              <div class="jiekou-url">
                <p>{{data.interfaceName}}</p>
              </div>
            </div>
            <div class="jiekou" style="padding-top: 10px;">
              <div class="jiekou-title">接口地址</div>
              <div class="jiekou-url">
                <p>{{data.interfaceAddr}}</p>
              </div>
            </div>
            <div class="jiekou" style="padding-top: 10px;">
              <div class="jiekou-title">接口描述</div>
              <div class="jiekou-url">
                <p>{{data.interfaceDesc}}</p>
              </div>
            </div>
            <div class="jieguo">
              <div class="jieguo-title">测试结果</div>
              <div class="jieguo-box">{{data.result}}</div>
            </div>
          </div>
          <div class="addApi" @click="showAddApi(item.companyId)"><i class="el-icon-plus"></i></div>
        </div>

      </div>

      <div class="add">
        <p class="add-p" @click="showAddCompany" v-show="!showAdd">
          <i class="el-icon-plus"></i>
          新建第三方公司
        </p>
        <div class="add-div" v-show="showAdd">
          <el-input v-model="companyName" placeholder="请输入第三方公司名称"></el-input>
          <el-button type="primary" @click="addcompany">新建</el-button>
        </div>
      </div>
    </div>
    <!-- 添加api -->
    <el-dialog title="新建接口" width="600px" :visible.sync="dialogFormVisible" :modal-append-to-body="false">
      <el-form label-width="120px">
        <el-form-item label="接口名称">
          <el-input v-model="interfaceName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="接口地址">
          <el-input v-model="interfaceAddr" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="接口描述">
          <el-input v-model="interfaceDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdXhInterface">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<style lang="less" scoped>
.blacklist {
  position: relative;
  z-index: 2;
  padding-top: 60px;
}
.blacklistTitle {
  background: white;
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
.blacklistBody {
  display: flex;
  flex-wrap: nowrap;
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
  padding: 20px;
  background-color: #fff;
  overflow-x: auto;
  .content-list{
    display: flex;
    .item{
      width: 350px;
      padding: 10px;
      margin-right: 20px;
      background-color: #f5f5f5;
      border-radius: 6px;
      overflow: hidden;
      .title{
        padding: 10px 0;
        text-align: left;
        font-size: 14px;
        color: #1a1a1a;
        .el-icon-edit{
          margin-left: 10px;
          cursor: pointer;
        }
      }
      .item-item{
        margin-top: 10px;
        background-color: #fff;
        border-radius: 6px;
        .caozuo{
          height: 30px;
          margin-bottom: 5px;
          line-height: 30px;
          text-align: right;
          span{
            display: inline-block;
            height: 30px;
            line-height: 30px;
            margin-right: 10px;
            font-size: 20px;
            cursor: pointer;
          }
        }
        .jiekou{
          display: flex;
          .jiekou-title{
            flex: 0 0 80px;
            font-size: 12px;
            color: #1a1a1a;
          }
          .jiekou-url{
            flex: 1;
            padding-bottom: 10px;
            border-bottom: 1px solid #D8D8D8;
            word-wrap: break-all;
            font-size: 12px;
            color: #666;
            p{
              word-wrap: break-all;
              text-align: left;
            }
          }
        }
        .jieguo{
          display: flex;
          padding: 5px 0;
          .jieguo-title{
            flex: 0 0 80px;
            height: 40px;
            line-height: 40px;
            font-size: 12px;
            color: #1a1a1a;
          }
          .jieguo-box{
            line-height: 40px;
            font-size: 12px;
            color: #666;
          }
        }
      }
      .addApi{
        height: 30px;
        margin-top: 10px;
        background-color: #fff;
        border-radius: 6px;
        text-align: center;
        line-height: 30px;
        cursor: pointer;
      }
    }
  }
  .add{
    flex: 0 0 250px;
    padding: 20px;
    margin-right: 20px;
    .add-p{
      text-align: left;
      cursor: pointer;
    }
    .add-div{
      div{
        margin-top: 10px;
      }
      button{
        margin-top: 10px;
        width: 100%;
      }
    }
  }
}
</style>

<script>
export default {
  data() {
    return {
      dataList: [],
      showAdd: false,
      name: '',
      dialogFormVisible: false,
      sourceCode: '', // 源编码
      companyName: '', // 公司名称
      interfaceName: '', // 接口名称
      interfaceAddr: '',  // 服务地址
      interfaceDesc: '',  // 接口描述
      type: '0', // 类别，0无,1查人，2查车，3查护照，4查驾照，5人像比对
      companyList: {},  // 保存所有的第三方公司
      companyId: '', // 添加和修改api时使用
      interfaceId: '', // 修改api时使用
      isAddInterface: true  // 判断是添加还是修改
    }
  },
  methods: {
    // 查询第三方公司
    getXhCompany(){
      let params = new URLSearchParams()
      this.$post(`${this.url}/xhHlck/getXhCompany`, params)
      .then(res => {
        if(res.code == 200){
          let data = JSON.parse(res.data).list
          let obj = {}
          data.forEach( (d, i) => {
            obj[d.companyId] = d.companyName
          })
          this.companyList = obj
          this.getXhInterface()
        }
      })
    },
    // 查询第三方公司下的接口
    getXhInterface(){
      let params = new URLSearchParams()
      this.$post(`${this.url}/xhHlck/getXhInterface`, params)
      .then(res => {
        if(res.code == 200){
          let data = JSON.parse(res.data).list
          let companys = {}
          data.forEach((d,i) => {
            if(companys[d.companyId]){
              companys[d.companyId].push(d)
            }else{
              companys[d.companyId] = [d]
            }
          })
          let arr = []
          for(let k in this.companyList){
            let o = {
              'companyId': k,
              'companyName': this.companyList[k],
              'apis': companys[k] || []
            }
            arr.push(o)
          }
          this.dataList = arr
        }
      })
    },
    // 添加公司
    addcompany(){
      if(this.companyName){
        let params = new URLSearchParams();
        params.append('companyName', this.companyName);
        this.$post(`${this.url}/xhHlck/addXhCompany`,params)
        .then(res => {
          if(res.code == 200){
            this.getXhCompany()
            this.showAdd = false
            this.$message({
              type: "success",
              message: "添加成功!"
            });
          }
        })
      }else{
        this.$message({
          type: "warning",
          message: "请输入公司名称!"
        })
      }
    },
    showAddCompany(){
      this.showAdd = true
      this.companyName = ''
    },
    showAddApi(id){
      this.dialogFormVisible = true
      this.isAddInterface = true
      this.companyId = id
      this.interfaceName = ''
      this.interfaceAddr = ''
      this.interfaceDesc = ''
    },
    // 修改第三方公司名称
    updCompanyName(id,name){
      this.$prompt('修改第三方公司', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValue: name,
          inputPattern: /^[\s\S]*.*[^\s][\s\S]*$/,
          inputErrorMessage: '请输入第三方公司名称'
        }).then(({ value }) => {
          this.updCompany(id, value)
        })
    },
    updCompany(id, name){
      let params = new URLSearchParams();
      params.append('companyId', id);
      params.append('companyName', name);
      this.$post(`${this.url}/xhHlck/updateXhCompany`,params)
      .then(res => {
        if(res.code == 200){
          this.getXhCompany()
          this.$message({
            type: "success",
            message: "修改成功!"
          })
        }
      })
    },
    addOrUpdXhInterface(){
      this.isAddInterface ? this.addXhInterface() : this.upd()
    },
    // 添加接口
    addXhInterface(){
      if(this.interfaceName && this.interfaceAddr && this.interfaceDesc){
        let params = new URLSearchParams();
        params.append('companyId', this.companyId);
        params.append('interfaceName', this.interfaceName);
        params.append('interfaceAddr', this.interfaceAddr);
        params.append('interfaceDesc', this.interfaceDesc);
        this.$post(`${this.url}/xhHlck/addXhInterface`,params)
        .then(res => {
          if(res.code == 200){
            this.getXhCompany()
            this.dialogFormVisible = false
            this.$message({
              type: "success",
              message: "添加成功!"
            })
          }
        })
      }else{
        this.$message({
          type: "warning",
          message: "请将接口信息填写完整!"
        })
      }
    },
    del(interfaceId){
      this.$confirm("删除后无法撤回, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let params = new URLSearchParams();
        params.append("interfaceId", interfaceId);
        this.$post(`${this.url}/xhHlck/deleteXhInterface`, params)
        .then(res => {
          if(res.code == 200){
            this.getXhCompany()
            this.$message({
              type: "success",
              message: "删除成功!"
            })
          }
        })
      })
    },
    showUpd(d){
      document.querySelector("#app").click()
      this.dialogFormVisible = true
      this.isAddInterface = false
      this.companyId = d.companyId
      this.interfaceId = d.interfaceId
      this.interfaceName = d.interfaceName
      this.interfaceAddr = d.interfaceAddr
      this.interfaceDesc = d.interfaceDesc
    },
    upd(){
      let params = new URLSearchParams()
      params.append("interfaceId", this.interfaceId)
      params.append("companyId", this.companyId)
      params.append("interfaceName", this.interfaceName)
      params.append("interfaceAddr", this.interfaceAddr)
      params.append("interfaceDesc", this.interfaceDesc)
      this.$post(`${this.url}/xhHlck/updateXhInterface`, params)
      .then(res => {
        this.dialogFormVisible = false
        this.getXhCompany()
        this.$message({
          type: "success",
          message: "修改成功!"
        })
      })
    }
  },
  mounted(){
    this.getXhCompany()
  }
};
</script>