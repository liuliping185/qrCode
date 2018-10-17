apiready = function () {
  islogin();
  issignout();
  var footerH = $api.byId('footer');
  footerH = $api.offset(footer).h;
  api.openFrame({
      name: 'set_frame',
      url: 'html/set/set_frame.html',
      rect: {
          x: 0,
          y: 0,
          w: "auto",
          h: api.winHeight - footerH
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
