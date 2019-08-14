<template>
  <div class="tree">
    <el-tree
      :data="data"
      node-key="id"
      :default-expanded-keys="[2, 3]"
      :default-checked-keys="[5]"
      show-checkbox
      @node-click="handleNodeClick"
      @check-change="handleCheckChange"
      :props="defaultProps">
    </el-tree>
  </div>
</template>
<script>
  import { Loading } from 'element-ui';
  export default {
    data() {
      return {
        data: [{
          id: '4bc9e4b4-dc9e-4b3b-981e-09ecdec171ac',
          label: '贵州省公安厅',
          children: []
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    },
    created() {
      this.getDept();
    },
    methods:{
      getDept() {
        this.$post(`${this.url}/xhHlckTwo/getDepartment`,
        )
        .then((response) => {
          if(response.code == 200){
         
            let data = JSON.parse(response.data).list;
            const newTeam = function (data, parentId) {
              let itemArr = [];
              for (let i = 0 , len = data.length; i < len ; i++) {
                let node = data[i];
                if (node.parentId == parentId) {
                  let newNode = {};
                  newNode.id = node.orgId;
                  newNode.label = node.name;
                  itemArr.push(newNode);
                  newNode.children = newTeam(data, node.orgId);               
                }
              }    
              return itemArr;  
            }
            this.data[0].children = newTeam(data, '4bc9e4b4-dc9e-4b3b-981e-09ecdec171ac');
          }else{
            this.$message.error('查询失败');
          }    
        })  
      },
      handleCheckChange(data, checked, indeterminate) {
        if(checked){        
          this.$store.commit("CHECKBOXORNODE",{
            checkboxOrNode: 1
          });
         //获取当前部门以及子部门的用户
          this.$store.commit("AllPEOPLEPARTID",{
            time : new Date().getTime(),
            allPeoplePartId: data.id
          });
        }else{
          
          this.$store.commit("AllPEOPLEPARTID",{
            time : new Date().getTime(),
            allPeoplePartId: 0
          });
        }
      },
      handleNodeClick(data){  
        
        //用来重启分页
        this.$store.commit("REFRESHPAGE",{
          refreshPage: true
        });
        let id = data.id;
        this.$store.commit("CHECKBOXORNODE",{
          checkboxOrNode: 2
        });
        this.$store.commit("ORGID",{
          orgId: id
        });   
      },
    }
  };
</script>