apiready = function(){
  islogin();
  issignout();
  var headerH = $api.byId('header');
  headerH = $api.offset(header).h;
  var footerH = $api.byId('footer');
  footerH = $api.offset(footer).h;
  api.openFrame({
      name: 'datum_frame',
      url: 'html/datum/datum_frame.html',
      rect: {
          x: 0,
          y: headerH,
          w: "auto",
          h: api.winHeight - footerH - headerH
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

// $(function(){
//   getContant();
// })

function getContant(){
  $.post( path + "messageFile/findMessageFileByUserId.action",{
      userid: localStorage.userid
  },function(data){
    if(data){
    // alert(localStorage.userid);
        // alert(data);
      console.log(data);
        var data = JSON.parse(data);

        var lineList = "";
        data.forEach(function(i){
          lineList += "<div class='e_lineList'>";
          lineList += "<div class='lineinfo')>";
          lineList += "<strong><a href='" + i.webname + "'>";
          if(25 < i.oldname.length){
            lineList += i.oldname.substring(0,25) + "...";
          }else{
            lineList += i.oldname;
          }
          lineList += "</a></strong>";
          lineList += "</div>";
          lineList += "<div class='line'></div>";
          lineList += "<div class='lineinfo'>发布人：" + i.uploaduser + "</div>";
          lineList += "<div class='line'></div>";
          lineList += "<div class='lineinfo'>创建时间：" + i.uploaddate+ "</div>";
          lineList += "</div>";
        })

        $("#lineList").html(lineList);
    }
  })
}

// function aaa(con){
//   alert(con);
//   window.location.href=con;
// }

function scanning(){
  // api.closeFrame({
  //     name: 'datum_frame'
  // });
  api.openWin({
      name: 'datumscanning',
      url: 'html/scanning/datumscanning.html',
      pageParam: {
          name: 'test'
      }
  });
}
