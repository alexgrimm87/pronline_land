function getRandomInt(min, max) {
  return  Math.floor(Math.random() * (max - min)) + min;
}

var max = $('.mozaika .pic').length +1;
function randomMozaic() {
  var firstR = getRandomInt(0,max+1);
  if (!$('.mozaika .pic').eq(firstR).hasClass('active')) {
    $('.mozaika .pic').eq(firstR).addClass('active');
  }
}

function teamSlider(selector){
  $(selector).slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000
  });
};



$(document).ready(function(){

  $('.close_menu').click(function(e) {
    e.preventDefault();
    $(this).closest('.menu').removeClass('active');
  });
  $('.burger').click(function(e) {
    e.preventDefault();
    $(this).next('.menu').toggleClass('active');
  });

  var height = $('.wrap-banner').outerHeight();
  var mozaicHeight = $('.wrap-emploees').outerHeight();
  $(window).scroll(function() {
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

      setTimeout(function() {
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
      'closeBtn' : true,
      fitToView: true,
      autoCenter: true,
      padding: '0'
    });

  //tel
  var phoneRegExp = new RegExp(/^(?=.*[0-9])[+0-9]+$/);

  $('.tel').on('change keyup keydown', function() {
    var val = $(this).val();
    if ( !phoneRegExp.test( val ) ) {
      // Replace anything that isn't a number or a plus sign
      $(this).val( val.replace(/([^+0-9]+)/gi, '') );
    }
  });

});

$(window).load(function(){

});

$(window).resize(function(){

});