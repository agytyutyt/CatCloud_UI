import Vue from 'vue'
import Vuex from 'vuex'
import service from './axios'
import { Loading } from 'element-ui';
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
  }
}

const actions = {
  updateLocalDir(context){
    let loadingInstance = Loading.service({});
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
        loadingInstance.close();
      })
      .catch(error => {
        console.log(error);
      })
  },

}

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})
