xh_lx = {
  timeFormate: function (fmt, date) {
    var o = {
      "M+": date.getMonth() + 1, //月份 
      "d+": date.getDate(), //日 
      "h+": date.getHours(), //小时 
      "m+": date.getMinutes(), //分 
      "s+": date.getSeconds(), //秒 
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
      "S": date.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt))
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  },
  downLoad: function(url,data){
    var form = document.createElement('form');
    form.setAttribute('target', '_blank');
    form.setAttribute('action', url);
    form.setAttribute('method', 'post');
    form.setAttribute('style', 'display:none;');
    for(var key in data){
      var input = document.createElement('input');
      input.setAttribute('type', 'hidden');
      input.setAttribute('name', key);
      input.setAttribute('value', data[key]);
      form.appendChild(input)
    }
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
    return false;
  }
}
