import router from "./index"
import store from "../utils/store";

router.beforeEach((to, from, next) => {
  // let user=JSON.stringify(this.$store);
  // sessionStorage.setItem("user",user);
  // if(from.name===null && from.path==="/") {
  //   let user=JSON.stringify(store.getters.getUser);
  //   let currentDir=store.getters.getCurrentDir;
  //   let dir=store.getters.getDir;
  //   sessionStorage.setItem("user",user);
  //   sessionStorage.setItem("currentDir",currentDir);
  //   sessionStorage.setItem("dir",dir);
  // }

  let toName=to.name;
  if(!to.meta.needLogin) {
    next();
  }
  else{
    store.dispatch("checkLogin",{})
      .then(res => {
        let checkResult=res.data;
        if(checkResult["code"]!==0){
          next("login");
        }
        else{
          next();
        }
      });
  }
});

router.afterEach((to, from) => {
  // let user=JSON.parse(sessionStorage["user"]);
  // alert("!!!!!!!!!!");
  // console.log(user);
  // store.commit("setUser",user)
    // let user=JSON.stringify(store.getters.getUser);
    // let currentDir=store.getters.getCurrentDir;
    // let dir=store.getters.getDir;
    // sessionStorage.setItem("user",user);
    // sessionStorage.setItem("currentDir",currentDir);
    // sessionStorage.setItem("dir",dir);
});
