(function () {

   const isMobile = () => 'ontouchstart' in window;

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

   window.initMain = () => {
      if($(".main-content").length > 0) {
         videos.forEach((x, i) => {
            const videoEl = $(`<video playsinline muted><source src="./video/${x.video}" type="video/mp4" /></video>`);
            $(".main-content .video-con").append(videoEl);
            videoEl[0].load();
            videoEl.one("loadedmetadata", () => {
               count++;
               if(count === videos.length) init();
            });
            $(".mySwiper .swiper-slide").eq(i).find(".image a").append(`<img src="${x.thumb}" />`);
            $(".mySwiper .swiper-slide").eq(i).find("dl").append(x.title);
         });
         $(".main-content .video-con > video").hide().eq(0).show();
      }
      $("html,body").css({overflow: "hidden"});
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
   }

   function init() {
      
      playVideo();

      $(".mySwiper .swiper-slide").on('click', () => {
         targetVideo.pause();
         console.log(swiper);
      });
   }

   function playVideo () {
      swiper.slideTo(videoIndex);
      $(".mySwiper .swiper-slide").removeClass('active').eq(videoIndex).addClass('active');
      $(".mySwiper .swiper-slide").eq(videoIndex).find('.timeline > span').css({width: `0%`});
      $(".main-content .video-con > video").hide().eq(videoIndex).show();
      targetVideo = $(".main-content .video-con > video").eq(videoIndex)[0];
      targetVideo.currentTime = 0;
      targetVideo.play();
      timer = setInterval(() => onUpdate(), 1000/60);
      
   }

   function onUpdate() {
      
      percent = targetVideo.currentTime / targetVideo.duration;
      $(".mySwiper .swiper-slide").eq(videoIndex).find('.timeline > span').css({width: `${percent*100}%`});
      setTime();
      
      if(parseInt(targetVideo.currentTime) >= parseInt(targetVideo.duration)) {
         clearInterval(timer);
         videoIndex++;
         if(videoIndex === videos.length) videoIndex = 0;
         playVideo();
      }
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