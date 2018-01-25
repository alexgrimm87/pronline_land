'use strict';

/**
* Check scroll-bar width
* exemple ->   let scroll = $.scrollbarWidth();
*/
$.scrollbarWidth = function () {
    var a, b, c;if (c === undefined) {
        a = $('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo('body');b = a.children();c = b.innerWidth() - b.height(99).innerWidth();a.remove();
    }return c;
};

/**
* Scroll to the block
* @param {block} str - For what we click
* @param {targetBlock} str - to what we should scroll
*/
function scrollUp(block, targetBlock) {
    $(block).click(function (e) {
        var target = $(targetBlock).offset().top;

        $('body,html').stop().animate({ scrollTop: target }, 800);
        return false;

        e.preventDefault();
    });
}

/**
* Scroll animation
* @param {item} jquery obj - Wrapper for class 'animate-it';
*/
function animationBlock(item) {

    $(window).scroll(function () {
        checkForAnimate();
    });

    function checkForAnimate() {
        var bottomCheck = $(window).height() + $(window).scrollTop();
        var windowTop = $(window).scrollTop() + $(window).height() / 1.5;
        item.each(function () {
            if (windowTop > $(this).offset().top || bottomCheck > $('body').height() * 0.98) {

                var itemSect = $(this);
                var point = 0;
                itemSect.find('.animate-it').addClass('animated');

                var timer = setInterval(function () {
                    itemSect.find('.animate-delay').eq(point).addClass('animated');
                    point++;
                    if (itemSect.find('.animate-delay').length == point) {
                        clearInterval(timer);
                    }
                }, 200);
            }
        });
    }
    checkForAnimate();
}

/**
* GO TO href (smooth)
*/
function goTo() {
    $('.menu a').not('.close_menu').click(function (e) {
        e.preventDefault();
        var href = $(this).attr('href');
        var target = $(href).offset().top - 65;
        $('body,html').animate({ scrollTop: target }, 500);
        if ($(window).width() < 921) {
            $('.menu').removeClass('active');
        }
    });
    $('.wrap-banner .arr').click(function (e) {
        e.preventDefault();
        var target = $(this).closest('.wrap-banner').outerHeight() + 5;
        $('body,html').animate({ scrollTop: target }, 500);
    });
}

/**
* Cut text script
* (Add to  div class "cut-text" width data-attr "data-cut"(length letters to show) )
*/
function cutText() {
    var filler = '...';
    var filler_length = filler.length;
    $('.cut-text').each(function () {
        var value = $(this).data('cut') - filler_length;
        var text = $.trim($(this).text());
        if (text.length > value && value > 0) {
            var newText = text.substring(0, value) + filler;
            $(this).text(newText);
        }
    });
};

/**
* Functional header butter
* @param {menuMobile} jquery obj - For what we click
* @param {toggleMenu} jquery obj - to what menu we will slideToggle
*/
function headeButer(menuMobile, toggleMenu) {
    if (menuMobile) {
        menuMobile.click(function (event) {
            if ($(window).width() < 1024 - $.scrollbarWidth()) {
                $(this).toggleClass('active');
                toggleMenu.stop().slideToggle();
            }
        });

        $(document).on('click touchstart', function (event) {
            if ($(window).width() < 1024 - $.scrollbarWidth()) {
                var div = toggleMenu;
                if (!div.is(event.target) && div.has(event.target).length === 0 && !menuMobile.is(event.target) && menuMobile.has(event.target).length === 0) {
                    toggleMenu.slideUp();
                    menuMobile.removeClass('active');
                }
            }
        });
    }
}

/**
* Expresion for numbers with spaces
* @param {x} number
* @return {string}
*/
function numberWithSpaces(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return parts.join(".");
}

$(document).ready(function () {

    $('.footer_placeholder').height($('.footer').outerHeight());

    goTo();
    animationBlock($('.setion-animate'));
});

$(window).resize(function () {

    $('.footer_placeholder').height($('.footer').outerHeight());
});
'use strict';

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

var max = $('.mozaika .pic').length + 1;
function randomMozaic() {
  var firstR = getRandomInt(0, max + 1);
  if (!$('.mozaika .pic').eq(firstR).hasClass('active')) {
    $('.mozaika .pic').eq(firstR).addClass('active');
  }
}

function teamSlider(selector) {
  $(selector).slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000
  });
};

$(document).ready(function () {

  $('.close_menu').click(function (e) {
    e.preventDefault();
    $(this).closest('.menu').removeClass('active');
  });
  $('.burger').click(function (e) {
    e.preventDefault();
    $(this).next('.menu').toggleClass('active');
  });

  var height = $('.wrap-banner').outerHeight();
  var mozaicHeight = $('.wrap-emploees').outerHeight();
  $(window).scroll(function () {
    if ($(window).scrollTop() > height && $(window).outerWidth() > 767) {
      $('.header').addClass('active');
    } else {
      $('.header').removeClass('active');
    }

    if ($(window).scrollTop() > mozaicHeight) {
      var timerId = setTimeout(function tick() {
        randomMozaic();
        timerId = setTimeout(tick, 2000);
      }, 500);

      setTimeout(function () {
        clearInterval(timerId);
      }, 6000);
    }
  });

  teamSlider('.team-slider');

  //join popup
  $('.js-popup').fancybox({
    openEffect: 'fade',
    closeEffect: 'fade',
    openMethod: 'horizontalflipIn',
    closeMethod: 'horizontalflipOut',
    autoSize: true,
    width: 945,
    height: 693,
    maxWidth: '100%',
    wrapCSS: 'join-wrap',
    'closeBtn': true,
    fitToView: true,
    autoCenter: true,
    padding: '0'
  });

  //tel
  var phoneRegExp = new RegExp(/^(?=.*[0-9])[+0-9]+$/);

  $('.tel').on('change keyup keydown', function () {
    var val = $(this).val();
    if (!phoneRegExp.test(val)) {
      // Replace anything that isn't a number or a plus sign
      $(this).val(val.replace(/([^+0-9]+)/gi, ''));
    }
  });
});

$(window).load(function () {});

$(window).resize(function () {});