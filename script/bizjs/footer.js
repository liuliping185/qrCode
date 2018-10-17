// 随意切换按钮
function randomSwitchBtn( tag,mineUrl ) {
      api.closeFrame;

  if(mineUrl){
    // window.location.href=mineUrl;
      api.openWin({
        name : "myInfo",
        url : mineUrl,
        animation:{
            type:"movein",                //动画类型（详见动画类型常量）
            subType:"from_right",       //动画子类型（详见动画子类型常量）
            duration:300                //动画过渡时间，默认300毫秒
        }
      });
  }
 }
