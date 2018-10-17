apiready= function(){
  islogin();
  issignout();
  var headerH = $api.byId('header');
  // $api.fixStatusBar(header);
  var navH = $api.byId('nav');
  headerH = $api.offset(header).h;
  navH = $api.offset(nav).h;
  var footerH = $api.byId('footer');
  footerH = $api.offset(footer).h;
  menus = $api.domAll(nav, ".menu");
  var frames = [];
  for(var i=0; i<menus.length; i++){
    frames.push(
      {
        name: "taskmain_frame_" + i,
        url: "html/task/taskmain_frame.html",
        pageParam:{
          status: i
        }
      }
    );
  }

  api.openFrameGroup ({
      name: 'task',
      scrollEnabled: true,
      rect: {
           x: 0,
           y: headerH + navH,
           w: 'auto',
           h: api.winHeight - footerH - headerH - navH
      },
      index: 0,
      frames: frames
  }, function(ret, err){
      fnSetNavMenusSelect(ret.index);
  });
}

var menus;
function fnSetNavMenusSelect(index_){
  // alert(index_ + "==" + menus.length);

  for(var i=0;i<menus.length;i++){
// alert(i + "==" + index_);
    if(i === index_){
      // alert("same");
      $api.addCls(menus[i], 'selected');
    }else{
      // alert("no");
      $api.removeCls(menus[i], 'selected');
    }
  }
}

function setNavMenusIndex(index_){
  api.setFrameGroupIndex({
      name: 'task',
      index: index_,
      scroll: true
  });
}

function scanning(){
  api.closeFrame({
      name: 'task'
  });
  api.openWin({
      name: 'taskscanning',
      url: 'html/scanning/taskscanning.html',
      pageParam: {
          name: 'test'
      }
  });
}
