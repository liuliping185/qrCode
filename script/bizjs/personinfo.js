// $(function(){
// $("#id").val(6);
// // getUserInfo();
// })

apiready = function(){
  var headerH = $api.byId('header');
  headerH = $api.offset(header).h;
  api.openFrame({
      name: 'personinfo_frame',
      url: 'personinfo_frame.html',
      rect: {
          x: 0,
          y: headerH,
          w: "auto",
          h: api.winHeight - headerH
      },
      pageParam: {
          name: 'test'
      },
      bounces: true,
      bgColor: 'rgba(0,0,0,0)',
      vScrollBarEnabled: true,
      hScrollBarEnabled: true
  });

}

function getUserInfo(){
  $.post(path + "userinfo/findUserInfoById.action",{
      userid:localStorage.userid
  },function(data){
    alert(data);
    console.log(data);
  })
}

function save(){
  console.log($("#info").serialize());

  $.ajax({
    type  : "POST",
    url   : path + "userinfo/updateUserInfo.action",
    data  : $("#info").serialize(),
    async : false,
    error : function(request){
    },
    success : function(data){
      console.log(data);
    }
  });

}
