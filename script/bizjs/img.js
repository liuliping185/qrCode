$(function(){
  getImgPath();
})

function getImgPath(){
  $.post(path + "usingTemplate/findImgPathByUId.action",{
      id: localStorage.uid
  },function(data){
    if(data){
      // alert(data);
      var data = JSON.parse(data);
      console.log(data);
      var info = "";
      data.forEach(function(i){
        info += "<div class='imgblock'>";
        info += "<img onclick='seepic(this)' class='imgcss' src='" + i.i_name + "'/>";
        info += "</div>";
      })

      $("#info").html(info);
    }

  })
}

function seepic(con){
  // alert($(con).attr("src"));
  $(con).attr("src",$(con).attr("src"));
  $("#bigimg").attr("src",$(con).attr("src"));
  // $(".tipon").html(con);

  $('.helpmask').fadeIn(100);
	$('.tipon').slideDown(200);
}

function closebtn(){
  $('.helpmask').fadeOut(100);
  $('.tipon').slideUp(200);
}
