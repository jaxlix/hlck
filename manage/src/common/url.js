let guizhou = true;
export const api = {
  url: guizhou ?  "http://10.160.53.62:8899/xh_hlck" : "http://192.168.43.129:8899/xh_hlck",
  mapUrl: guizhou ? "http://83.3.8.19" : "http://minedata.cn",
  dataDomainUrl: guizhou ? "http://83.3.8.19" : "http://datahive.minedata.cn",
  version: guizhou ? "v1.3" : "v2.0.0"
}



//去重

function deteleObject(obj) {
  var uniques=[];
  var stringify = {};
  for(var i=0; i<obj.length; i++) {
	var keys = Object.keys(obj[i]);
	keys.sort(function(a, b) {
	   return (Number(a) - Number(b));
	});
	var str='';
	for(var j=0; j < keys.length; j ++) {
	  str += JSON.stringify(keys[j]);
	  str += JSON.stringify(obj[i][keys[j]]);
	}
	if(!stringify.hasOwnProperty(str)) {
	  uniques.push(obj[i]);
	  stringify[str]=true;
	}
  }
  return uniques;
}

export {deteleObject};