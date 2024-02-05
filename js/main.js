(function () {


   const videos = [
      {
         video: 'video1.mp4', thumb: './img/thumb/@img-thumb-010.png', 
         title: '<dt>01</dt><dd>Hyundai SANTA CRUZ</dd><dd>Driving Footage</dd>'
      }, 
      {
         video: 'video2.mp4', thumb: './img/thumb/@img-thumb-002.png', 
         title: '<dt>02</dt><dd>Hyundai SANTA CRUZ</dd><dd>Driving Footage</dd>'
      }, 
      {
         video: 'video3.mp4', thumb: './img/thumb/@img-thumb-003.png', 
         title: '<dt>03</dt><dd>Hyundai SANTA CRUZ</dd><dd>Driving Footage</dd>'
      }, 
      {
         video: 'video4.mp4', thumb: './img/thumb/@img-thumb-004.png', 
         title: '<dt>04</dt><dd>Hyundai SANTA CRUZ</dd><dd>Driving Footage</dd>'
      }, 
      {
         video: 'video5.mp4', thumb: './img/thumb/@img-thumb-005.png', 
         title: '<dt>05</dt><dd>Hyundai SANTA CRUZ</dd><dd>Driving Footage</dd>'
      }, 
      {
         video: 'video6.mp4', thumb: './img/thumb/@img-thumb-006.png', 
         title: '<dt>06</dt><dd>Hyundai SANTA CRUZ</dd><dd>Driving Footage</dd>'
      }, 
      {
         video: 'video1.mp4', thumb: './img/thumb/@img-thumb-007.png', 
         title: '<dt>07</dt><dd>Hyundai SANTA CRUZ</dd><dd>Driving Footage</dd>'
      }, 
      {
         video: 'video2.mp4', thumb: './img/thumb/@img-thumb-008.png', 
         title: '<dt>08</dt><dd>Hyundai SANTA CRUZ</dd><dd>Driving Footage</dd>'
      }, 
      {
         video: 'video3.mp4', thumb: './img/thumb/@img-thumb-009.png', 
         title: '<dt>09</dt><dd>Hyundai SANTA CRUZ</dd><dd>Driving Footage</dd>'
      }, 
      {
         video: 'video4.mp4', thumb: './img/thumb/@img-thumb-010.png', 
         title: '<dt>10</dt><dd>Hyundai SANTA CRUZ</dd><dd>Driving Footage</dd>'
      }, 
   ];

   let count = 0;
   let timer = null;
   let targetVideo = null;
   let videoIndex = 0;
   let percent = 0;
   let detail = false;

   window.initMain = () => {
      if($(".main-content").length > 0) {
         const videoEl = $(`<video playsinline muted><source src="./video/${videos[0].video}" type="video/mp4" /></video>`);
         $(".main-content .video-con").append(videoEl);
         targetVideo = $(".main-content .video-con > video")[0];
         targetVideo.load();
         videos.forEach((x, i) => {
            $(".mySwiper .swiper-slide").eq(i).find(".image a").append(`<img src="${x.thumb}" />`);
            $(".mySwiper .swiper-slide").eq(i).find("dl").append(x.title);
            $(".mySwiper .swiper-slide").eq(i).find(".num").html($(x.title)[0])
            var dd = $(".mySwiper .swiper-slide").eq(i).find("dd");
            var shuffleText1 = new ShuffleText(dd.eq(0)[0], false, false, 8, 50, 0, 11+i, false);
            var shuffleText2 = new ShuffleText(dd.eq(1)[0], false, false, 8, 50, 0, 11+i, false);
            dd.eq(0).data('shuffleText', shuffleText1);
            dd.eq(1).data('shuffleText', shuffleText2);
         });
         // init();
      }
      // $("html,body").css({overflow: "hidden"});
      setTimeout(() => {
         if(!$('.close button').data('shuffleText')){
            var shuffleText = new ShuffleText($('.close button')[0], false, false, 8, 50, 0, 10);
            $('.close button').data('shuffleText', shuffleText);
         }   
      }, 500);
   }
   

   window.removeMain = () => {
      try{
         $('.main-content').off('mousewheel');
         clearInterval(timer);
         targetVideo.pause();
         totalDurations = 0;
         count = 0;
         timer = null;
         targetVideo = null;
         videoIndex = 0;
      }catch(e) {}
      $("html,body").css({overflow: ""});
      $(window).off('resize');
   }

   function init() {
      
      playVideo();

      $(".mySwiper .swiper-slide").each(function (i) {
         $(this).find(".block").on('mouseenter', () => {
            if(!detail){
               var dd = $(this).find("dd");
               dd.eq(0).data('shuffleText').iteration(true);
               setTimeout(() => dd.eq(1).data('shuffleText').iteration(true), 1000/30)
            }
         });

         $(this).find('.block').on('click', ( e ) => {
            var arrow = videoIndex < i ? 'right' : 'left';
            videoIndex = i;
            
            // $(this).parent().css({'z-index': 999})
            if(!detail){
               // targetVideo.pause();
               swiper.allowTouchMove = false;
               swiper.mousewheel.disable();
               detail = true;

               var w = $(".mySwiper .swiper-slide").eq(0).find('.image').width();
               var h = $(".mySwiper .swiper-slide").eq(0).find('.image').height();
               $('.work-block .block-box').data("w", w).data("h", h);

               $(".block-box-side").css({opacity: 0});
               gsap.set('.work-block', {x: 0, y: 0, width: '100%', height: '100%'});
               gsap.timeline()
               .set('.work-block .block-box', {
                  opacity: 1,
                  x: $(this).find(".image").offset().left,
                  y: $(this).find(".image").offset().top,
                  width: 0,
                  height: $('.work-block .block-box').data('h'),
               })
               .to('.work-block .block-box', {
                  duration: 0.4,
                  width: $('.work-block .block-box').data('w'),
                  onUpdate: () => {
                     gsap.set('.work-block .block-box', {
                        x: $(this).find(".image").offset().left,
                        y: $(this).find(".image").offset().top,
                     })
                  }
               })
               .to('.work-block .block-box', {
                  duration: 0.4,
                  x:0, 
                  y:0, 
                  width: $(window).width(), 
                  height: $(window).height(),
                  onStart: () => {
                     swiper.slideTo(i, 400);
                     detailMove(0.4);
                     targetVideo.pause();
                     $('.contents-wrap').addClass('detail');
                  },
                  onComplete: () => {
                     $(".mySwiper").addClass('detail');
                     $('#header').hide()
                     $('.video-dim').hide()
                     $('.close').show();
                     $(".mySwiper .swiper-slide").removeClass('active');
                     $(".mySwiper .swiper-slide").eq(videoIndex).addClass('active');
                     $(".mySwiper .swiper-slide").eq(videoIndex).find('.control').addClass('active playing').removeClass('paused');
                     playVideo();
                  }
               })
               .to('.work-block .block-box', {
                  duration: 0.4,
                  delay: 0.5,
                  height: 0,
                  onStart: () => {
                     
                  }
               });
               
            } else {
               
               if($(this).is(".active")) {
                  if($(this).find(".control").is(".playing")) {
                     $(this).find(".control").removeClass("playing").addClass('paused');
                     targetVideo.pause();
                  } else {
                     $(this).find(".control").addClass("playing").removeClass('paused');
                     targetVideo.play();
                  }
               } else {
                  gsap.set('.work-block', {x: arrow === 'left' ? 0 : $(window).width(), y: 0, width: 0, height: '100%'});
                  gsap.set('.work-block .block-box', {opacity: 1, x: 0, y: 0, width: '100%', height: '100%'});
                  gsap.to('.work-block', 0.4, {x:0, width: '100%', onComplete: () => {
                     playVideo();
                  }});
                  
                  $(".block-box-side").css({opacity: 1});
                  $(".mySwiper .control").removeClass('active');
                  $(this).find(".control").addClass("active playing").removeClass('paused');
                  gsap.to('.work-block', 0.4, {delay: 1, x: arrow === 'left' ? $(window).width() : 0, width: 0, onStart: () => {
                     gsap.to($(".block-box-side"), 0.3, {opacity: 0});
                  }});
                  swiper.slideTo(i, 600);
                  detailMove(0.6);
               }
            }
            
         });
      });

      $('.close button').on('click',function() {
         swiper.allowTouchMove = true;
         swiper.mousewheel.enable()
         detail = false;
         $('.contents-wrap').removeClass('detail');
         $(".mySwiper").removeClass('detail');
         $('#header').show()
         $('.video-dim').hide()
         $('.close').hide();
         $(".mySwiper .control").removeClass('active');
         gsap.to($(".mySwiper .swiper-slide .block"), 0.4, {x: 0, ease: Cubic.easeOut });
         $('.video-dim').show();
         targetVideo.play();
      });

      $(window).on('resize', function () {
         if(detail){
            detailMove(0)
         }
         
      });
      $(window).trigger('resize');

      $(".sound").on("click", function () {
         if(!$(this).is(".active")) {
            $(this).addClass('active');
            $(".main-content .video-con > video").each(function () {
               $(this)[0].muted = false
            });
         } else {
            $(this).removeClass('active');
            $(".main-content .video-con > video").each(function () {
               $(this)[0].muted = true
           });
         }
      });
      
   }

   function detailMove(speed) {
      $(".mySwiper .swiper-slide").each(function (i) {
         if(i < videoIndex) {
            gsap.to($(this).find(".block"), speed, {x: (-$(window).width()/2) * 0.68, ease: Cubic.easeOut });
         } else if(i > videoIndex) {
            gsap.to($(this).find(".block"), speed, {x: ($(window).width()/2) * 0.68, ease: Cubic.easeOut });
         } else {
            gsap.to($(this).find(".block"), speed, {x: 0, ease: Cubic.easeOut });
         }
      });
   }

   function playVideo () {
      swiper.slideTo(videoIndex);
      $(".mySwiper .swiper-slide").removeClass('active').eq(videoIndex).addClass('active');
      $(".mySwiper .swiper-slide").eq(videoIndex).find('.timeline > span').css({width: `0%`});
      $(".main-content .video-con > video > source").attr('src', `./video/${videos[videoIndex].video}`);
      targetVideo.load();
      targetVideo.play();
      timer = setInterval(() => onUpdate(), 1000/60);
      
   }

   function onUpdate() {
      try{
      percent = targetVideo.currentTime / targetVideo.duration;
      $(".mySwiper .swiper-slide").eq(videoIndex).find('.timeline > span').css({width: `${percent*100}%`});
      setTime();
      if(parseInt(targetVideo.currentTime) >= parseInt(targetVideo.duration)) {
         $(".mySwiper .swiper-slide").eq(videoIndex).find('.timeline > span').css({width: `100%`});
         clearInterval(timer);
         if(!detail) {
            videoIndex++;
            if(videoIndex === videos.length) videoIndex = 0;
            playVideo();
         } else {
            targetVideo.currentTime = 0;
            targetVideo.play();
         }
      }
      } catch(e){}
   }

   function setTime () {
      const time = targetVideo.duration * percent;
      const sm = Math.floor( time / 60 );
      const ss = Math.floor( time % 60 );
      const em = Math.floor( targetVideo.duration / 60 );
      const es = Math.floor( targetVideo.duration % 60 );
      $(".mySwiper .swiper-slide").eq(videoIndex).find('.playtime > span').eq(0).text(`${sm}:${pad(ss, 2)}`);
      $(".mySwiper .swiper-slide").eq(videoIndex).find('.playtime > span').eq(1).text(`${em}:${pad(es, 2)}`);
   }

   function pad(num, size) {
      var s = "0000" + num;
     return s.substr(s.length - size);
   }

})();