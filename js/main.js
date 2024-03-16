(function () {


   const videos = [
      'video1.mp4',
      'video2.mp4',
      'video3.mp4',
      'video4.mp4',
      'video5.mp4',
      'video1.mp4',
      'video2.mp4',
      'video3.mp4',
      'video4.mp4',
      'video5.mp4',
   ];

   let count = 0;
   let timer = null;
   let targetVideo = null;
   let videoIndex = 0;
   let percent = 0;
   let detail = false;
   let swiper;
   let isMobile = false;
   
   

   window.initMain = () => {
      
      if($(".main-content").length > 0) {
         isMobile = $(window).width() < 1000;
         
         if(!isMobile) {
            addSwiper();
            $("body").removeClass('mobile');
         } else {
            $("body").addClass('mobile');
         }
         
         videos.forEach((x, i) => {
            const videoEl = $(`<video playsinline muted><source src="./video/${x}" type="video/mp4" /></video>`);
            $(".main-content .video-con").append(videoEl);
            videoEl[0].load();
            videoEl.one("loadedmetadata", () => {
               
               count++;
               if(count === videos.length) init();
            });
            
            $(".mySwiper .swiper-slide").eq(i).find(".num").html(pad(i+1, 2));
         });

         $(".main-content .video-con > video").hide().eq(0).show();

      }
      // $("html,body").css({overflow: "hidden"});
      setTimeout(() => {
         if(!$('.close button').data('shuffleText')){
            var shuffleText = new ShuffleText($('.close button')[0], false, false, 8, 50, 0, 10);
            $('.close button').data('shuffleText', shuffleText).addClass("shuffleText-menu");
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
      if(!isMobile) {
         playVideo();
      }

      $(".main-content .video-con > video").each((i) => setTime(i));

      $(window).on('resize', function () {
         var fullScreenElement = document.fullscreenElement || document.msFullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;
         if(fullScreenElement) {
            return;
         }
         if($(window).width() < 1000) {
            if(!isMobile) {
               isMobile = true;
               if(swiper) {
                  swiper.destroy();
                  swiper = null;
               }
               detail = false;
               $("body").addClass('mobile');
               $('.contents-wrap').removeClass('detail');
               $(".mySwiper").removeClass('detail');
               $('#header').show()
               $('.video-dim').hide()
               $('#wrapper').removeClass('work-secton');
               $('#header').removeClass('normal');
               $('.close').hide();
               $(".mySwiper .control").removeClass('active');
               gsap.set($(".mySwiper .swiper-slide .block"), {x: 0});
               clearInterval(timer);
               if(targetVideo) targetVideo.pause();
               totalDurations = 0;
               count = 0;
               timer = null;
               targetVideo = null;
               videoIndex = 0;
               closeLayerPopup();
            }
         } else {
            if(isMobile) {
               isMobile = false;
               addSwiper();
               clearInterval(timer);
               totalDurations = 0;
               count = 0;
               timer = null;
               detail = false;
               $("body").removeClass('mobile');
               $('.contents-wrap').removeClass('detail');
               $(".mySwiper").removeClass('detail');
               $('#header').show()
               $('.video-dim').hide()
               $('#wrapper').removeClass('work-secton');
               $('#header').removeClass('normal');
               $('.close').hide();
               $(".mySwiper .control").removeClass('active');
               gsap.set($(".mySwiper .swiper-slide .block"), {x: 0});
               targetVideo = $(".main-content .video-con > video")[0];
               targetVideo.load();
               videoIndex = 0;
               closeLayerPopup();
               playVideo();
               
            }
         }

         if(detail){
            detailMove(0)
         }

         
      });

      $(window).trigger('resize');
      
      $(".mySwiper .swiper-slide").each(function (i) {
         
         $(this).find('.block').on('click', ( e ) => {
            
            if(!isMobile) {
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
                  if($(this).hasClass('active')){
                           swiper.slideTo(i, 400);
                           detailMove(0.4);
                           targetVideo.pause();
                           $('.contents-wrap').addClass('detail');
                           $(".mySwiper").addClass('detail');
                           $('#header').hide()
                           $('.video-dim').hide()
                           $('.close').show();
                           $(".mySwiper .swiper-slide").removeClass('active');
                           $(".mySwiper .swiper-slide").eq(videoIndex).addClass('active');
                           $(".mySwiper .swiper-slide").eq(videoIndex).find('.control').addClass('active playing').removeClass('paused');
                           playVideo();
                           if ($(".video-con video").prop('muted')) {
                              $(".main-content .sound").click();
                           } else {
                                 
                           }
                           
                  }
                  else{
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
                        ease: 'power3.inOut',
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
                        // ease: 'power3.inOut',
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
                           if ($(".video-con video").prop('muted')) {
                              $(".main-content .sound").click();
                           } else {
                                 
                           }
                        }
                     })
                     .to('.work-block .block-box', {
                        duration: 0.8,
                        delay: 0.2,
                        // height: 0,
                        opacity:0,
                        onStart: () => {
                           
                        }
                     });
                  }
                  
                  
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

                     // gsap.set('.work-block', {x: arrow === 'left' ? 0 : $(window).width(), y: 0, width: 0, height: '100%'});
                     // gsap.set('.work-block .block-box', {opacity: 1, x: 0, y: 0, width: '100%', height: '100%'});
                     gsap.to('.work-block', 0.4, {x:0, width: '100%', onComplete: () => {
                        playVideo();
                     }});
                     
                     // $(".block-box-side").css({opacity: 1});
                     $(".mySwiper .control").removeClass('active');
                     $(this).find(".control").addClass("active playing").removeClass('paused');
                     // gsap.to('.work-block', 0.4, {delay: 1, x: arrow === 'left' ? $(window).width() : 0, width: 0, onStart: () => {
                        gsap.to($(".block-box-side"), 0.3, {opacity: 0});
                     // }});
                     swiper.slideTo(i, 600);
                     detailMove(0.6);
                  }
               }
            } else {
               showLayerPopup(i);
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
         setTimeout(() => {
            $(".shuffleText-menu").each(function (){
                if($(this).data('shuffleText'))
                    $(this).data('shuffleText').iteration(true);
            });
         });
      });
      

      $(".main-content .sound").on("click", function () {
         if(!$(this).is(".active")) {
            $(this).addClass('active');
            $(".layer-player .sound-btn").addClass('active').text('Sound OFF');
            $(".main-content .video-con > video").each(function () {
               $(this)[0].muted = false
            });
            $(".layer-player .popup-video > video")[0].muted = false;
         } else {
            $(this).removeClass('active');
            $(".layer-player .sound-btn").removeClass('active').text('Sound ON');
            $(".main-content .video-con > video").each(function () {
               $(this)[0].muted = true
            });
            $(".layer-player .popup-video > video")[0].muted = true;
         }
      });

      $(".layer-player .sound-btn").on('click', function () {
         if(!$(this).is(".active")) {
            $(this).addClass('active');
            $(".layer-player .sound-btn").addClass('active').text('Sound OFF');
            $(".main-content .video-con > video").each(function () {
               $(this)[0].muted = false
            });
            $(".layer-player .popup-video > video")[0].muted = false;
         } else {
            $(this).removeClass('active');
            $(".layer-player .sound-btn").removeClass('active').text('Sound ON');
            $(".main-content .video-con > video").each(function () {
               $(this)[0].muted = true
            });
            $(".layer-player .popup-video > video")[0].muted = true;
         }
      });
      $(".layer-player .fs-btn").on('click', function () {
         var videoEl = $(".layer-player .popup-video > video")[0];
         if(videoEl.requestFullscreen) {
            videoEl.requestFullscreen();
         } else if (videoEl.mozRequestFullScreen) {
            videoEl.mozRequestFullScreen();
         } else if (videoEl.webkitRequestFullscreen) {
            videoEl.webkitRequestFullscreen();
         } else if(videoEl.webkitEnterFullscreen){
            videoEl.webkitEnterFullscreen();
         } else {
            videoEl.webkitEnterFullscreen();
         }
      });
      

      $(".close-layer").on("click", function () {
         closeLayerPopup();
      });
      
   }


   function addSwiper() {
      swiper = new Swiper(".mySwiper", {
         slidesPerView: "auto",
         freeMode: true,
         centeredSlides: true,
         slideWidth:'auto',
         spaceBetween:20,
         observer : true,
         observeParents : true,
         mousewheel: true,
         preventClicks: true,
         preventClicksPropagation: true,
         on: {
            afterInit:function(){
               $('.video-list-wrap').css({opacity:1})
            },
            
         },
      });
   } 

   function detailMove(speed) {
      var ease = speed === 0.6 ? Cubic.easeInOut : Cubic.easeOut;
      $(".mySwiper .swiper-slide").each(function (i) {
         if(i < videoIndex) {
            gsap.to($(this).find(".block"), speed, {x: (-$(window).width()/2) * 0.68, ease: ease });
         } else if(i > videoIndex) {
            gsap.to($(this).find(".block"), speed, {x: ($(window).width()/2) * 0.68, ease: ease });
         } else {
            gsap.to($(this).find(".block"), speed, {x: 0, ease: ease });
         }
      });
   }

   function playVideo () {
      if(swiper) {
         swiper.slideTo(videoIndex);
      }
      $(".main-content .video-con > video").each(function () {
         $(this)[0].pause();
      });
      $(".mySwiper .swiper-slide").removeClass('active').eq(videoIndex).addClass('active');
      $(".mySwiper .swiper-slide").eq(videoIndex).find('.timeline > span').css({width: `0%`});
      $(".main-content .video-con > video").eq(videoIndex).show().css({'z-index': 10});
      targetVideo = $(".main-content .video-con > video").eq(videoIndex)[0];
      gsap.set(targetVideo, {opacity:0});
      gsap.to(targetVideo, 0.4, { opacity:1, onComplete: () => {
         $(".main-content .video-con > video").hide();
         $(targetVideo).show().css({'z-index': ''});
      }});
      
      // targetVideo.currentTime = 0;
      targetVideo.play();
      timer = setInterval(() => onUpdate(), 1000/60);
      
   }

   function showLayerPopup ( idx ) {
      $(".layer-player").show();
      videoIndex = idx;
      $(".layer-player .popup-video > video > source").attr('src', `./video/${videos[videoIndex]}`);
      $(".layer-player dl").html($(".mySwiper .swiper-slide").eq(idx).find('dl').html());
      targetVideo = $(".layer-player .popup-video > video")[0];
      targetVideo.load();
      targetVideo.play();
      gsap.set($(".layer-player .bar-track"), {width: 0});
      timer = setInterval(() => onUpdate(), 1000/60);
      $(".layer-player .play-btn").addClass("active").text('PAUSE');
      $(".layer-player .play-btn").on("click", function () {
         if(!$(this).is(".active")) {
            $(this).addClass("active").text('PAUSE');
            targetVideo.play()
            

         } else {
            $(this).removeClass("active").text('PLAY');
            
            targetVideo.pause()
         }
      });
      if(!$(this).find('.sound-btn').is(".active")) {
         console.log('asdasd')
         $(".layer-player .sound-btn").addClass('active').text('Sound OFF');
         $(".layer-player .popup-video > video")[0].muted = false;
      } else {
         $(".layer-player .sound-btn").removeClass('active').text('Sound ON');
         $(".layer-player .popup-video > video")[0].muted = true;
      }
   }

   function closeLayerPopup () {
      if(targetVideo) targetVideo.pause();
      clearInterval(timer);
      $(".layer-player").hide();
      $(".layer-player .play-btn").off("click").removeClass("active").text('PLAY');
   }

   function onUpdate() {
      try{
         percent = targetVideo.currentTime / targetVideo.duration;
         if(!isMobile) {
            $(".mySwiper .swiper-slide").eq(videoIndex).find('.timeline > span').css({width: `${percent*100}%`});
            setTime(videoIndex);
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
         } else {
            gsap.set($(".layer-player .bar-track"), {width: `${percent * 100}%`});
            if(parseInt(targetVideo.currentTime) >= parseInt(targetVideo.duration)) {
               $(".layer-player .play-btn").removeClass("active").text('PLAY');
            }
            
         }
      } catch(e){}
   }

   function setTime ( idx ) {
      const time = $(".main-content .video-con > video").eq(idx)[0].duration * percent;
      const sm = Math.floor( time / 60 );
      const ss = Math.floor( time % 60 );
      const em = Math.floor( $(".main-content .video-con > video").eq(idx)[0].duration / 60 );
      const es = Math.floor( $(".main-content .video-con > video").eq(idx)[0].duration % 60 );
      $(".mySwiper .swiper-slide").eq(idx).find('.playtime > span').eq(0).text(`${sm}:${pad(ss, 2)}`);
      $(".mySwiper .swiper-slide").eq(idx).find('.playtime > span').eq(1).text(`${em}:${pad(es, 2)}`);

      $(".layer-player").find('.playtime > span').eq(0).text(`${sm}:${pad(ss, 2)}`);
      $(".layer-player").find('.playtime > span').eq(1).text(`${em}:${pad(es, 2)}`);
      
   }

   function pad(num, size) {
      var s = "0000" + num;
     return s.substr(s.length - size);
   }
   

})();