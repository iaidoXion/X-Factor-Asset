//map chart 버튼
$(document).ready(function(){

    $('#korea-map, #seongnam-map').hide();
    $('#world-map').show();

    $('#worldBtn').click(function() {
        $('#world-map').show();
        $('#korea-map, #seongnam-map').hide();
    });

    $('#koreaBtn').click(function() {
        $('#korea-map').show();
        $('#world-map, #seongnam-map').hide();
    });

    $('#areaBtn').click(function() {
        $('#seongnam-map').show();
        $('#world-map, #korea-map').hide();
    });

});


// swiper 배너
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


