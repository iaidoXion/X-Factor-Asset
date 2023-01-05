
$(document).ready(function(){
//map chart display from setting.json
    if (mapUse.WorldUse == 'block'){
        $('#korea-map, #seoul-map, #seongnam-map').hide();
        $('#world-map').show();
        }
    else if (mapUse.KoreaUse == 'block'){
        $('#world-map, #seoul-map').hide();
        $('#korea-map').show();
        }
    else if (mapUse.AreaUse == 'block'){
        if (mapUse.AreaType == 'seoul-map'){
        $('#world-map, #korea-map, #seongnam-map').hide();
        $('#seoul-map').show();
        }
        else if (mapUse.AreaType == 'seongnam-map'){
        $('#world-map, #korea-map, #seoul-map').hide();
        $('#seongnam-map').show();
        }
    };

//map chart 버튼
    $('#worldBtn').click(function() {
        $('#world-map').show();
        $('#korea-map, #seoul-map, #seongnam-map').hide();

        $('#world-map, #korea-map, #seongnam-map').removeClass("selectMap");
        $('#world-map').addClass("selectMap");
        zoomCount = 1;
        $('.selectMap').css('transform','scale(1)');
    });

    $('#koreaBtn').click(function() {
        $('#korea-map').show();
        $('#world-map, #seoul-map, #seongnam-map').hide();

        $('#world-map, #korea-map, #seongnam-map').removeClass("selectMap");
        $('#korea-map').addClass("selectMap");
        zoomCount = 1;
        $('.selectMap').css('transform','scale(1)');
    });

    $('#areaBtn').click(function() {
        if (mapUse.AreaType == 'seoul-map'){
        $('#world-map, #korea-map, #seongnam-map').hide();
        $('#seoul-map').show();
        }
        else if (mapUse.AreaType == 'seongnam-map'){
        $('#world-map, #korea-map, #seoul-map').hide();
        $('#world-map, #korea-map, #seongnam-map').removeClass("selectMap");

        $('#seongnam-map').show();
        $('#seongnam-map').addClass("selectMap");
        zoomCount = 1;
        $('.selectMap').css('transform','scale(1)');

        }
    });

    let startDrag
    let endDrag
    let xLocation = 0;
    let yLocation = 0;

//map 줌인 줌아웃 버튼
    let zoomCount = 1;
    $('.map-zoomIn').on('click',function(){
        if(zoomCount < 10){
            zoomCount = zoomCount + 0.1;
        }
        $('.selectMap').css('transform',"scale("+ zoomCount + ") translate(" + xLocation + "px," + yLocation +"px)")
 });

        $('.map-zoomOut').on('click',function(){
        if(zoomCount > 1){
            zoomCount = zoomCount - 0.1;
             }
        $('.selectMap').css('transform',"scale("+ zoomCount + ") translate(" + xLocation + "px," + yLocation +"px)")
 });

// 이미지 드래그 기능
    $('.selectMap').on({
    'dragstart':function(e){
        startDrag = [event.clientX,event.clientY];
        console.log(startDrag);
    },
    'dragend':function(e){
        endDrag = [event.clientX,event.clientY];
        xLocation = endDrag[0] - startDrag[0];
        yLocation = endDrag[1] - startDrag[1];
        $('.selectMap').css('transform',"scale("+ zoomCount + ") translate(" + xLocation + "px," + yLocation +"px)")

    }
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

// 메모리 CPU 디스크 버튼
$(document).ready(function () {
    const $Memory = $('.MemoryCharts')
    const $CPU = $('.CPUCharts')
    const $Disk = $('.DiskCharts')

    $(".mcdBtn").on('click',function(){
        $(".mcdBtn").removeClass("active");
        $(this).addClass("active");

        if($(this).text() === '메모리'){
            $($Memory).css("display","block");
            $($CPU).css("display","none");
            $($Disk).css("display","none");
            return;
        }

        if($(this).text() === 'CPU'){
            $($Memory).css("display","none");
            $($CPU).css("display","block");
            $($Disk).css("display","none");
            return;
        }
        if($(this).text() === '디스크'){
            $($Memory).css("display","none");
            $($CPU).css("display","none");
            $($Disk).css("display","block");
            return;
        }
    });


});
