
const PrivilegeUtils = {
  priTransToCode: function (arr) {
    let owner="",group="",other="";
    owner=PrivilegeUtils.priEncode(arr["owner"]);
    group=PrivilegeUtils.priEncode(arr["group"]);
    other=PrivilegeUtils.priEncode(arr["other"]);
    return owner+group+other;
  },

  //string to code
  priEncode: function(arr){
    let result=0;
    for(let i=0;i<arr.length;i++){
      switch (arr[i]) {
        case "r":{
          result+=4;
          break;
        }
        case "w":{
          result+=2;
          break;
        }
        case "x":{
          result+=1;
          break;
        }
      }
    }
    return result.toString();
  },

  priAnalysis: function (str) {
    let owner=[],group=[],other=[];
    if(str[0]==="r") owner.push("r");
    if(str[1]==="w") owner.push("w");
    if(str[2]==="x") owner.push("x");

    if(str[3]==="r") group.push("r");
    if(str[4]==="w") group.push("w");
    if(str[5]==="x") group.push("x");

    if(str[6]==="r") other.push("r");
    if(str[7]==="w") other.push("w");
    if(str[8]==="x") other.push("x");

    let result = {"owner":owner, "group":group, "other":other};
    return result;
  }
}

export default PrivilegeUtils;
