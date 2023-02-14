
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


   $(".who_btn").click(function() {
       $(".who_btn").removeClass("active");
        $(this).addClass("active");
    });

//map chart 버튼
    $('#worldBtn').click(function() {
        $('#world-map').show();
        $('#korea-map, #seoul-map, #seongnam-map').hide();
        $('#world-map, #korea-map, #seongnam-map').removeClass("selectMap");
        $('#world-map').addClass("selectMap");
        zoomCount = 1;
        reset_xy()
        dragMap()
        $('.selectMap').css('transform','scale(1)');
    });

    $('#koreaBtn').click(function() {
        $('#korea-map').show();
        $('#world-map, #seoul-map, #seongnam-map').hide();
        $('#world-map, #korea-map, #seongnam-map').removeClass("selectMap");
        $('#korea-map').addClass("selectMap");
        zoomCount = 1;
        reset_xy()
        dragMap()
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
        reset_xy()
        dragMap()
        $('.selectMap').css('transform','scale(1)');

        }
    });

    let startDrag
    let endDrag
    let xLocation = 0;
    let yLocation = 0;
    let lastX = 0;
    let lastY = 0;

//map 줌인 줌아웃 버튼
    let zoomCount = 1;
    $('.map-zoomIn').on('click',function(){
        if(zoomCount < 10){
            zoomCount = zoomCount + 0.1;
        }
        $('.selectMap').css('transform',"scale("+ zoomCount + ") translate(" + lastX  + "px," + lastY +"px)")
 });

    $('.map-zoomOut').on('click',function(){
        if(zoomCount > 1){
            zoomCount = zoomCount - 0.1;
             }
        $('.selectMap').css('transform',"scale("+ zoomCount + ") translate(" + lastX  + "px," + lastY +"px)")
 });
    const reset_xy = function(){
        xLocation = 0;
        yLocation = 0;
        lastX = 0;
        lastY = 0;
    }

    $(".bi-fullscreen").click(function() {
        $('.selectMap').css('transform',"translate(0px,0px)")
        zoomCount = 1;
        reset_xy()
    });

    const dragMap = function(){
// 이미지 드래그 기능
    $('.selectMap').on({
    'mousedown':function(e){
        startDrag = [event.offsetX,event.offsetY];
        $('.selectMap').css('cursor','grabbing')
        $('.selectMap').on('mousemove', function(e){
            endDrag = [event.offsetX,event.offsetY];
            xLocation = endDrag[0] - startDrag[0];
            yLocation = endDrag[1] - startDrag[1];
            lastX = lastX + xLocation
            lastY = lastY + yLocation
            $('.selectMap').css('cursor','grabbing')
            $('.selectMap').css('transform',"scale("+ zoomCount + ") translate(" +  lastX  + "px," + lastY  +"px)")
        });
    },
    'mouseup':function(e){
       $('.selectMap').off('mousemove');
       $('.selectMap').css('cursor','grab')
    }

});
};
    dragMap()
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


// 엑티브 버튼 모음
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

    $(".btn-dataNavi").on('click',function(){
//    Teradata Postgres ETC
        const dataNavi = ['Teradata','Postgres','ETC']
        $(".btn-dataNavi").removeClass("active");
        $(this).addClass("active");
        let btnText = $(this).text()
        dataNavi.forEach(function(element){
         if(btnText === element){
            $('.Navi-DF').css("display","none");
            $('.Navi-DF-' + element +'-menu').css("display","block");
            }
        });
    });
    const textBoxHover = function(){
        $(".table-textBox").on({
            'mouseover':function(){
                $(this).addClass("textBox-scroll")
            },
            'mouseout':function(){
                $(this).removeClass("textBox-scroll")
            }
        });
    };

    const reset_icon = function(){


        };

    $(".btn-tableProperties").on('click',function(){
//    Data Columns View Procedure DDL
        const tableProperties = ['Data', 'Column', 'View', 'Procedure', 'DDL']
        $(".btn-tableProperties").removeClass("active");
        $(this).addClass("active");
        let btnText = $(this).text()
        tableProperties.forEach(function(element){
             if(btnText === element){
                $('.properties').css("display","none");
                $(".properties-" + element).css("display","table");
             }
         });
         textBoxHover()
    });

    $(".menu-list").on('click',function(event){
        if($(this).is('.menu-list1')){
            var mother = $(this).closest('.Navi-DF-menu1')
            if($(this).is('.bi-caret-right-fill')){
                $(this).removeClass("bi-caret-right-fill")
                $(this).addClass("bi-caret-down-fill")
                mother.children(".Navi-DF-menu2").css("display",'block');
            } else if($(this).is('.bi-caret-down-fill')) {
                $(this).removeClass("bi-caret-down-fill")
                $(this).addClass("bi-caret-right-fill")
                mother.children(".Navi-DF-menu2").css("display",'none');
            }
        }
        else if($(this).is('.menu-list2')){
            var mother = $(this).closest('.Navi-DF-menu2')
            if($(this).is('.bi-caret-right-fill')){
                $(this).removeClass("bi-caret-right-fill")
                $(this).addClass("bi-caret-down-fill")
                mother.children(".Navi-DF-menu3").css("display",'block');
            } else if($(this).is('.bi-caret-down-fill')) {
                $(this).removeClass("bi-caret-down-fill")
                $(this).addClass("bi-caret-right-fill")
                mother.children(".Navi-DF-menu3").css("display",'none');
            }
        }
        else if($(this).is('.menu-list3')){
            var mother = $(this).closest('.Navi-DF-menu3')
            if($(this).is('.bi-caret-right-fill')){
                $(this).removeClass("bi-caret-right-fill")
                $(this).addClass("bi-caret-down-fill")
                mother.children(".Navi-DF-menu4").css("display",'block');
            } else if($(this).is('.bi-caret-down-fill')) {
                $(this).removeClass("bi-caret-down-fill")
                $(this).addClass("bi-caret-right-fill")
                mother.children(".Navi-DF-menu4").css("display",'none');
            }
        }
        else if($(this).is('.menu-list4')){
            var mother = $(this).closest('.Navi-DF-menu4')
            if($(this).is('.bi-caret-right-fill')){
                $(this).removeClass("bi-caret-right-fill")
                $(this).addClass("bi-caret-down-fill")
                $(this).children(".bi").removeClass("bi-folder")
                $(this).children(".bi").addClass("bi-folder2-open")
                mother.children(".Navi-DF-menu5").css("display",'block');
            } else if($(this).is('.bi-caret-down-fill')) {
                $(this).removeClass("bi-caret-down-fill")
                $(this).addClass("bi-caret-right-fill")
                $(this).children(".bi").removeClass("bi-folder2-open")
                $(this).children(".bi").addClass("bi-folder")
                mother.children(".Navi-DF-menu5").css("display",'none');
            }
        }
        else if($(this).is('.menu-list5')){
            var mother = $(this).closest('.Navi-DF-menu5')
            if($(this).is('.bi-caret-right-fill')){
                $(this).removeClass("bi-caret-right-fill")
                $(this).addClass("bi-caret-down-fill")
                $(this).children(".bi").removeClass("bi-folder")
                $(this).children(".bi").addClass("bi-folder2-open")
                mother.children(".Navi-DF-menu6").css("display",'block');
            } else if($(this).is('.bi-caret-down-fill')) {
                $(this).removeClass("bi-caret-down-fill")
                $(this).addClass("bi-caret-right-fill")
                $(this).children(".bi").removeClass("bi-folder2-open")
                $(this).children(".bi").addClass("bi-folder")
                mother.children(".Navi-DF-menu6").css("display",'none');
            }

    }


            });

});
