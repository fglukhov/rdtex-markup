$(window).resize(function() {
  $("body").css("width","");
  pupMakeup();
});

$(window).load(function() {
  $("body").css("width",$("body").width()-1).css("width",$("body").width()+1);
  $(".slider").each(function() {
    $(this).css("height",$(this).find("img").eq(0).height());
  });
  $(".article-pic").each(function() {
    $(this).css("width",$(this).find("img").width());
  });
  
  // Mainpage clients jcarousel
  
  $(".mainpage-clients .jcarousel").jcarousel({
    scroll:4,
    wrap:'circular',
    initCallback: mpcInit
  });
});

$(window).scroll(function() {
  if ($(".fixed-nav-placeholder").length) {
    if ($(".m-col").outerHeight(true) > $(".l-col").outerHeight(true)) {
      if ($(window).scrollTop() > parseInt($(".fixed-nav-placeholder").offset().top - 40)) {
        $(".fixed-nav-wrapper").addClass("nav-fixed").css({
          position: "fixed",
          top: 40
        });
        if ($(".fixed-nav-wrapper").offset().top >= $(".footer").offset().top - $(".fixed-nav-wrapper").outerHeight(true) - 50) {
          $(".fixed-nav-wrapper").addClass("nav-abs").removeClass("nav-fixed").css({
            position: "absolute",
            top: $(".m-col").outerHeight(true) - $(".fixed-nav-wrapper").outerHeight(true)
          });
        } 

        if ($(window).scrollTop() < $(".nav-abs").offset().top - 40) {
          $(".fixed-nav-wrapper").removeClass("nav-abs").addClass("nav-fixed").css({
            position: "fixed",
            top: 40
          });
        }
      } else {
        $(".fixed-nav-wrapper").removeClass("nav-fixed").css({
          position: "relative",
          top: "auto"
        });
      }
    } else {
      $(".fixed-nav-wrapper").removeClass("nav-fixed").css({
        position: "relative",
        top: "auto"
      });
    }
  }
});

$(document).ready(function () {

  if ($(".scrollable-cont").length) {
    $(".scrollable-cont").mCustomScrollbar({
      advanced:{
          updateOnContentResize: true,
          updateOnBrowserResize: true
      },
      set_height:$(window).height() - 100
    });
  }

  $(".video-wrapper .controlDiv").click(function() {
    $(this).parents(".video-wrapper").find(".v-cont").html("<iframe width='470' height='286' src='"+$(this).attr("vid")+"?autoplay=1' frameborder='0' allowfullscreen></iframe>");
    $(this).hide();
  })

  $(".section-menu li .link a").each(function() {
    newHtml = $(this).html().replace("ТЕЛЕКОММУНИКАЦИОННЫЕ","ТЕЛЕКОММУНИКА-ЦИОННЫЕ")
    $(this).html(newHtml);
  });

  if ($(".calc-form").length) {
    
    $(".calc-form select").change(function() {
      $(".calc-form div.button").removeClass("button-disabled");
      $(".calc-form .form-submit").prop("disabled",false);
    })
  
  }

  if ($(".event-request-form").length) {
    
    $(".event-request-form input:submit").prop("disabled",true);
    
    $(".event-request-form input:checkbox").on('ifChecked', function(event){
      $(".event-request-form input:submit").prop("disabled",false);
      $(".event-request-form div.form-submit").removeClass("button-disabled");
    });
    
    $(".event-request-form input:checkbox").on('ifUnchecked', function(event){
      var chAct = 0;
      $(".event-request-form input:checkbox").each(function() {
        if ($(this).prop("checked")) chAct = 1;
      });

      if (!chAct) {
        $(".event-request-form input:submit").prop("disabled",true);
        $(".event-request-form div.form-submit").addClass("button-disabled");
      }
    });
    
  }

  $(".main-menu li").on("mouseenter",function() {
    $(".main-menu li").removeClass("sm-act")
    var li = $(this);
    var link = $(this).find("a");
    var submenu = $(".submenu[rel='"+link.attr("rel")+"']");
    if ($(".submenu[rel='"+link.attr("rel")+"']").length) {
      $(this).addClass("sm-act")
    }
    if (link.attr("rel") && $(".submenu[rel='"+link.attr("rel")+"']").css("display") != "block") {
      $(".submenu").hide().removeClass("submenu-open");
      $(".submenu-item").hide();
      submenu.find(".submenu-item").eq(0).show();
      submenu.find(".submenu-links .item").removeClass("act");
      submenu.find(".submenu-links .item").eq(0).addClass("act");
      
      submenu.stop().fadeIn(250).addClass("submenu-open");
      
    }
  });
  
  $("body").mousemove(function() {
    $(".submenu-open").fadeOut(250).removeClass("submenu-open");
    $(".main-menu .sm-act").removeClass("sm-act")
  });
  
  $(".main-menu").on("mousemove","li.sm-act",function(e) {  
    e.stopPropagation();
  });
  
  $(".submenu").mousemove(function(e) {
    e.stopPropagation();
  });
  
  $(".submenu-links .item").hover(function() {
    
    if (!$(this).hasClass("act")) {
      $(".submenu-links .item").removeClass("act");
      $(this).addClass("act");
      
      $(".submenu-item").hide();
      $(".submenu-item[rel='"+$(this).attr("rel")+"']").fadeIn(250);
    }
  })
  if ($("#cv_file").length) {
    $("#cv_file").nicefileinput({ 
      label : 'Загрузить резюме'
    });
  }
  

  // Anchors nav

  $(".anchors-nav a").click(function() {
    $("body,html").animate({
      scrollTop: $("a[name="+$(this).attr("href").replace("#","")+"]").offset().top - 20
    },1000);
    return false;
  });
  
  // Calendar navigation
  
  $(".calendar-nav .year").click(function() {
    $(this).next(".monthes").slideToggle(250);
    $(this).toggleClass("expanded");
  })

  // $(":last-child").addClass("last-child");

  if ($(".categories-list").length) {
    $(".categories-list .row").each(function() {
      $(this).find(".categories-item").css("height",$(this).height() - 87)
    })
  }

  // Expandable blocks
  
  $(".expandable").each(function() {
    var trigger = $(this).find(".trigger");
    var expandable = $(this);
    trigger.click(function() {
      expandable.toggleClass("expandable-expanded")
      expandable.find(".expandable-content").slideToggle(250);
    })
  });

  if ($("input:checkbox").length) {
    $("input:checkbox").iCheck()
  }

  $(".slider").each(function() {
    var slider = $(this);
    $(this).find("img").eq(0).load(function() {
      slider.css("height",$(this).height());
    });
    
  });
  $(".article-pic").each(function() {
    var cont = $(this);
    $(this).find("img").load(function() {
     cont.css("width",$(this).width());
    });
  })

  // Tabbed content
  
  $(".tabbed-content").each(function() {
    var tabs = $(this).children(".tabs").find(".tab");
    var tabContents = $(this).children(".tabs-content").children(".tab-content");
    
    if (!tabs.hasClass("act")) {
      tabs.first().addClass("act");
    }
    
    tabContents.hide();
    tabContents.filter("[rel='"+tabs.filter(".act").attr("rel")+"']").show();
    
    tabs.click(function() {
      tabs.removeClass("act");
      $(this).addClass("act");
      
      window.location.hash = $(this).attr("rel");
      
      tabContents.hide();
      
      tabContents.filter("[rel='"+$(this).attr("rel")+"']").fadeIn(250)
      
    });
    
  
    if ($(this).find(".tabs-nav").length) {
      $(".tabbed-content").each(function() {
        var prev = $(this).find(".tabs-nav .prev");
        var next = $(this).find(".tabs-nav .next");
        
        var tabs = $(this).find(".tabs");
        
        if (tabs.find(".act").prev(".tab").length) {
          prev.show();
          prev.find("span").html(tabs.find(".act").prev(".tab").find("span").html());
        } else {
          prev.hide();
        }
        
        if (tabs.find(".act").next(".tab").length) {
          next.show();
          next.find("span").html(tabs.find(".act").next(".tab").find("span").html());
        } else {
          next.hide();
        }
        
        prev.click(function() {
          tabs.find(".act").prev(".tab").click();
          if (tabs.find(".act").prev(".tab").length) {
            next.show();
            $(this).find("span").html(tabs.find(".act").prev(".tab").find("span").html());
            next.find("span").html(tabs.find(".act").next(".tab").find("span").html());
          } else {
            $(this).hide();
            next.find("span").html(tabs.find(".act").next(".tab").find("span").html());
          }
        });
        
        next.click(function() {
          tabs.find(".act").next(".tab").click();
          if (tabs.find(".act").next(".tab").length) {
            prev.show();
            $(this).find("span").html(tabs.find(".act").next(".tab").find("span").html());
            prev.find("span").html(tabs.find(".act").prev(".tab").find("span").html());
          } else {
            $(this).hide();
            prev.find("span").html(tabs.find(".act").prev(".tab").find("span").html());
          }
        })
        
        tabs.find(".tab").click(function() {
          next.find("span").html($(this).next(".tab").find("span").html());
          prev.find("span").html($(this).prev(".tab").find("span").html());
          if ($(this).prev(".tab").length) {
            prev.show();
          } else {
            prev.hide();
          }
          if ($(this).next(".tab").length) {
            next.show();
          } else {
            next.hide();
          }
        })

      });
    }
  });
  
  var locationHash = window.location.hash.replace("#","");
  
  if ($(".tab[rel='" + locationHash + "']").length) {
    $(".tab[rel='" + locationHash + "']").click();
  }
  
  // Tabs prev/next
  // Mainpage projects jcarousel
  
  $(".mainpage-projects .jcarousel").jcarousel({
    scroll:3,
    wrap:'circular'
  });
  
  
  
  // Documents-carousel
  
  $(".documents-carousel .jcarousel").jcarousel({
    scroll:2,
    wrap:'circular'
  });
  
  // Success-carousel
  
  $(".success-carousel .jcarousel").jcarousel({
    scroll:1
  });
  
  $(".button-order").click(function() {
    openPopup("orderPopup")
  });
  
  $(".button-callback").click(function() {
    openPopup("callbackPopup")
  });

  $(".filter-trigger").each(function() {
    $(this).attr("origname",$(this).find("span span").html())
  });

  $(".filter-trigger").click(function() {
    var trigger = $(this);
    if (!trigger.hasClass("filter-trigger-act")) {
      trigger.find("span span").html("Свернуть");
      
      $(this).prev("ul").find("li.hidden").slideDown(200,function() {
        trigger.prev("ul").find("li.hidden a").fadeIn(200)
      });
      
    } else {
      
      $(this).prev("ul").find("li.hidden a").fadeOut(200,function() {
        trigger.prev("ul").find("li.hidden").slideUp(200)
      });
    
      trigger.find("span span").html($(this).attr("origname"));
    }
    
    $(this).toggleClass("filter-trigger-act");
    
  });

  $(".header .button-contact, .footer .button-contact").click(function() {
    openPopup("feedbackPopup")
  });

  $(".common-form select").customSelect();

  // Simple slider
  
  if ($(".slider").length) {
    $(".slider").each(function() {
      $(this).simpleSlider({
        width:530
      });
    });
  }

  

  $(".facts-tree .pup-trigger").hover(function() {
    var trigger = $(this);
    var popup = $(this).parents("div").children(".tree-popup");
    
    if (trigger.offset().top - $(window).scrollTop() + trigger.height()/2 < $(window).height()/2) {
      popup.fadeToggle(250)
           .css("left",$(this).position().left - 200)
           .css("top",$(this).position().top + $(this).height() + 20)
           .removeClass("tree-popup-top")
    } else {
      popup.fadeToggle(250)
           .css("left",$(this).position().left - 200)
           .css("top",$(this).position().top - popup.height() - 20)
           .addClass("tree-popup-top")
    }
    
  })

  $(".main-slider").mainSlider();

  $(".fancybox").fancybox({
    padding: 0,
    helpers: {
      overlay: {
        locked: false
      }
    }
  });

  $(".form-text").each(function() {
    if ($(this).val()) {
      $(this).prev(".placeholder").hide();
    }
  });

  $(".form-phone").mask("+7 (999) 999-99-99");

  validateForms();

  makeup();
  
});

function makeup() {
  
  $("ol").children("li").each(function() {
    if (!$(this).children(".li-cont").length) {
      $(this).html("<div class='li-cont'>"+$(this).html()+"</div>")
    }
  });
  
  $("ol.alternate").children("li").each(function() {
    if (!$(this).find(".num").length) {
      var index = parseInt($(this).prevAll("li").length,10);
      index += 1;
      $(this).append("<div class='num'>"+index+"</div>");
    }
  });

  $("input.button").each(function () {
    if ($(this)[0].tagName == "INPUT" && !$(this).next("div.form-submit").length) {
      var divBtn = $("<div></div>");
      var submit = $(this);
      divBtn.attr("class",$(this).attr("class")).attr("id",$(this).attr("id")).html("<span>" + $(this).val() + "</span>");
      $(this).after(divBtn);
      $(this).hide();
      
      if ($(this).is(":disabled")) {
        divBtn.addClass("button-disabled")
      }
      
      divBtn.on("click",function () {
        submit.click();
      });
    }
    
  });

  $("input:text, textarea").each(function() {
    $(this).addClass("initial");
    
    if ($(this).prop("tagName") == "INPUT") {
      // if (!$(this).parents(".input-wrapper").length) $(this).wrap("<div class='input-wrapper'></div>");
      $(this).focus(function() {
        $(this).removeClass("initial");
        $(this).parents(".form-item").find(".placeholder").hide();
      });
      $(this).blur(function() {
        $(this).prev().prev(".placeholder").hide();
        if (!$(this).val()) {
          $(this).addClass("initial");
          $(this).parents(".form-item").find(".placeholder").show();
        }
      });
    } else {
      $(this).focus(function() {
        $(this).removeClass("initial");
        $(this).parents(".form-item").find(".placeholder").hide();
      });
      $(this).blur(function() {
        if (!$(this).val()) {
          $(this).addClass("initial");
          $(this).parents(".form-item").find(".placeholder").show();
        }
      });
    }
      
    $(this).parents(".form-item").find(".placeholder").click(function() {
      $(this).focus();
    });
    
  });
  
  if ($(".page-text img").length) {
    $('.page-text img').filter(function() {
        var $th = $(this);
        return !$th.prev('img').length && !$(this).parents(".slider").length && ($th.parents().hasClass("page-text")) && $(this).next('img').length;
    }).each(function() {
        
      var $th = $(this);
      if (!$th.parents(".slider").length) {
        if ($th.parents("p").length || $th.parents("div").length) {
          //$th.parent().find("img").wrapAll('<div class="slider">');
        }
        if (!$(this).prev().length) {
          $(this).before("<div />")
        }
        $th.prev().nextUntil(':not(img)').wrapAll('<div class="slider">');
        $th.parents(".slider").simpleSlider({
          width:530,
          showtitles: false
        });
      }
    });
    
    $('.page-text img').filter(function() {
        var $th = $(this);
        return !$th.prev('img').length && !$(this).parents(".slider").length && ($th.parents().hasClass("page-text")) && !$(this).next('img').length;
    }).each(function() {
        
      var $th = $(this);
      if (!$th.parents(".article-pic").length && !$th.parents("form").length) {
        $th.wrap("<div class='article-pic' />")
        if ($th.attr("title")) $th.after("<div class='title'>"+$th.attr("title")+"</div>");
        $th.parents(".article-pic").css("width",$th.width());
      }
    });
    
  }
  
}

function validateForms() {
  
  $(".common-form form").each(function() {
    $(this).validate({
      focusInvalid: false,
      sendForm : false,
      errorPlacement: function(error, element) {
        // element.parents(".input-wrapper").addClass("input-wrapper-error");
        if (element.attr("errortext")) {
          error.html(element.attr("errortext"))
        }
        error.insertAfter(element).wrap("<div class='error-wrapper' />");
        element.prev(".placeholder").addClass("placeholder-error")
        if (element[0].tagName == "SELECT") {
          element.parents(".form-item").find(".param-selector").addClass("param-sel-error")
        }
      },
      unhighlight: function(element, errorClass, validClass) {
        // $(element).parents(".input-wrapper").removeClass("input-wrapper-error");
        $(element).removeClass(errorClass);
        $(element).next(".error-wrapper").remove();
        $(element).prev(".placeholder").removeClass("placeholder-error");
        if ($(element)[0].tagName == "SELECT") {
          $(element).parents(".form-item").find(".param-selector").removeClass("selector-error")
        }
      },
      invalidHandler: function(form, validatorcalc) {
          var errors = validatorcalc.numberOfInvalids();
          if (errors && validatorcalc.errorList[0].element.tagName == "INPUT") {                    
              validatorcalc.errorList[0].element.focus();
          }
      }
    });
    
    if ($(this).find(".form-email").length) {
      $(this).find(".form-email").rules('add', {
        email: true,
        messages: {
          required:  "Введите правильный адрес!"
        }
      });
    }
    
    if ($(this).find(".form-date").length) {
      $(this).find(".form-date").rules('add', {
        messages: {
          required:  "Выберите дату!"
        }
      });
    }
    
    
  });  
  
}

function closePopup() {
  $(".tint").fadeTo(500,0,function() {
    $(this).remove();
  });
  if (!$(".popup-act").hasClass("module-popup")) {
  
    
    $(".popup-act").removeClass("popup-act").fadeTo(300,0,function() {
      $(this).hide();
    });
    
  } else {
    $("body").css("overflow","auto");
    $(".popup-act").removeClass("popup-act").fadeTo(300,0,function() {
      $(this).css("left",-20000);
    });
  }
}

function pupMakeup() {
  var popup = $(".popup-act");
  var pupTop = $(window).scrollTop() + ($(window).height() - popup.outerHeight(true))/2;
  if (pupTop < 20) pupTop = 20;
  $(".tint").css("height",$(window).height()).css("width",$("body").width());
  if (!popup.hasClass("price-popup")) {
    popup.css("top",pupTop).css("left",($(window).width()-popup.outerWidth(true))/2 - 20);
  } else {
    popup.css("margin-top",$(window).scrollTop() - popup.parent().offset().top - popup.parent().outerHeight(true) + ($(window).height()-popup.outerHeight(true))/2);
  }
  
  if (popup.hasClass("module-popup")) {
    popup.css("height",$(window).height() - 40);
    popup.find(".scrollable-cont").css("height",$(window).height() - 100);
  }
  
}

function openPopup(pupId) {
  var popup = $("#"+pupId);
  
  if (popup.find(".scrollable-cont").length) {
    $("body").css("overflow","hidden");
    popup.find(".scrollable-cont").mCustomScrollbar("update");
  }
  
  $("body").append("<div class='tint' style='display:none;' />");
  popup.addClass("popup-act").fadeTo(500,1);
  
  $(".tint").fadeTo(300,1);
  pupMakeup();
  
  if (!popup.children(".popup-shadow").length) {
    popup.append("<div class='popup-shadow' />");
  } 
  
  jQuery(document).keydown(function(e){
    if (e == null) { // ie
      keycode = event.keyCode;
    } else { // mozilla
      keycode = e.which;
    }
    
    if(keycode == 27){ // escape, close box
      closePopup()
    }
    
  });
  
  $(".tint").on("click", function () {
    closePopup()
  });
  
  $(".popup .close, .popup .cancel").on("click", function () {
    closePopup()
  });
}

(function( jQuery ) {
  jQuery.fn.mainSlider = function() {
    var slider = $(this);
    var slides = slider.find(".slide");
    var sliderSize = slides.size();
    
    slides.hide();
    slides.eq(0).show().addClass("slide-act");
    
    slider.find(".sc-item").eq(0).addClass("act");
    
    slider.find(".slider-controls .sc-item").click(function() {
      if (!$(this).hasClass("act")) {
        slider.find(".slide-act").fadeOut(500).removeClass("slide-act");
        slider.find(".slide").eq($(this).index()).fadeIn(500).addClass("slide-act");
        slider.find(".sc-item").removeClass("act");
        $(this).addClass("act");
      }
    });
    
    slider.find(".sc-item").hover(function() {
      $(this).click();
    })
    
    var play = 1;
    
    slider.bind("mouseover",function () {
      play = 0;
    });
    
    slider.bind("mouseout",function () {
      play = 1;
    });
    
    if (play) {
      var t = setInterval(function () {
        if (play) {
          if (slider.find(".slider-controls .act").next(".sc-item").length) {
            slider.find(".slider-controls .act").next(".sc-item").click();
          } else {
            slider.find(".slider-controls").find(".sc-item").eq(0).click();
          }
        }
      },10000);
    }
    
  }
})( jQuery );

(function( $ ) {
  $.fn.simpleSlider = function(options) {
    var slider = $(this);
    
    if (!slider.parents(".simple-slider").length) {
      slider.css("width",options.width);
      //slider.css("height",options.height);
      slider.wrap("<div class='simple-slider' />");
      slider.children().each(function() {
        $(this).wrap("<div class='slide'><div class='pic-wrapper'><div class='pic' style='width:"+options.width+"px;'></div></div></div>")
        if (options.showtitles && $(this).attr("title")) {
          $(this).parents(".slide").append("<div class='img-descr'>"+$(this).attr("title")+"</div>")
        }
      });
      var items = $(this).children("div.slide");
      
      var sliderSize = items.length;
      
      items.each(function() {
        $(this).addClass("slide").attr("index",$(this).index());
        imgMarginTop = -$(this).find("img").height()/2+options.height/2;
        if (imgMarginTop > 0) imgMarginTop = 0;
        $(this).find("img").css("margin-top",imgMarginTop).after("<div class='pic-mask' />");
        if ($(this).find("img").hasClass("noframe")) {
          $(this).find(".pic-mask").hide();
        }
      });
      
      items.hide();
      items.eq(0).addClass("current").show();
      
      items.eq(0).find("img").attr("src",items.eq(0).find("img").attr("src")+ "?" + new Date().getTime());
      
      items.eq(0).find("img").load(function() {
        slider.css("height",items.eq(0).find("img").height());
        slider.find(".pic").css("height",items.eq(0).find("img").height());
        slider.find(".pic img").css("max-height",items.eq(0).find("img").height());
      });
      
      
      if (sliderSize > 1) {
        slider.after("<div class='next' />");
        slider.after("<div class='prev' />");
      }
      
      // slider.find(".pic-mask").css("width",options.width-20)
      // slider.find(".pic-mask").css("height",options.height-20)
      
      var prevBtn = slider.parents(".simple-slider").find(".prev");
      var nextBtn = slider.parents(".simple-slider").find(".next");
      
      // prevBtn.css("top",options.height/2-24)
      // nextBtn.css("top",options.height/2-24)
      
      nextBtn.click(function() {
        curIndex = parseInt(slider.find(".current").attr("index"))
        if (curIndex < sliderSize-1) {
          curIndex++;
          items.eq(curIndex-1).fadeOut(250).removeClass("current");
          items.eq(curIndex).fadeIn(250).addClass("current");
          // slider.css("height",items.eq(curIndex).height());
        } else {
          items.eq(curIndex).fadeOut(250).removeClass("current");
          items.eq(0).fadeIn(250).addClass("current");
          // slider.css("height",items.eq(0).height());
        }
        imgMarginTop = -items.eq(curIndex).find("img").height()/2+slider.height/2;
        if (imgMarginTop > 0) imgMarginTop = 0;
        items.eq(curIndex).find("img").css("margin-top",imgMarginTop);
      });
      
      prevBtn.click(function() {
        curIndex = parseInt(slider.find(".current").attr("index"))
        if (curIndex > 0) {
          curIndex--;
          items.eq(curIndex+1).fadeOut(250).removeClass("current");
          items.eq(curIndex).fadeIn(250).addClass("current");
          // slider.css("height",items.eq(curIndex).height());
        } else {
          items.eq(curIndex).fadeOut(250).removeClass("current");
          items.eq(sliderSize-1).fadeIn(250).addClass("current");
          // slider.css("height",items.eq(sliderSize-1).height());
        }
        imgMarginTop = -items.eq(curIndex).find("img").height()/2+slider.height/2;
        if (imgMarginTop > 0) imgMarginTop = 0;
        items.eq(curIndex).find("img").css("margin-top",imgMarginTop);
      });
    
    }
    
  };
})( jQuery );

(function( $ ) {
  $.fn.customSelect = function() {
    var selects = $(this);
    selects.each(function () {
      var select = $(this);
      
      if (!$(this).next(".param-selector").length) {
        select.css("visibility","hidden").css("position","absolute").css("z-index","-1");
        select.after("<div class='param-selector' id='" + select.attr("id") + "-selector'>");
        var selector = select.next(".param-selector");
        
        if (select.is(":disabled")) {
          selector.addClass("selector-disabled")
        }
        
        
        selector.append("<div class='param-sel' />").append("<div class='dropdown' />");
        var dropdown = selector.find(".dropdown");
        // dropdown.append("<div class='top-border' />");
        var paramSel = selector.find(".param-sel");
        paramSel.addClass("initial");
        paramSel.append("<div class='arr' />");
        paramSel.append("<div class='sel-value' />");
        
        if (select.find("option[value=" + select.val() + "]").attr("flag")) {
          paramSel.find(".sel-value").html("<img src='" + select.find("option[value=" + select.val() + "]").attr("flag") + "' />" + select.find("option[value=" + select.val() + "]").html());
        } else {
          paramSel.find(".sel-value").html(select.find("option[value=" + select.val() + "]").html());
        }
        
        select.find("option").each(function () {
          if ($(this).attr("flag")) {
            var flag = "<img src=" + $(this).attr("flag") + " />";
          } else {
            flag = "";
          }
          
          if (select.find("option").length > 2) {
          
            if ($(this).val() != select.val() /* || select.attr("ttl")*/) {
              dropdown.append("<div val='" + $(this).attr("value") + "'>" + flag + $(this).html() + "</div>");
            } else {
              dropdown.append("<div style='display:none' val='" + $(this).attr("value") + "'>" + flag + $(this).html() + "</div>");
            }
            
          } else {
            dropdown.append("<div val='" + $(this).attr("value") + "'>" + flag + $(this).html() + "</div>");
          }
          
        });
      
      
        paramSel.on("click",function() {
          $(this).parents(".common-form").find(".form-item").css("z-index",1);
          $(this).parents(".form-item").css("z-index",10);
          if (!select.is(":disabled")) {
            if (dropdown.css("display") != "block") {
              $(".dropdown").fadeOut(150);
              $(".param-open").removeClass("param-open");
              dropdown.fadeIn(150);
              selector.addClass("param-open");
              var maxWidth = 0;
              
              $(this).parents(".form-item").prevAll(".form-item").css("z-index","100");
              $(this).parents(".form-item").css("z-index","1000");
              $(this).parents(".form-item").nextAll(".form-item").css("z-index","100");
              
              dropdown.find("div").each(function () {
                if ($(this).width() >= maxWidth) {
                  maxWidth = $(this).width();
                }
                if (paramSel.width() >= maxWidth) {
                  maxWidth = paramSel.width() + 1;
                }
              });
              
              //paramSel.css("width", maxWidth + "px");
              // dropdown.find("div").css("width", maxWidth + "px");
              // dropdown.css("width", maxWidth);
              
              // ddOverflow = $("html").height() - (dropdown.offset().top + dropdown.height());
              // if (ddOverflow < 0) {
                // dropdown.css("margin-top", -30 - dropdown.height());
              // }
              
              //dropdown.css("top",paramSel.position().top + paramSel.height());
              
            } else {
              dropdown.fadeOut(150);
              selector.removeClass("param-open");
            }
          }
        });
        
        dropdown.find("div").on("click",function () {
          selector.removeClass("param-sel-error");
          paramSel.removeClass("initial");
          var div = $(this);
          paramSel.find(".sel-value").html($(this).html());
          if ($(this).attr("flag")) {
            paramSel.find(".sel-value").attr("flag",$(this).attr("flag"));
          }
          select.val($(this).attr("val")).change();
          if (select.hasClass("hide-ttl")) {
            //select.find("option[value='']").remove();
            dropdown.find("div[val='']").remove();
          }
          dropdown.fadeOut(150, function () {
            dropdown.find("div").show().removeClass("selected");
            div.addClass("selected");
            div.parents(".param-open").removeClass("param-open");
          });
          if ($(this).attr("val")) {
            selector.parents(".form-item").find(".error-wrapper").remove();
          }
        });
      
      }
    });
    
  };
})( jQuery );

function mpcInit(carousel,state) {
  // carousel.list.css("width",5000)
}

jQuery.extend(jQuery.validator.messages, {
    required: "Заполните поле!",
    remote: "Please fix this field.",
    email: "Введите правильный e-mail",
    url: "Please enter a valid URL.",
    date: "Please enter a valid date.",
    dateISO: "Please enter a valid date (ISO).",
    number: "Please enter a valid number.",
    digits: "Please enter only digits.",
    creditcard: "Please enter a valid credit card number.",
    equalTo: "Please enter the same value again.",
    accept: "Please enter a value with a valid extension.",
    maxlength: jQuery.validator.format("Please enter no more than {0} characters."),
    minlength: jQuery.validator.format("Please enter at least {0} characters."),
    rangelength: jQuery.validator.format("Please enter a value between {0} and {1} characters long."),
    range: jQuery.validator.format("Please enter a value between {0} and {1}."),
    max: jQuery.validator.format("Please enter a value less than or equal to {0}."),
    min: jQuery.validator.format("Please enter a value greater than or equal to {0}.")
});
