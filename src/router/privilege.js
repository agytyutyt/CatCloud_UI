import router from "./index"
import store from "../utils/store";

router.beforeEach((to, from, next) => {

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
