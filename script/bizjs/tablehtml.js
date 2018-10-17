var userinfo = getuserinfo();
var curDate = getNowFormatDate();

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



function ready(){
  // 给btn加隐藏属性
  $("button").attr("class","hiddenbtn");
  //状态
  var td = $("td").find("select");

  for(var i=0;i<$(td).length;i++){
    // alert($(td).eq(i).parent().attr("qx"))
    if("dx" != $(td).eq(i).parent().attr("qx")){
        $("td[qx!='dx']").find("select").prev().css("display","block");
        $("td[qx!='dx']").find("select").css({
          "display":"none"
        });
        $("td[qx!='dx']").find("select").html("");
    }else{
      $("td[qx='dx']").find("select").prev().css("display","none");
      $("td[qx='dx']").find("select").css("display","block");
    }
  }


  $(td).css({
    "display":"block",
    "font-size":"14px",
    "margin-left":"20px"
  });

  if($(td).length != 0){
      for(var i=0;i<$(td).length;i++){
          if($(td).eq(i).prev().html()){
            // alert($(td).eq(i).prev().html());
              $(td).eq(i).val($(td).eq(i).prev().html());

          }
          if($(td).eq(i).val()){
              $(td).eq(i).prev().html($(td).eq(i).val());
          }
      }
  }

  var sx1 = $("td[b=1]")//.hasClass("q") ;
  // 检测是哪种表格
  var templatetype = $("table").eq(0).attr("templatetype");
  // alert(templatetype);
  var flag = 0;
  for(var i=0;i<sx1.length;i++){
    var info = $(sx1).eq(i).html();
    // alert($(sx1).eq(i).attr("q"));
    // 找到前置为第一个的按钮显示
    if(!$(sx1).eq(i).attr("q")){
      if(false == checkNameOrDate(info)){
        if(1 == templatetype){
          $(sx1).eq(i).html("<button class='hiddenbtn' onclick='zijian(this,1)'>检查</button>");
        }else if(2 == templatetype){
          $(sx1).eq(i).html("<button class='hiddenbtn' onclick='zijian(this,2)'>检查</button>");
        }else{
          $(sx1).eq(i).html("<button class='hiddenbtn' onclick='zijian(this,1)'>检查</button>");
        }
      }
    }else{
      flag ++;
    }
  }
}


function zijian(own,type){
  var msg = "确认检查吗？\n\n请确认！";
 if (confirm(msg)==true){

   switch (Number(type)) {
     case 1:
         if(0 === $("td[sx=1][b!=1]").length){
             $("table").eq(0).find("td[qx='dx']").attr("userid",localStorage.userid);
             $("table").eq(0).find("td[qx='dx']").html();
             for(var i=0;i<$("table").eq(0).find("td[qx='dx']").length;i++){
               if("" == $("table").eq(0).find("td[qx='dx']").eq(i).html()){
                //  $("table").eq(0).find("td[qx='dx']").eq(i).html("（请编辑）")//<span class='editword'></span>
               }
             }
         }

         var q = $(own).parent().attr("q");
         var sx = $(own).parent().attr("sx");

        // 判断下一个顺序的前一个按钮被点击
        var beforbtnisselect = $("td[q=" + sx + "]").prev().prev().html();
        if(true == checkNameOrDate(beforbtnisselect)){
             $("td[q=" + sx + "]").html("<button class='hiddenbtn' onclick=zijian(this,'" + type + "')>检查</button>");
             $("td[q=" + sx + "]").parent().attr("qx","dx");
        }else{
          if(!$("td[q=" + sx + "]").prev().prev().attr("b")){
             $("td[q=" + sx + "]").html("<button class='hiddenbtn' onclick=zijian(this,'" + type + "')>检查</button>");
             $("td[q=" + sx + "]").parent().attr("qx","dx");
          }
        }

         // 让下一个按钮显示，并且该状态可以读写
         $(own).parent("td").next().next().html("<button class='hiddenbtn' onclick=zijian(this,'" + type + "')>检查</button>");
         $(own).parent("td").next().attr("qx","dx");

         // 把本按钮的标识设为不可见，并给td显示姓名日期
         $(own).parent("td").attr("b","-1");


        //  // 如果上一个按钮td有姓名、日期，上的状态变为只读
         var beforbtn = $(own).parent("td").prev().prev().html();
         if(true == checkNameOrDate(beforbtn)){
           $(own).parent("td").prev().attr("qx","d");
           $(own).parent("td").prev().prev().prev().attr("qx","d");
         }
           //给td显示姓名日期，写在最下面是因为赋值玩，this就没了
          let username = "无";
          if(userinfo.userName){
            username = userinfo.userName;
          }
          $(own).parent("td").html("<div style='text-align:left;'>姓名:<br>" + username + "<br>日期:<br>" + curDate +"</div>");
       break;
       case 2:
           if(0 === $("td[sx=1][b!=1]").length){
               $("table").eq(1).find("td").eq(1).attr("userid",localStorage.userid);
               $("table").eq(1).find("td").eq(3).attr("userid",localStorage.userid);
               $("table").eq(1).find("td").eq(5).attr("userid",localStorage.userid);
               $("table").eq(1).find("td").eq(8).attr("userid",localStorage.userid);
           }

           var q = $(own).parent().attr("q");
           var sx = $(own).parent().attr("sx");

           // 把本按钮的标识设为不可见，并给td显示姓名日期
           $(own).parent("td").attr("b","-1");
            // 如果上一个按钮td有姓名、日期，上的状态变为只读

            var beforbtn = $(own).parent("td").parent("tr").prev("tr").children("td").eq(2).html();
            if(false == checksub(beforbtn)){
               $(own).parent("td").parent("tr").prev("tr").children("td").eq(1).attr("qx","d");
               $(own).parent("td").parent("tr").prev("tr").children("td").eq(3).attr("qx","d");
               $(own).parent("td").parent("tr").prev("tr").children("td").eq(4).attr("qx","d");
               $(own).parent("td").parent("tr").prev("tr").children("td").eq(5).attr("qx","d");
            }

            username = "无";
            if(userinfo.userName){
              username = userinfo.userName;
            }

            var ptd = $(own).parent("td");
            $(ptd).html(username);
            $(ptd).next().next().html(curDate);
       break;
       case 3:
           if(0 === $("td[sx=1][b!=1]").length){
               $("table").eq(0).find("td[onlyuser='']").attr("userid",localStorage.userid);
               for(var i=0;i<$("table").eq(0).find("td[onlyuser='']").length;i++){
                 if("" == $("table").eq(0).find("td[onlyuser='']").eq(i).html()){
                   $("table").eq(0).find("td[td[onlyuser='']").eq(i).html("（请编辑）")//<span class='editword'></span>
                 }
               }
           }
           var q = $(own).parent().attr("q");
           var sx = $(own).parent().attr("sx");

          // 判断下一个顺序的前一个按钮被点击
          var beforbtnisselect = $("td[q=" + sx + "]").prev().prev().html();
          if(true == checkNameOrDate(beforbtnisselect)){
             $("td[q=" + sx + "]").html("<button class='hiddenbtn' onclick=zijian(this,'" + type + "')>检查</button>");
             $("td[q=" + sx + "]").parent().attr("qx","dx");
          }else{
            if(!$("td[q=" + sx + "]").prev().prev().attr("b")){
              $("td[q=" + sx + "]").html("<button class='hiddenbtn' onclick=zijian(this,'" + type + "')>检查</button>");
              $("td[q=" + sx + "]").parent().attr("qx","dx");
            }
          }

           // 让下一个按钮显示，并且该状态可以读写
           $(own).parent("td").next().next().html("<button class='hiddenbtn' onclick=zijian(this,'" + type + "')>检查</button>");
           $(own).parent("td").next().attr("qx","dx");

           // 把本按钮的标识设为不可见，并给td显示姓名日期
           $(own).parent("td").attr("b","-1");

          //  // 如果上一个按钮td有姓名、日期，上的状态变为只读
           var beforbtn = $(own).parent("td").prev().prev().html();
           if(true == checkNameOrDate(beforbtn)){
             $(own).parent("td").prev().attr("qx","d");
             $(own).parent("td").prev().prev().prev().attr("qx","d");
             if(!$(own).parent("td").prev().prev().prev().prev().attr("b")){
               $(own).parent("td").prev().prev().prev().prev().attr("qx","b");
             }
           }
             //给td显示姓名日期，写在最下面是因为赋值玩，this就没了
            username = "无";
            if(userinfo.userName){
              username = userinfo.userName;
            }

            $(own).parent("td").html("<div style='text-align:left;'>姓名:<br>" + username + "<br>日期:<br>" + curDate +"</div>");
       break;
     default:

   }
    saveTableHtml();
  return true;
 }else{
  return false;
 }
}

function test(){
  var result = false;
  var toast = new auiToast();
  toast.loading({
    title:"正在加载",
    duration:2000
  },function(ret){
    setTimeout(function(){
  $.ajax({
		type  : "POST",
		url   : path + "usingTemplate/findFormTemplateQrCodeByQId.action",
		data  : {
      "qid": localStorage.qid
    },
		async : false,
		error : function(request){
      toast.fail({
        title:"加载失败",
        duration:2000
      })
		},
		success : function(data){
      if(data){
        toast.success({
          title:"加载成功",
          duration:2000
        })

        toast.hide();

        result = true;
        // alert(data);
            var data = JSON.parse(data);

            let info = "";
            info += "<div id='btn'>";
            info += "<div class='aui-btn aui-btn-success aui-btn-block aui-btn-sm btnindiv' style='margin-left:45%;background-color:#03aaf4;height:3rem;line-height:3rem;font-size:18px;' tapmode onclick='saveTableHtml()'>";
            info += "<span>保&nbsp;&nbsp;存</span>";
            info += "</div>";
            info += "</div>";
            $("#info").html(data.info)
            $("#savebtn").html(info)

            let usingTemplate = finduidbyqid(localStorage.qid)
            usingTemplate = JSON.parse(usingTemplate)

            if(4 == localStorage.uType){
              $("center").css({
                "border":"1px solid #9d9d9d",
                "margin-right":"2rem",
                "width":"90%",
                "margin-top":"10%"
              })


              $("#info").css({
                "width":"140%"
              })

              checktablehavacuruser()

              $(".btnindiv").css("margin-left","25%")

              if(3 != usingTemplate.info.status){
                var username = "";
                if(userinfo.userName){
                  username = userinfo.userName;
                }
                $("table tr:last").find("td").eq(1).html(username);
                $("table tr:last").find("td").eq(3).html(curDate);
              }

              $("table").eq(0).find("td").css({
                "font-size":"1.8rem",
                "height": "30"
              })

              $("table").eq(1).css("margin-top","30px")
              $("table").eq(1).find("td").css({
                "font-size":"1.3rem",
                "margin-top":"1rem",
                "height":"35"
              })

              if(3 == usingTemplate.info.status && localStorage.userid != $("table").eq(0).attr("userid")){
                $("table").eq(1).find("td").find("input").css({
                  "font-size":"1.3rem",
                  "border":"0px solid #fff",
                  "margin-bottom":"0.5rem",
                  "margin-top": "0.5rem",
                  "margin-left":"1rem",
                  "border-radius":"5px",
                  "width":"12rem"
                })

                $("table").eq(1).find("td").find("input").attr("class","words")
              }else{
                $("table").eq(1).find("td").find("input").css({
                  "font-size":"1.3rem",
                  "border":"1px solid #9d9d9d",
                  "margin-bottom":"0.5rem",
                  "margin-top": "0.5rem",
                  "margin-left":"1rem",
                  "border-radius":"5px",
                  "width":"12rem"
                })
                $("table").eq(1).find("td").find("input").attr("class","words")
              }

              $("table").eq(2).find("td").css({
                "font-size":"1.3rem",
                "height":"70"
              })

              $("table").eq(2).find("td").find("input").attr("class","words")
              // $("table").eq(2).find("tr").css("height","100")
              $("table").eq(2).find("td").find("input").css("font-size","1.3rem")
                // $("table tr:last").css("padding-top","3rem")
                var arrowids
                if($("#imgarrow").attr("src")){
                  // if(3 == usingTemplate.info.status && localStorage.userid != $("table").eq(0).attr("userid")){
                  //   $("#arrowdiv").html("<img id='imgarrow' style='width:1.5rem;height:1.5rem' src='" + $("#imgarrow").attr("src") + "'/>")
                  // }else{
                    $("#arrowdiv").html("<img id='imgarrow' onclick='changeselect()' style='width:1.5rem;height:1.5rem' src='" + $("#imgarrow").attr("src") + "'/>")
                  // }

                }else{
                  $("td").each(function(){
                      if($(this).attr("selectimg")){
                          arrowids = $(this).attr("selectimg")
                          let arrowarr = getArrowArrByIds(arrowids)
                          if(arrowarr && arrowarr.length >0 ){
                            let selectinfo = ""
                            selectinfo += "<div id='arrowdiv'>"
                            selectinfo += "<select id='arrow' style='font-size:1.3rem;'>"
                            selectinfo += "<option value=''>请选择箭头方向---</option>"
                            arrowarr.forEach(function(i){
                                selectinfo += "<option value='" + i.imgpath + "'>" + i.wordarrow + "</option>"
                            })
                            selectinfo += "</select>"
                            selectinfo += "</div>"
                            $(this).html(selectinfo)
                          }
                      }
                  })
                }

            }else if(5 == localStorage.uType){
              checktablehavacuruser()

              $("center").css({
                "border":"1px solid #9d9d9d",
                "margin-right":"2rem",
                "width":"90%",
                "margin-top":"10%"
              })

              $("#info").css({
                "width":"140%"
              })

              $(".btnindiv").css("margin-left","25%")

                $("table").eq(0).find("td").css({
                  "font-size":"1.8rem",
                  "height":"40",
                  "margin-bottom": "5rem;"
                })

                $("table").eq(1).css("margin-top","3rem")
                $("table").eq(1).find("td").css({
                  "font-size":"1.3rem",
                  "height":"30"
                })

                  $("input[class='words']").each(function(){
                      if(!$(this).attr("hidden")){
                        if(3 == usingTemplate.info.status && localStorage.userid != $("table").eq(0).attr("userid")){
                          $(this).css({
                            "font-size":"1.3rem",
                            "border":"0px solid #fff",
                            "border-radius":"5px",
                            "padding-left":"1rem",
                            "margin-bottom":"2rem"
                          })
                          $(this).attr("class","words")
                        }else{
                          $(this).attr("class","words")
                          $(this).css({
                            "font-size":"1.3rem",
                            "border":"1px solid #9d9d9d",
                            "border-radius":"5px",
                            "padding-left":"1rem",
                            "margin-bottom":"2rem"
                          })
                        }
                      }else{
                        $(this).val("")
                      }
                  })
            }else if(6 == localStorage.uType){
              checktablehavacuruser()
              $("center").css({
                "border":"1px solid #9d9d9d",
                "margin-right":"2rem",
                "width":"90%",
                "margin-top":"10%"
              })

              $("#info").css({
                "width":"140%"
              })

              $(".btnindiv").css("margin-left","25%")

              $("table").eq(1).css({
                "margin-top":"3rem",
                "margin-bottom":"3rem"
              })

              $("td").css({
                "font-size":"1.3rem",
                "height":"30"
              })

              $("input").css({
                "font-size":"1.3rem",
                "margin-bottom":"0.5rem",
                "margin-top":"0.5rem"
              })

              $("input[class='words']").each(function(){
                  if(!$(this).attr("hidden")){
                    if(3 == usingTemplate.info.status){// && localStorage.userid != $("table").eq(0).attr("userid")
                      $(this).css({
                        "font-size":"1.3rem",
                        "border":"0px solid #fff",
                        "border-radius":"5px",
                        "padding-left":"1rem"
                      })
                        $(this).attr("class","words")
                    }else{
                        $(this).attr("class","words")
                      $(this).css({
                        "font-size":"1.3rem",
                        "border":"1px solid #9d9d9d",
                        "border-radius":"5px",
                        "padding-left":"1rem"
                      })
                    }

                  }else{
                    $(this).val("")
                  }
              })
            }
            ready();
      }else{
        toast.fail({
          title:"加载失败",
          duration:2000
        })
      }
		}
	});
}, 500)
})

return result;
}

function changeselect(){
  $("td").each(function(){
      if($(this).attr("selectimg")){
          arrowids = $(this).attr("selectimg")
          let arrowarr = getArrowArrByIds(arrowids)
          if(arrowarr && arrowarr.length >0 ){
            let selectinfo = ""
            selectinfo += "<div id='arrowdiv'>"
            selectinfo += "<select id='arrow' style='font-size:1.3rem;'>"
            selectinfo += "<option value=''>请选择箭头方向---</option>"
            arrowarr.forEach(function(i){
                selectinfo += "<option value='" + i.imgpath + "'>" + i.wordarrow + "</option>"
            })
            selectinfo += "</select>"
            selectinfo += "</div>"
            $(this).html(selectinfo)
          }
      }
  })
}

function checktablehavacuruser(){
  // alert(localStorage.uType + "===" + usingTemplate.info.status)
  if(6 == localStorage.uType){
    if(3 == usingTemplate.info.status){
      // $("#savebtn").html("")
      $("input").attr("readonly","readonly")
      $("input").css({
        "border":"1px solid #fff"
      })
      $("#btn").html("已完成");
      $("#btn").css({
        "width":"150%",
        "text-align": "center",
        "color": "#ff0000"
      })

    }
  }else{
    if(3 == usingTemplate.info.status && localStorage.userid != $("table").eq(0).attr("userid")){
      $("#savebtn").html("")
      $("input").attr("readonly","readonly")
      $("input").css({
        "border":"1px solid #fff"
      })
    }
  }
  return
}

function getArrowArrByIds(arrowids){
  var result = false;
  $.ajax({
    type  : "POST",
    url   : path + "arrow/getArrowArrByIds.action",
    data  : {
      ids : arrowids
    },
    async : false,
    error : function(request){

    },
    success: function(data){
      if(data){
        var data = JSON.parse(data);
        result = data.info;
      }
    }
  })
  return result;
}

$("body").delegate("td","click",function(){
   var tdObj = $(this);
   var preText = tdObj.html();
   var b = $(this).attr("b");
   var q = $(this).attr("q");
   var sx = $(this).attr("sx");
   var qx = $(this).attr("qx");

   var userid = $(this).attr("userid");
   // 1,判断是否是按钮
     // 1.1,如果是按钮
    // 1.2,如果不是按钮
        if(1 != b && "dx" == qx && (!userid || userid == localStorage.userid)
          && false == $(this).find("select").is("select") ){
          //得到当前文本内容
          var inputObj = $("<textarea id='aa' type='text'></textarea>");
          //创建一个文本框元素
          tdObj.html(""); //清空td中的所有元素
          inputObj
           .width(tdObj.width())
           //设置文本框宽度与td相同
           .height(tdObj.height())
           .css({border:"0px",fontSize:"17px",font:"宋体"})
           .val(preText)
           .appendTo(tdObj)
           //把创建的文本框插入到tdObj子节点的最后
           .trigger("focus")
           //用trigger方法触发事件
           .trigger("select");
           //已进入编辑状态后，不再处理click事件
           inputObj.click(function(){
            return false;
           });

           $("textarea").blur(function(){
             var text = $(this).val();
              tdObj.html(text);
           });
        }
});

//状态改变时
$("body").delegate("select","change",function(){
    var obj = $(this).find("option:selected").val();
    $(this).prev("span").html(obj);
    $(this).prev("span").css("display","none");
});


  function cheangelogofile(){

  }
