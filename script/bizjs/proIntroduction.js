$(function(){
  // alert(localStorage.uid);
  getIntroduction();
})

function getIntroduction(){

  $.post(path + "usingTemplate/findContent.action",{
      id: localStorage.uid
  },function(data){
    alert(localStorage.uid);
    if(data){
        var data = JSON.parse(data);
          console.log(data);
          $("#info").html(data.content);
    }

  })
}
