<template>
  <div>
    <template v-for="(item,index) in dir">
      <template v-if="item.isDir">
        <el-button :class="baseFileClass+' '+checkSelectedState(item)" @dblclick.native="changeFileList" @click="switchFileState(item)">
          <div class="file_text">{{item.name}}</div>
        </el-button>
      </template>
      <template v-else>
        <el-button class="el-icon-document file_icon" plain @dblclick.native="">
          <div class="file_text">{{item.name}}</div>
        </el-button>
      </template>
    </template>
  </div>
</template>

<script>
  var time = null;
  export default {
    name: "fileList",
    methods: {
      checkSelectedState: function(item){
        console.log(item.selected);
        if(item.selected==="true"){
          console.log(item.selected);
          return 'el-button-focus';
        }
        else{
          return '';
        }
      },
      switchFileState: function (item) {
        clearTimeout(time);  //首先清除计时器
        time = setTimeout(() => {
          if(item.selected==="true"){
            console.log("Now is true");
            item.selected="false";
          }
          else{
            console.log("Now is false");
            item.selected="true";
          }
        }, 250);   //大概时间300ms
      },
      changeFileList: function(){
        clearTimeout(time);  //清除
      },
      checked: function (obj) {
        alert(obj.checked);
      }
    },
    data() {
      return{
        demo: "true",
        baseFileClass: "el-icon-folder-opened file_icon",
        selectedClass: "el-button-focus",
        selected: [],
        dir: [
          {
            name: "home",
            selected: "false",
            isDir: true,
            children: [
              {
                name: "admin",
                isDir: true,
                children: [
                  {
                    name: "demo.txt",
                    isDir: false,
                    children: []
                  }
                ]
              }
            ]
          },
          {
            name: "root",
            selected: "false",
            isDir: true,
            children: [
              {
                name: "frp",
                isDir: false,
                children: []
              }
            ]
          }
        ]
      }
    }
  }
</script>

<style scoped>
.el-button {
}
.el-button-focus{
  background-color: #409EFF;
  color: #FFFFFF;
}
</style>
