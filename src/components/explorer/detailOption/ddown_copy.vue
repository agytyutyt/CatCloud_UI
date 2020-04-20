<template>
    <el-container style="overflow: hidden;">
      <el-header height="50px" style="margin-top: 10px;">
        <el-input v-model="selected" type="text" disabled></el-input>
      </el-header>
      <el-main style="max-height: 435px">
        <el-tree
          :data="data"
          :props="defaultProps"
          :load="loadFunc"
          @node-click="handleNodeClick"
          accordion
          lazy
          :highlight-current="true"></el-tree>
      </el-main>
      <el-footer style="margin-top: 10px;">
        <el-button @click="submit" type="primary">确定</el-button>
      </el-footer>
    </el-container>
</template>

<script>
  import service from "../../../utils/axios";

  export default {
    methods: {
      handleNodeClick(data) {
        this.selected=data.fullPath;
      },
      getDir(dir){
        if(dir==="") dir="/";
        return service.get("/explorer/getDir?dirname="+dir,{});
      },
      switchDialog: function(){
        this.cancelFunc();
      },
      loadFunc(node,resolve){
        let path="";
        if(node.level===0){
          path="";
        }
        else{
          path=node.data["fullPath"];
        }
        let promise=this.getDir(path);
        promise.then(res=>{
          let data=res.data;
          for(let i=0;i<data.length;i++){
            if(data[i]["isDir"]===false){
              data.splice(i,1);
            }
            else{
              data[i]["children"]=[];
              data[i]["fullPath"]=path+"/"+data[i].name;
            }
          }
          resolve(data);
        })
      },
      submit(){
        let target=this.selected;
        if(target===""){
          target="/";
        }
        let file=this.dialogProps["fileName"];
        let tmp_result=this.$store.dispatch("copyFile",{
          file: file,
          target: target
        });
        tmp_result.then(resolve=>{    //处理dispatch 返回的promise对象
          //promise为axios的promise对象
          resolve.promise.then(res=>{   //处理axios 返回的promise对象
            let code=res.data["code"];
            if(code==0){
              this.$message({
                message: '复制成功！',
                type: 'success'
              });
              this.switchDialog();
            }
            else{
              this.$message.error('错误！请重试。');
            }
          })
          //loading为加载页面的处理对象
          resolve.loading.close();
        });
      }
    },
    data() {
      return {
        selected: "",
        data: [],
        defaultProps: {
          children: 'children',
          label: "name",
        }
      };
    },
    props: ['cancelFunc','confirmFunc','dialogProps'],
    created() {
    }
  };
</script>
