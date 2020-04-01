import Vue from 'vue'
import Vuex from 'vuex'
import current from "element-ui/packages/table/src/store/current";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentDir: "",
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
    ],
  },
  mutations: {
    enterDir(state, dirName){
      state.currentDir+=("/"+dirName);
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
    }
  },
  getters: {
    getRoute: state =>  {
      return state.currentDir.split("/");
    }
  }
})
