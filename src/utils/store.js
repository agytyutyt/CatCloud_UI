import Vue from 'vue'
import Vuex from 'vuex'
import service from './axios'
import { Loading } from 'element-ui';
import qs from 'qs'
import current from "element-ui/packages/table/src/store/current";

Vue.use(Vuex);

const state = {
  currentDir: "",
  dir: "",
    dir1: [
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
  ],
    dir2: [
    {
      name: "drcat",
      selected: "false",
      isDir: true,
      children: []
    }
  ]
}

const mutations = {
  enterDir(state, dirName){
    state.currentDir+=("/"+dirName);    //改变当前路径
    //改变当前dir值
    let tmp=state.currentDir;
    if(tmp==="" || tmp==="/") {
      tmp="/";
    }
  },
  lastDir(state,dirName=null){
    let str=state.currentDir;
    if(dirName===null){
      let index=str.lastIndexOf("/");
      state.currentDir=str.substring(0,index);
    }
    else{
      let index=str.indexOf("dirName");
      state.currentDir=str.substr(0,index+dirName.length);
    }
  },
  gotoDir(state, dirName){
    state.currentDir=dirName;
  },
  setDir(state, dirName){
    state.dir=dirName;
  }
}

const getters= {
  getRoute: state =>  {
    return state.currentDir.split("/");
  },
  getCurrentDir: state => {
    return state.currentDir===""?"/":state.currentDir;
  }
}

const actions = {
  updateLocalDir(context){
    let loadingInstance = Loading.service({});  //启动加载动效
    let dirName=context.state.currentDir;
    if(dirName==="") dirName="/";
    service.get("/explorer/getDir?dirname="+dirName,{})
      .then(res => {
        let data=res.data;
        for(let i=0;i<data.length;i++){
          data[i]["selected"]=false;
          data[i]["edit"]=false;
        }
        context.commit("setDir",JSON.stringify(data));
        loadingInstance.close();  //取消加载动效
      })
      .catch(error => {
        console.log(error);
      })
  },

  /**
   *
   * @param context   store上下文
   * @param file   要更改的文件名
   * @param newFile   新的文件名
   * @param dir       默认值为“”，表示使用当前路径；否则表示使用绝对路径
   */
  renameFile: function (context,{file,newFile}){
    let loadingInstance = Loading.service({});  //启动加载动效
    let oldName=context.state.currentDir+"/"+file;
    let newName=context.state.currentDir+"/"+newFile;
    let data={
      oldName:oldName,
      newName:newName,
      currentDir:context.state.currentDir
    }
    data=qs.stringify(data);
    return {"promise":service.post("/explorer/dirRename",data),"loading":loadingInstance};

    // service.post("/explorer/dirRename",data)
    //   .then(res=>{
    //     return {"res":res.data,"loading":loadingInstance};
    //   })
  }

}

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})
