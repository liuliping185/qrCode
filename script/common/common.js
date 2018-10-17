// 获取地址栏参数
function GetQueryString(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  decodeURIComponent(r[2]); return null;
}

//生成随机数的方法
var chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

function generateMixed(n) {
     var res = "";
     for(var i = 0; i < n ; i ++) {
         var id = Math.ceil(Math.random()*35);
         res += chars[id];
     }
     return res;
}

function getCaption(obj,str){
    var index=obj.lastIndexOf(str);
    obj=obj.substring(index+1,obj.length);
//  console.log(obj);
    return obj;
}

//把HTML格式的字符串转义成实体格式字符串
function escapeHTMLString(str) {
    str = str.replace(/</g,'&lt;');
    str = str.replace(/>/g,'&gt;');
    return str;
}

//把实体格式字符串转义成HTML格式的字符串
function escapeStringHTML(str) {
    str = str.replace(/&lt;/g,'<');
    str = str.replace(/&gt;/g,'>');
    return str;
}

function islogin(){
  if(!localStorage.userid){
    api.openWin({
        name: 'login',
        url: 'login.html'
    });
  }
}

// function issignout(){
//   api.addEventListener({
//       name: 'keyback'
//   }, function(ret, err) {
//     api.confirm({
//         title: '提示',
//         msg: '确定要退出程序吗？',
//         buttons: ['确定', '取消']
//     }, function(ret, err){
//         if(1 == ret.buttonIndex){
//           localStorage.setItem("userid","");
//              api.closeWidget();
//         }
//     });
//   });
// }

//退出APP
function issignout(){
  $api.setStorage('isFullScreen',0);
  //按两次退出应用
  api.addEventListener({
    name : 'keyback'
  }, function(ret, err) {
    //全屏时 需要发送事件 并关闭全屏
    var isFullScreen = $api.getStorage('isFullScreen');
    console.log("isFullScreen"+isFullScreen);
    //如果全屏 只关闭全屏
    if(isFullScreen == '1'){

      api.sendEvent({
          name: 'clickhome',
          extra: {}
      });
    }else{
      api.toast({
        msg : '再点一次退出应用',
        duration : 2000,
        location : 'bottom'
      });
      api.addEventListener({
        name : 'keyback'
      }, function(ret, err) {
        if($api.getStorage('isFullScreen' == "0")){
          api.sendEvent({
              name: 'clickhome',
              extra: {}
          });
        }else{
          api.closeWidget({
            silent : true
          });
        }

      });
    }

    setTimeout(function() {
    }, 2000)
  });
}


function getuserinfo(){
  var result = false;
  $.ajax({
		type  : "POST",
		url   : path + "userinfo/findUserInfoById.action",
		data  : {
      userid: localStorage.userid
    },
		async : false,
		error : function(request){
		},
		success : function(data){
      // alert(data);
      if(data){
        var data = JSON.parse(data);
        result = data.infoList;
      }
		}
	});
  return result;
}

//获取当前时间，格式YYYY-MM-DD
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}

function checkNameOrDate(str){
  var reg = RegExp(/姓名/);
  if(!reg.test(str)){
    return false;
  }else{
    return true;
  }
}

function checksub(str){
  var reg = RegExp(/检查/);
  if(!reg.test(str)){
    return false;
  }else{
    return true;
  }
}

function finduidbyqid(qid){
	var result = "";
	$.ajax({
		type  : "POST",
		url   : path + "usingTemplate/findUidByQid.action",
		data  : {
      "qid": qid
    },
		async : false,
		error : function(request){
		},
		success : function(data){
      if(data){
        result = data;
      }
		}
	});
	return result;
}

function ref(){
  window.location.reload();
}

function findmessige(){
  var result = "";
	$.ajax({
		type  : "POST",
		url   : path + "messageFile/findMessageFileByUserId_form.action",
		data  : {
      "id": localStorage.uid
    },
		async : false,
		error : function(request){
		},
		success : function(data){
      if(data){
        var data =　JSON.parse(data)
        data.forEach(function(i){
          if(i.fileName){
            result = i.fileName;
          }
        })
      }
		}
	});
	return result;
}

function findimg(){
  var result = "";
	$.ajax({
		type  : "POST",
		url   : path + "usingTemplate/findImgPathByUId_form.action",
		data  : {
      "id": localStorage.uid
    },
		async : false,
		error : function(request){
		},
		success : function(data){
      if(data){
        var data =　JSON.parse(data)
        result = data;
      }
		}
	});
	return result;
}
