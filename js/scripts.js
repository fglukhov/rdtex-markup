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
  })
});

$(document).ready(function () {

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
    
  });
  
  var locationHash = window.location.hash.replace("#","");
  
  if ($(".tab[rel='" + locationHash + "']").length) {
    $(".tab[rel='" + locationHash + "']").click();
  }
  
  // Tabs prev/next
  
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
        
      });
    }

  // Mainpage projects jcarousel
  
  $(".mainpage-projects .jcarousel").jcarousel({
    scroll:3,
    wrap:'circular'
  });
  
  // Mainpage clients jcarousel
  
  $(".mainpage-clients .jcarousel").jcarousel({
    scroll:4,
    wrap:'circular',
    initCallback: mpcInit
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
  
  $("ol li").each(function() {
    if (!$(this).children(".li-cont").length) {
      $(this).html("<div class='li-cont'>"+$(this).html()+"</div>")
    }
  });
  
  $("ol.alternate li").each(function() {
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
        return !$th.prev('img').length && !$(this).parents(".slider").length && ($th.parent().hasClass("page-text") || $th.parent("p").parent().hasClass("page-text")) && $(this).next('img').length;
    }).each(function() {
        
      var $th = $(this);
      if (!$th.parents(".slider").length) {
        if ($th.parents("p").length) {
          $th.parent().find("img").wrapAll('<div class="slider">');
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
        return !$th.prev('img').length && !$(this).parents(".slider").length && ($th.parent().hasClass("page-text") || $th.parent("p").parent().hasClass("page-text")) && !$(this).next('img').length;
    }).each(function() {
        
      var $th = $(this);
      if (!$th.parents(".article-pic").length) {
        $th.wrap("<div class='article-pic' />")
        if ($th.attr("title")) $th.after("<div class='title'>"+$th.attr("title")+"</div>");
        $th.parents(".article-pic").css("width",$th.width());
      }
    });
    
  }
  
  
  
}

function validateForms() {
  
  var validatorQuestion = $("#questionForm").bind("invalid-form.validate", function() {
  	    
    }).validate({
    focusInvalid: false,
    sendForm : false,
    rules: {
      question_email: {
        required: true,
        email: true
      }
    },
    messages: {
      question_name: "Заполните это поле!",
      question_email: "Введите правильный адрес!",
      question_message: "Заполните это поле!"
    },
    errorPlacement: function(error, element) {
      // element.parents(".input-wrapper").addClass("input-wrapper-error");
      error.insertAfter(element).wrap("<div class='error-wrapper' />");
      element.prev(".placeholder").addClass("placeholder-error")
    },
    unhighlight: function(element, errorClass, validClass) {
      // $(element).parents(".input-wrapper").removeClass("input-wrapper-error");
      $(element).removeClass(errorClass);
      $(element).next(".error-wrapper").remove();
      $(element).prev(".placeholder").removeClass("placeholder-error");
    },
    invalidHandler: function(form, validatorcalc) {
        var errors = validatorcalc.numberOfInvalids();
        if (errors) {                    
            validatorcalc.errorList[0].element.focus();
        }
    },
  });
  
  var validatorOrder = $("#orderPopupForm").bind("invalid-form.validate", function() {
  	    
    }).validate({
    focusInvalid: false,
    sendForm : false,
    rules: {
      order_email: {
        required: true,
        email: true
      }
    },
    messages: {
      order_name: "Заполните поле!",
      order_email: "Введите правильный адрес!",
      order_type: "Выберите категорию!",
      order_message: "Заполните поле!"
    },
    errorPlacement: function(error, element) {
      // element.parents(".input-wrapper").addClass("input-wrapper-error");
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
        if (errors) {                    
            validatorcalc.errorList[0].element.focus();
        }
    },
  });
  
  var validatorCallback = $("#callbackPopupForm").bind("invalid-form.validate", function() {
  	    
    }).validate({
    focusInvalid: false,
    sendForm : false,
    rules: {
      callback_email: {
        required: true,
        email: true
      }
    },
    messages: {
      callback_name: "Заполните поле!",
      callback_phone: "Заполните поле!",
      callback_type: "Выберите категорию!"
    },
    errorPlacement: function(error, element) {
      // element.parents(".input-wrapper").addClass("input-wrapper-error");
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
        if (errors) {                    
            validatorcalc.errorList[0].element.focus();
        }
    },
  });
  
  var validatorRequest = $("#requestPopupForm").bind("invalid-form.validate", function() {
  	    
    }).validate({
    focusInvalid: false,
    sendForm : false,
    rules: {
      request_email: {
        required: true,
        email: true
      }
    },
    messages: {
      request_name: "Заполните это поле!",
      request_email: "Введите правильный адрес!"
    },
    errorPlacement: function(error, element) {
      // element.parents(".input-wrapper").addClass("input-wrapper-error");
      error.insertAfter(element).wrap("<div class='error-wrapper' />");
      element.prev(".placeholder").addClass("placeholder-error")
    },
    unhighlight: function(element, errorClass, validClass) {
      // $(element).parents(".input-wrapper").removeClass("input-wrapper-error");
      $(element).removeClass(errorClass);
      $(element).next(".error-wrapper").remove();
      $(element).prev(".placeholder").removeClass("placeholder-error");
    },
    invalidHandler: function(form, validatorcalc) {
        var errors = validatorcalc.numberOfInvalids();
        if (errors) {                    
            validatorcalc.errorList[0].element.focus();
        }
    },
  });
  
  var validatorЫupport = $("#supportForm").bind("invalid-form.validate", function() {
  	    
    }).validate({
    focusInvalid: false,
    sendForm : false,
    rules: {
      support_email: {
        required: true,
        email: true
      }
    },
    messages: {
      support_name: "Заполните это поле!",
      support_email: "Введите правильный адрес!",
      support_phone: "Заполните это поле!"
    },
    errorPlacement: function(error, element) {
      // element.parents(".input-wrapper").addClass("input-wrapper-error");
      error.insertAfter(element).wrap("<div class='error-wrapper' />");
      element.prev(".placeholder").addClass("placeholder-error")
    },
    unhighlight: function(element, errorClass, validClass) {
      // $(element).parents(".input-wrapper").removeClass("input-wrapper-error");
      $(element).removeClass(errorClass);
      $(element).next(".error-wrapper").remove();
      $(element).prev(".placeholder").removeClass("placeholder-error");
    },
    invalidHandler: function(form, validatorcalc) {
        var errors = validatorcalc.numberOfInvalids();
        if (errors) {                    
            validatorcalc.errorList[0].element.focus();
        }
    },
  });
  
  
  var validatorEventRequest = $("#eventRequestForm").bind("invalid-form.validate", function() {
  	    
    }).validate({
    focusInvalid: false,
    sendForm : false,
    rules: {
      event_request_email: {
        required: true,
        email: true
      }
    },
    messages: {
      event_request_name: "Заполните это поле!",
      event_request_email: "Введите правильный адрес!"
    },
    errorPlacement: function(error, element) {
      // element.parents(".input-wrapper").addClass("input-wrapper-error");
      error.insertAfter(element).wrap("<div class='error-wrapper' />");
      element.prev(".placeholder").addClass("placeholder-error")
    },
    unhighlight: function(element, errorClass, validClass) {
      // $(element).parents(".input-wrapper").removeClass("input-wrapper-error");
      $(element).removeClass(errorClass);
      $(element).next(".error-wrapper").remove();
      $(element).prev(".placeholder").removeClass("placeholder-error");
    },
    invalidHandler: function(form, validatorcalc) {
        var errors = validatorcalc.numberOfInvalids();
        if (errors) {                    
            validatorcalc.errorList[0].element.focus();
        }
    },
  });
  
  
}

function closePopup() {
  $(".tint").fadeTo(500,0,function() {
    $(this).remove();
  });
  $(".popup-act").removeClass("popup-act").fadeTo(300,0,function() {
    $(this).hide();
  });
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
  
}

function openPopup(pupId) {
  var popup = $("#"+pupId);
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
      // slider.css("height",options.height);
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
      
      items.eq(0).find("img").load(function() {
        slider.css("height",items.eq(0).find("img").height());
      });
      
      
      if (sliderSize > 1) {
        slider.after("<div class='next' />");
        slider.after("<div class='prev' />");
      }
      
      // slider.find(".pic-mask").css("width",options.width-20)
      // slider.find(".pic-mask").css("height",options.height-20)
      
      var prevBtn = slider.parents(".simple-slider").find(".prev");
      var nextBtn = slider.parents(".simple-slider").find(".next");
      
      prevBtn.css("top",options.height/2-24)
      nextBtn.css("top",options.height/2-24)
      
      nextBtn.click(function() {
        curIndex = parseInt(slider.find(".current").attr("index"))
        if (curIndex < sliderSize-1) {
          curIndex++;
          items.eq(curIndex-1).fadeOut(250).removeClass("current");
          items.eq(curIndex).fadeIn(250).addClass("current");
          slider.css("height",items.eq(curIndex).height());
        } else {
          items.eq(curIndex).fadeOut(250).removeClass("current");
          items.eq(0).fadeIn(250).addClass("current");
          slider.css("height",items.eq(0).height());
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
          slider.css("height",items.eq(curIndex).height());
        } else {
          items.eq(curIndex).fadeOut(250).removeClass("current");
          items.eq(sliderSize-1).fadeIn(250).addClass("current");
          slider.css("height",items.eq(sliderSize-1).height());
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
          if ($(this).val() != select.val()/* || select.attr("ttl")*/) {
            dropdown.append("<div val='" + $(this).attr("value") + "'>" + flag + $(this).html() + "</div>");
          } else {
            dropdown.append("<div style='display:none' val='" + $(this).attr("value") + "'>" + flag + $(this).html() + "</div>");
          }
        });
      
      
        paramSel.click(function() {
          if (!select.is(":disabled")) {
            if (dropdown.css("display") != "block") {
              $(".dropdown").fadeOut(150);
              $(".param-open").removeClass("param-open");
              dropdown.fadeIn(150);
              selector.addClass("param-open");
              var maxWidth = 0;
              
              // $(this).parents(".form-item").prevAll(".form-item").css("z-index","6000");
              // $(this).parents(".form-item").css("z-index","6001");
              // $(this).parents(".form-item").nextAll(".form-item").css("z-index","6000");
              
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
        
        dropdown.find("div").click(function () {
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
  carousel.list.css("width",5000)
}
