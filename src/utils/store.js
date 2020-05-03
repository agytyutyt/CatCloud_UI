import Vue from 'vue'
import Vuex from 'vuex'
import service from './axios'
import { Loading } from 'element-ui';
import qs from 'qs'
import { Message } from 'element-ui';
import comTtils from "../utils/common"
import current from "element-ui/packages/table/src/store/current";

Vue.use(Vuex);

const state = {
  user: {
    name:"",
    home:"",
  },
  currentDir: "",
  dir: "",
}

const mutations = {
  setUser(state, {name,home}){
    state.user.name=name;
    state.user.home=home;
  },
  setUser_obj(state, user){
    state.user=user;
  },
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
  setDir(state, dir){
    state.dir=dir;
  },
}

const getters= {
  getRoute: state =>  {
    return state.currentDir.split("/");
  },
  getCurrentDir: state => {
    return state.currentDir===""?"/":state.currentDir;
  },
  getUserName: state => {
    return state.user.name;
  },
  getUser: state => {
    return state.user;
  },
  getDir: state => {
    return state.dir;
  }
}

const actions = {
  login: function(context,{username,password}){
    let loadingInstance = Loading.service({});  //启动加载动效
    let data={
      username: username,
      password: password
    };
    data=qs.stringify(data);
    // console.log(data);
    return {"promise":service.post("/login/checkAccount",data),"loading":loadingInstance};
  },
  updateLocalDir(context){
    let loadingInstance = Loading.service({});  //启动加载动效
    let dirName=context.state.currentDir;
    if(dirName==="") dirName="/";
    // console.log("updateLocalDir=========="+dirName);
    service.get("/explorer/getDir?dirname="+dirName,{})
      .then(res => {
        let data=res.data;
        if(data["error"]){
          Message({
            message: '目录不存在',
            type: 'error'
          });
        }
        else{
          for(let i=0;i<data.length;i++){
            data[i]["selected"]=false;
            data[i]["edit"]=false;
          }
          context.commit("setDir",JSON.stringify(data));
        }

        // this.sortKey(this.dir,"name");
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
    };
    data=qs.stringify(data);
    return {"promise":service.post("/explorer/dirRename",data),"loading":loadingInstance};
  },

  newFile: function(context,{name,type,pri}){
    let loadingInstance = Loading.service({});  //启动加载动效
    let data={
      name:name,
      type: type,
      pri: pri,
      currentDir:context.state.currentDir
    }
    data=qs.stringify(data);
    // console.log(data);
    return {"promise":service.post("/explorer/newFile",data),"loading":loadingInstance};
  },

  deleteFile: function(context,{name,type}){
    let loadingInstance = Loading.service({});  //启动加载动效
    let data={
      name: name,
      type: type,
      currentDir:context.state.currentDir
    };
    data=qs.stringify(data);
    // console.log(data);
    return {"promise":service.post("/explorer/deleteFile",data),"loading":loadingInstance};
  },

  fileInfo: function(context,{name}){
    let loadingInstance = Loading.service({});  //启动加载动效
    let data={
      name: name,
      currentDir:context.state.currentDir===""?"/":context.state.currentDir
    };
    data=qs.stringify(data);
    // console.log(data);
    return {"promise":service.post("/explorer/getFileInfo",data),"loading":loadingInstance};
  },

  editInfo: function(context, {type,value,file}){
    let loadingInstance = Loading.service({});  //启动加载动效
    let data={
      type: type,
      value: value,
      file: file,
      currentDir:context.state.currentDir===""?"/":context.state.currentDir
    };
    data=qs.stringify(data);
    // console.log(data);
    return {"promise":service.post("/explorer/editInfo",data),"loading":loadingInstance};
  },

  refreshFileList: function (context) {
    context.state.dir="";
    context.dispatch("updateLocalDir");
  },

  downloadFile: function (context,{name}) {
    let loadingInstance = Loading.service({});  //启动加载动效
    let data={
      name: name,
      currentDir:context.state.currentDir===""?"/":context.state.currentDir
    };
    data=qs.stringify(data);
    // console.log(data);
    return {"promise":service.post("/explorer/downFile",data),"loading":loadingInstance};
  },

  uploadRequest: function (context,{count,size}) {
    let data={
      count: count,
      size: size
    };
    data=qs.stringify(data);
    return service.post("/explorer/upFile",data);
  },
  test: function (context) {

  },

  copyFile: function (context,{file,target}) {
    let loadingInstance = Loading.service({});  //启动加载动效
    let data={
      from: context.state.currentDir+"/"+file,
      to: target
    };
    data=qs.stringify(data);
    console.log(data);
    return {"promise":service.post("/explorer/copyFile",data),"loading":loadingInstance};
  },
  mvFile: function (context,{file,target}) {
    let loadingInstance = Loading.service({});  //启动加载动效
    let data={
      from: context.state.currentDir+"/"+file,
      to: target
    };
    data=qs.stringify(data);
    console.log(data);
    return {"promise":service.post("/explorer/moveFile",data),"loading":loadingInstance};
  },
  searchFile: function (context,{file}) {
    let data={
      file: file,
      path: "/"
    };
    data=qs.stringify(data);
    return service.post("/api/searchFile",data)
  },

  checkLogin: function (context) {
    return service.get("/api/checkLogin",{});
  },
  getDiskInfo: function (context) {
    return service.get("/api/getDiskInfo",{});
  }
};

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})
