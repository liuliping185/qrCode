var ismore = GetQueryString("ismore");

apiready = function(){
  // issignout();
  // $("#footer").html("sdada");

  check();
  var headerH = $api.byId('header');
  // $api.fixStatusBar(header);
  var navH = $api.byId('nav');
  headerH = $api.offset(header).h;
  // var footerH = $api.byId('footer');
  // footerH = $api.offset(footer).h;
  navH = $api.offset(nav).h;
  menus = $api.domAll(nav, ".menu");
  var frames = [];
  for(var i=0; i<menus.length; i++){
    frames.push(
      {
        name: "showtask_frame_" + i,
        url: "showtask_frame.html",
        pageParam:{
          status: i
        },
        scaleEnabled:true
      }
    );
  }

  var apiy = headerH + navH
  if(4 == localStorage.uType || 5 == localStorage.uType || 6 == localStorage.uType){
    apiy = headerH
  }

  if(3 == localStorage.uType){
    if(!localStorage.messige || !localStorage.img){
      apiy = headerH
    }
  }

  api.openFrameGroup ({
      name: 'showtaskgroup',
      scrollEnabled: true,
      rect: {
          x: 0,
          y: apiy,
          w: 'auto',
          h: api.winHeight - headerH - navH
      },
      index: 0,
      frames: frames,
      preload: 1
  }, function(ret, err){
      fnSetNavMenusSelect(ret.index);
  });

  hiddenscoll();
  api.parseTapmode();
}

function hiddenscoll(){
  // var footerH = $api.byId('footer');
  // footerH = $api.offset(footer).h;
  api.openFrame({
      name: 'hiddenscoll',
      url: 'hiddenscoll_frame.html',
      rect: {
          x: 0,
          y: api.winHeight - 20,
          w: "auto",
          h: 20
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

function check(){
  var info = "";
  if(1 == localStorage.uType){
    // var name = localStorage.qname;
    // if(12 < name.length){
    //   name = name.substring(0,12) + "..."
    // }
    // var headerinfo = "";
    // headerinfo += "<h1>" + name + "</h1>";
    // headerinfo += "<div class='left' tapmode onclick='closeWin()'></div>";
    // $("#header").html(headerinfo);
    info += "<div class='menu selected' tapmode onclick='setNavMenusIndex(0)''>";
    info += "任务内容";
    info += "</div>";
    info += "<div class='menu' tapmode onclick='setNavMenusIndex(1)'>";
    info += "项目文件";
    info += "</div>";
  }

  if(2 == localStorage.uType  || 7 == localStorage.uType){
    // var name = localStorage.qname;
    // if(12 < name.length){
    //   name = name.substring(0,12) + "..."
    // }
    // var headerinfo = "";
    // headerinfo += "<h1>" + name + "</h1>";
    // headerinfo += "<div class='left' tapmode onclick='closeWin()'></div>";
    // $("#header").html(headerinfo);
    info += "<div class='menu selected' tapmode onclick='setNavMenusIndex(0)''>";
    info += "任务内容";
    info += "</div>";
    info += "<div class='menu' tapmode onclick='setNavMenusIndex(1)'>";
    info += "项目简介";
    info += "</div>";
    info += "<div class='menu' tapmode onclick='setNavMenusIndex(2)''>";
    info += "项目图片";
    info += "</div>";
    info += "<div class='menu' tapmode onclick='setNavMenusIndex(3)'>";
    info += "项目文件";
    info += "</div>";
  }

  if(3 == localStorage.uType){
    var headerinfo = "";
    headerinfo += "<h1>企业概况</h1>";
    headerinfo += "<div class='left' tapmode onclick='closeWin()'></div>";
    $("#header").html(headerinfo);

    if(!localStorage.messige || !localStorage.img){
      info += "<div class='menu' tapmode onclick='setNavMenusIndex(0)''>";
      info += "";
      info += "</div>";
    }else{
      info += "<div class='menu selected' tapmode onclick='setNavMenusIndex(0)''>";
      info += "项目介绍";
      info += "</div>";
      info += "<div class='menu' tapmode onclick='setNavMenusIndex(1)'>";
      info += "项目文件";
      info += "</div>";
    }

  }

  if(4 == localStorage.uType || 5 == localStorage.uType || 6 == localStorage.uType){
    info += "<div class='menu' tapmode onclick='setNavMenusIndex(0)''>";
    info += "";
    info += "</div>";
  }
  $("#nav").html(info);
}

var menus;
function fnSetNavMenusSelect(index_){
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
      name: 'showtaskgroup',
      index: index_,
      scroll: true,
      reload: true
  });
}

// $(function(){
//     getContant(1);
//     $("#qid").val(localStorage.qid);
// })

var flag = 0;

function getContant(con){
  flag ++;
// alert(localStorage.qid);
  if(1 == con){
    $.post(path + "usingTemplate/findUsingTemplateFile.action",{
        uid: localStorage.uid
    },function(data){
        // alert(data);
        if(data){
          var data = JSON.parse(data);
          var file = "";
          data.forEach(function(i){
              file += "<a class='filename' href='" + i.fileName + "'>" + i.oldName + "</a>";
          })

          $("#file").html(file);
        }
    })
  }else{
    $("#file").html("");
  }

  $.post(path + "usingTemplate/findUsingTemplateDetailById.action",{
      id: localStorage.qid
  },function(data){
    // alert(data);

        var data = JSON.parse(data);
        // alert((flag-1) + "==" + data.infoList.length);
        console.log(data);

        if(!ismore && 2 == data.type){
            // localStorage.setItem("uid",data.id);
            window.location.href="../../html/three/threeindex.html";

            return;
        }

        var infoarea = "";
        infoarea += "<form id='info'>"
        var flag = 0;
        infoarea += "<input name='userid' hidden='true' value='" + localStorage.userid + "'/>";
        data.infoList.forEach(function(i){
          // infoarea += "<input id='ufid' name='ufid' hidden='true' value='";
          // // alert(i.info.contant.ufid);
          // if(i.info.ufname.usingTemplateField.id){
          //   infoarea += i.info.ufname.usingTemplateField.id;
          // }
          // infoarea += "'/>";

          flag ++;
        if(!i.stage || con === i.stage.sort){

          infoarea += "<input id='stageid' name='stageid' hidden='true' value='";

           if(i.stage){
             infoarea += i.stage.id;
           }
           infoarea += "'/>";
          // infoarea += "<input name='username' hidden='true' value='" + localStorage.username + "'/>";
          infoarea += "<input name='status' class='status' hidden='true' value='";
          if(i.stage){
            infoarea += i.stage.status;
          }
          infoarea += "'/>";

            if(i.stage){
                $("#check").html(i.stage.stageName);
            }

            if(i.info){
                infoarea += "<input id='uid' name='uid' hidden='true' value='" + i.contant.id + "'/>";
                $(".title").html(i.contant.u_title);
                // infoarea += "<input id='ufid' name='ufid' hidden='true' value='" + i.info.contant.uf_id + "'/>";

                i.info.ufname.forEach(function(j){

                  infoarea += "<div class='e_info'>";

                  if("button" != j.type){
                      infoarea += "<div class='t_left'>" + j.name + "</div>";
                  }

                  switch (j.type) {
                    case "input":
                    // alert(j.name);
                      if("姓名" ==  j.name  || "日期" == j.name){
                        // if("姓名" ==  j.name){
                        infoarea += "<input class='inputinfo' readonly='true' name='";
                      }else{
                        infoarea += "<input class='inputinfo' name='";
                      }
                            if(j.usingTemplateField &&  j.usingTemplateField.id){
                              infoarea += j.usingTemplateField.id;
                            }
                            infoarea += "' type='test' value='";
                            if(j.usingTemplateField  &&  j.usingTemplateField.qr_ufvalue){
                              infoarea += j.usingTemplateField.qr_ufvalue;
                            }
                             infoarea += "'/>";

                      break;
                    case "select":

                        infoarea += "<select class='selectinfo' name='";
                        if(j.usingTemplateField &&  j.usingTemplateField.id){
                          infoarea += j.usingTemplateField.id;
                        }
                        infoarea += "'>";
                        j.value.forEach(function(l){
                          infoarea += "<option>";
                          infoarea += l;
                          infoarea += "</option>";
                        })
                        infoarea += "</select>";
                      break;
                      case "button":
                        if("提交" == j.name){

                          infoarea += "<div id='btn_left'><div class='btnleft' onclick=submitBtn(" + i.stage.sort + ",";
                          if(i.info.stageQrValue){
                            infoarea += i.info.stageQrValue.id;
                          }else{
                            infoarea += "0"
                          }
                          infoarea += ",'" + j.name + "',";
                        if(i.info.stageQrValue){
                          infoarea += i.info.stageQrValue.status;
                        }else{
                          infoarea +="0";
                        }
                      infoarea +=")><span class='btnword'>" + j.name + "</span></div></div>";
                        }else{
                          infoarea += "<div id='btn_right'><div class='btnright' onclick=checkBtn(" + i.stage.sort  + ","; if(i.info.stageQrValue){
                            infoarea += i.info.stageQrValue.id;
                          }else{
                            infoarea += "0"
                          }
                          infoarea += ",'" + j.name + "',";
                        if(i.info.stageQrValue){
                          infoarea += i.info.stageQrValue.status;
                        }else{
                          infoarea +="0";
                        }
                      infoarea +=")><span class='btnword'>" + j.name + "</span></div></div>";
                        }

                          // infoarea += "<input style='background-color:green;color:#fff;width:4rem;height:2rem;border-radius:5px;' type='submit' value='" + j.name + "'/>";

                      break;

                      case "textarea":
                          infoarea += "<textarea class='textareainfo' name='";
                          if(j.usingTemplateField &&  j.usingTemplateField.id){
                            infoarea += j.usingTemplateField.id;
                          }else{
                            infoarea += j.usingTemplateField;
                          }
                          infoarea += "' type='test' value='";
                          if(j.usingTemplateField  &&  j.usingTemplateField.qr_ufvalue){
                            infoarea += j.usingTemplateField.qr_ufvalue;
                          }
                          infoarea += "'>";
                          if(j.usingTemplateField  &&  j.usingTemplateField.qr_ufvalue){
                            infoarea += j.usingTemplateField.qr_ufvalue;
                          }
                          infoarea += "</textarea>"
                      break;
                    default:
                  }

                  infoarea += "<div>";
                })

                // infoarea += "<div style='margin-top:2rem;'>";
                // // infoarea += "<div class='btnleft'><span class='btnword' onclick='save()'>保存</span></div>";
                // infoarea += "<div class='btnright' onclick='submitBtn(" + con + "," + i.stage + ")'><span class='btnword'>提交</span></div>";
                // infoarea += "<div>";



                infoarea += "<div id='stage'>";
                if(i.stage){
                  if(1 != i.stage.sort ){
                      infoarea += "<span id='beforstage' class='stagepage' onclick='beforstage(" + i.stage.sort  + ",";
                      if(i.info.stageQrValue){
                        infoarea += i.info.stageQrValue.status;
                      }else{
                        infoarea += -1;
                      }
                    infoarea += ")'><strong>上一阶段</strong></span>";
                  }
                }

                if(i.stage){
                  if(data.infoList.length != i.stage.sort){
                    infoarea += "<span id='nextstage' class='stagepage' onclick='nextstage(" + i.stage.sort  + ",";
                  if(i.info.stageQrValue){
                    infoarea += i.info.stageQrValue.status;
                  }else{
                    infoarea += -1;
                  }
                 infoarea += ")'><strong>下一阶段</strong></span>";
                  }
                }


                infoarea += "<div>";



                infoarea += "</form>"
            }

            infoarea += "<div id='checkinfo'>";

            if(i.info.stageQrValue){
              if(i.info.stageQrValue.overUserName){
                infoarea += "<div>";
                infoarea += "<span>检查人姓名：</span>";
                infoarea += "<span id='checkname'>" + i.info.stageQrValue.overUserName + "</span>";
                infoarea += "</div>";
              }

              if(i.info.stageQrValue.checkDate){
                infoarea += "<div>";
                infoarea += "<span>检查日期：</span>";
                infoarea += "<span id='checkdate'>" + i.info.stageQrValue.checkDate + "</span>";
                infoarea += "</div>";
              }
            }


            infoarea += "</div>";
            $("#infoarea").html(infoarea);
          }


        })
    })
}

function tijiao(){
  // console.log(status);
    var msg = "确认提交吗？";
    if (confirm(msg)==true){
      // $("#status").val("1");
      // var info = $("#allinfo").val().replace("&status=","&status=" + $("#status").val());
      // save(info);

      var jsfun = "tijiao('1');";
      api.execScript({
          frameName: 'showtask_frame_0',
          script: jsfun
      });
     return true;
    }else{
     return false;
    }



}

function jiancha(){
  // alert(status);
  var msg = "确认检查吗？";
  if (confirm(msg)==true){
    var jsfun = "tijiao('2');";
    api.execScript({
        frameName: 'showtask_frame_0',
        script: jsfun
    });
   return true;
  }else{
   return false;
  }
}

function saveTableHtml(){
  var jsfun = "saveTableHtml();";
  api.execScript({
      frameName: 'showtask_frame_0',
      script: jsfun
  });
}

function wancheng(){
  // alert(status);
  // var msg = "确认检查吗？";
  // if (confirm(msg)==true){
    var jsfun = "wancheng('3');";
    api.execScript({
        frameName: 'showtask_frame_0',
        script: jsfun
    });
  //  return true;
  // }else{
  //  return false;
  // }
}


function save(info){
  var result = false;

  // alert(info);
  $.ajax({
		type  : "POST",
		url   : path + "usingTemplate/updateUsingTemplate.action",
		data  : info,//serialize(),
		async : false,
		error : function(request){
		},
		success : function(data){
      if(data){
        result = true;
          alert("提交完毕！");
      }
		}
	});
  return result;
}

function setStatus(info,status,stagestatus){
  // alert(info);
  // alert(status + "===" + stagestatus);
  $("#allinfo").val(info);
  $("#status").val(status);
  if(status && !stagestatus){
    var footer = "";
    switch (status.toString()) {
      case "1":
        footer += "<div id='tijiaobtn' onclick='tijiao()'>";
        footer += "提交";
        footer += "</div>";
        footer += "<div id='jianchabtn' onclick='jiancha()'>";
        footer += "检查";
        footer += "</div>";
        $("#footer").html(footer);
        break;
      case "2":
      $("#footer").html("");
        break;
      case "3":
        break;
      default:
      footer += "<div id='footerbtn' onclick='tijiao()'>";
      footer += "提交";
      footer += "</div>";
      $("#footer").html(footer);
        break;
    }
  }else{
    if(stagestatus && 3 == stagestatus){
      var footer = "<div id='overbtn' style='background-color:#e4e4e4;'>";
      footer += "完成";
      footer += "</div>";
      $("#footer").html(footer);
    }else{
      var footer = "<div id='overbtn' style='background-color:#03aaf4;' onclick='wancheng()'>";
      footer += "完成";
      footer += "</div>";
      $("#footer").html(footer);
    }
  }
}
  //刷新首页页面
  function GoToRefresh(){
      var jsfun = "ref();";
      api.execScript({
          name: 'root',
          frameName: 'index_frame',
          script: jsfun
      });
  }

  //刷新任务frame1
  function GoToRefreshTask(){
      var jsfun = "ref();";
      api.execScript({
          name: 'root',
          frameName: 'taskmain_frame_0',
          script: jsfun
      });
  }

  //刷新任务frame2
  function GoToRefreshTask1(){
      var jsfun = "ref();";
      api.execScript({
          name: 'root',
          frameName: 'taskmain_frame_1',
          script: jsfun
      });
  }

  // 刷新任务页面win
  function GoToRefreshTaskWin(){
    var jsfun = "ref();";
    api.execScript({
        name: 'root',
        script: jsfun
    });
  }

  function closeWin(){
      GoToRefreshTask1();
      GoToRefreshTask();
      // GoToRefresh();
      GoToRefreshTaskWin();
      api.closeWin();
  }
