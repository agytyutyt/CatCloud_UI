
import service from "../../utils/axios";
import qs from 'qs';
import {Loading} from "element-ui";

const file_type=["tar.gz"];

// const

export default {
  name: "解压",
  visible: function (file) {
    for(let i=0;i<file_type.length;i++){
      if(file.extension===file_type[i]) return true;
    }
    return false;
  },
  atClick: function (store,item) {
    let dir=store.getters.getCurrentDir+"/"+item.name;
    let data={
      file: dir
    };
    data=qs.stringify(data);
    let loadingInstance = Loading.service({});
    service.post("/plugin/untar",data)
      .then(res => {
        let result=res.data;
        if(result.code===0){
          store.dispatch("refreshFileList");
        }
        loadingInstance.close();
      });
  }
}
