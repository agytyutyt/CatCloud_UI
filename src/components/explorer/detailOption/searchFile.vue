<template>
  <el-table
    :data="searchResult"
    v-loading="loading"
    @row-dblclick="enterPath"
    style="width: 100%"
    height="560px">
    <el-table-column
      prop="path"
      label="路径">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="120">
      <template slot-scope="scope">
        <el-button @click="enterPath(searchResult[scope.$index])" type="primary"> 进入 </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    data() {
      return {
        loading: false,
        searchResult: []
      }
    },
    methods:{
      confirm(){
        this.confirmFunc();
      },
      switchDialog: function(){
        this.cancelFunc();
      },
      updateDir: function () {
        this.$store.dispatch("updateLocalDir");
      },
      enterPath(item){
        let path=item.path;
        this.$store.commit("gotoDir",path);
        this.updateDir();
        this.switchDialog();
      }
    },
    props: ["confirmFunc","cancelFunc","dialogProps"],
    created() {
      this.loading=true;
      this.$store.dispatch("searchFile",{file: this.dialogProps["findFileName"]})
      .then(res=>{
        let sResult=[];
        for(let i=0;i<res.data["output"].length;i++){
          let tmp={path:res.data["output"][i]};
          sResult.push(tmp);
        }
        this.searchResult=sResult;
        this.loading=false;
        // console.log(sResult);
      })
    }
  }
</script>
