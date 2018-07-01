function findItemByProp (arr_obj, prop_name, prop_val) {
  let item = null;
  for (let i = 0, length = arr_obj.length; i < length; i++) {
    item = arr_obj[i];
    if (item[prop_name] == prop_val){
      return i;
    }
  }
  return false;
}


const YTB_REG = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;
function isValidURL(url) {
  return YTB_REG.test(url);
}

