$(window).resize(function() {
  
  makeup();
  
});

$(window).load(function() {
  
  makeup();
  
});
      

$(window).scroll(function () {
  
  makeup();
  
});

$(document).ready(function () {

  makeup();

});

function makeup () {
  var slidePics = $(".main-section-1 .pic img, .main-section-3 .pic img");
  slidePics.each(function() {
    $(this).css("width","100%").css("height","auto").css("margin-top",0);
    //$(".main-section-1 .pic").css("margin-left",0);
    if ($(this).height() < $(this).parents(".main-section").height()) {
      $(this).css("width","auto").css("height",$(this).parents(".main-section").height());
    } else {
      var ml = ($(window).width() - 1920)*100/640;
      if (ml < 0) ml = 0;
      $(this).css("margin-top",-($(this).height()-$(this).parents(".main-section").height())/2);
      $(".main-section-1 .pic img").css("width",$(".main-section-1 .pic img").width() + ml);
    }
  });
  
  var headerPic = $(".header-bg img");
  
  headerPic.css("width","100%").css("height","auto").css("margin-top",0)
  if (headerPic.height() < headerPic.parents(".header-bg").height()) {
    headerPic.css("width","auto").css("height",headerPic.parents(".header-bg").height());
  } else {
    headerPic.css("margin-top",-(headerPic.height()-headerPic.parents(".header-bg").height())/2);
  }
  
}