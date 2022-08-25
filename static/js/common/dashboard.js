$(document).ready(function () {

  var mySwifer = new Swiper('.swiper-container', {
      slidesPerView: 8,
      spaceBetween: 30,
      slidesPerGroup: 1,
      loopFillGroupWithBlank: true,
      loop: true,
      autoplay: {
          delay: 1000,
          disableOnInteraction: false,
        },
      breakpoints: {
          0: {
              slidesPerView: 1,
          },
          520: {
              slidesPerView: 2,
          },
          950: {
              slidesPerView: 3,
          },
          1000: {
              slidesPerView: 4,
          },
          1700: {
              slidesPerView: 6,
          },
          1920: {
            slidesPerView: 8,
          },
      },
  })
    $('.swiper-slide').hover(function(){
        mySwifer.autoplay.stop();
     }, function(){
        mySwifer.autoplay.start();
    });
});


