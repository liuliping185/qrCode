// function modifypassword(){
//   window.location.href="modifypassword.html";
// }

apiready = function(){
  var headerH = $api.byId('header');
  headerH = $api.offset(header).h;
  api.openFrame({
      name: 'modifypassword_frame',
      url: 'modifypassword_frame.html',
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
