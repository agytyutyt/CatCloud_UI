import router from "./index"

router.beforeEach((to, from, next) => {
  console.log("to: "+to+"  from: "+from);
  next();
});
