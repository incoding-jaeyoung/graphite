(function () {

   const isMobile = () => 'ontouchstart' in window;

   const videos = [
      {
         video: 'video1.mp4', thumb: 'thumb1.png', 
         title: '<dt>KRX1.</dt><dd>Lobby media art</dd>',
         path: 'detail.html'
      }, 
      {
         video: 'video2.mp4', thumb: 'thumb2.png', 
         title: '<dt>KRX2.</dt><dd>Lobby media art</dd>',
         path: 'detail.html'
      }, 
      {
         video: 'video3.mp4', thumb: 'thumb3.png', 
         title: '<dt>KRX3.</dt><dd>Lobby media art</dd>',
         path: 'detail.html'
      }, 
      {
         video: 'video4.mp4', thumb: 'thumb4.png', 
         title: '<dt>KRX4.</dt><dd>Lobby media art</dd>',
         path: 'detail.html'
      }, 
      {
         video: 'video5.mp4', thumb: 'thumb5.png', 
         title: '<dt>KRX5.</dt><dd>Lobby media art</dd>',
         path: 'detail.html'
      }, 
      {
         video: 'video6.mp4', thumb: 'thumb6.png', 
         title: '<dt>KRX6.</dt><dd>Lobby media art</dd>',
         path: 'detail.html'
      }, 
   ];

   let durations = [];
   let totalDurations = 0;
   let count = 0;
   let timer = null;
   let targetVideo = null;
   let videoIndex = 0;
   let startTime = 0;
   let percent = 0;
   let isThumbShow = false;
   let delayThumb = null;
   let startX = 0;
   let startY = 0;
   let moveX = 0;
   let moveY = 0;
   let isTouch = false;
   let startPercent = 0;

   window.initMain = () => {
      if($(".main-content").length > 0) {
         videos.forEach((x, i) => {
            const videoEl = $(`<video playsinline muted><source src="./video/${x.video}" type="video/mp4" /></video>`);
            $(".main-content .video-con").append(videoEl);
            videoEl[0].load();
            videoEl.one("loadedmetadata", () => {
               durations[i] = videoEl[0].duration;
               count++;
               if(count === videos.length) init();
            });
            const thumbEl = $(`<img src="./img/main/${x.thumb}" />`);
            $(".main-content .thumb-con .thumbs").append(thumbEl);
         });
         $(".main-content .video-con > video").hide().eq(0).show();
      }
      $("html,body").css({overflow: "hidden"});
   }
   
   window.initMain();

   window.removeMain = () => {
      try{
         $('.main-content').off('mousewheel');
         clearInterval(timer);
         clearTimeout(delayThumb);
         targetVideo.pause();
         durations = [];
         totalDurations = 0;
         count = 0;
         timer = null;
         targetVideo = null;
         videoIndex = 0;
         startTime = 0;
         percent = 0;
         isThumbShow = false;
         delayThumb = null;
         startX = 0;
         startY = 0;
         moveX = 0;
         moveY = 0;
         isTouch = false;
         startPercent = 0;
      }catch(e) {}
      $("html,body").css({overflow: ""});
   }

   function init() {
      totalDurations = durations.reduce((acc, cur) => acc + cur, 0);
      console.log('durations : ', durations);
      playVideo(0);
      $('.main-content').on('mousewheel', (e, delta) => {
         if(!isThumbShow) {
            $(".main-content .thumb-con").css({display: 'flex', opacity: 0});
            gsap.to($(".main-content .thumb-con"), 1, {opacity: 1});
            $(".main-content .thumb-con img").each(function (i) {
               gsap.set($(this), {scaleX:0, scaleY:0, opacity: 0});
               gsap.to($(this), 0.4, {delay: 0.05 * i, opacity: 1, scaleX:1, scaleY:1, ease: Expo.easeOut });
            });
            
            isThumbShow = true;
         } else {
            clearInterval(timer);
            $(".main-content .video-con > video").each(function () {
               if($(this)[0].playing) $(this)[0].pause()
            });

            if(delta < 0) {
               if(percent < 1)  percent = percent+0.01;
               else             percent = 1;
            } else {
               if(percent > 0)  percent = percent-0.01;
               else             percent = 0;
            }

            const duration = totalDurations * percent;
            let total = 0;
            for(let i=0; i< durations.length; i++) {
               total += durations[i];
               if(total > duration) {
                  videoIndex = i;
                  break;
               }
            }
            
            setTime();
            $(".main-content .bar-con .title p").html(videos[videoIndex].title);
            $(".main-content .video-title").html(videos[videoIndex].title);
            $(".main-content .video-info a").attr('href', videos[videoIndex].path);
            setThumbPos();

            
            gsap.killTweensOf($(".main-content .bar-con"))
            gsap.to($(".main-content .bar-con"), 0.3, {
               left: `${Number(percent*100).toFixed(3)}%`, 
               onComplete: () => {
                  const duration = totalDurations * percent;
                  let total = 0;
                  for(let i=0; i< durations.length; i++) {
                     total += durations[i];
                     if(total > duration) {
                        videoIndex = i;
                        break;
                     }
                  }
                  startTime = durations.reduce((acc, cur, i) => videoIndex > i ? acc + cur : acc, 0);
                  playVideo( duration - startTime );
               }
            });
         }
         clearTimeout(delayThumb);
         delayThumb = setTimeout(() => hideThumb(), 1500);
      });

      $(window).on("touchstart", (e) => {
         startX = e.pageX;
         startY = e.pageY;
         if(isMobile()) {
            startX = e.changedTouches[0].clientX;
            startY = e.changedTouches[0].clientY;
         }
         moveX = startX;
         moveY = startY;
         startPercent = percent;
         isTouch = true;
         e.preventDefault();
         e.stopPropagation();
      });

      $(window).on("touchmove", (e) => {
         if(isTouch) {
            let pageX = e.pageX;
            let pageY = e.pageY;
            if(isMobile()) {
               pageX = e.changedTouches[0].clientX;
               pageY = e.changedTouches[0].clientY;
            }
            moveX = startX - pageX;
            moveY = startY - pageY;
            if(!isThumbShow) {
               
               $(".main-content .thumb-con").css({display: 'flex', opacity: 0});
               gsap.to($(".main-content .thumb-con"), 1, {opacity: 1});
               gsap.to($(".main-content .thumb-con"), 1, {opacity: 1});
               $(".main-content .thumb-con img").each(function (i) {
                  gsap.set($(this), {scaleX:0, scaleY:0, opacity: 0});
                  gsap.to($(this), 0.4, {delay: 0.03 * i, opacity: 1, scaleX:1, scaleY:1, ease: Expo.easeOut });
               });

               isThumbShow = true;
            } else {

               clearInterval(timer);
               $(".main-content .video-con > video").each(function () {
                  if($(this)[0].playing) $(this)[0].pause()
               });
               
               if(moveX < 0) {
                  if(percent < 1)  percent = startPercent + (-moveX * 0.001);
                  else             percent = 1;
               } else {
                  if(percent > 0)  percent = startPercent - (moveX * 0.001);
                  else             percent = 0;
               }

               const duration = totalDurations * percent;
               let total = 0;
               for(let i=0; i< durations.length; i++) {
                  total += durations[i];
                  if(total > duration) {
                     videoIndex = i;
                     break;
                  }
               }
               
               setTime();
               $(".main-content .bar-con .title p").html(videos[videoIndex].title);
               $(".main-content .video-title").html(videos[videoIndex].title);
               $(".main-content .video-info a").attr('href', videos[videoIndex].path);
               setThumbPos();

               
               gsap.killTweensOf($(".main-content .bar-con"))
               gsap.to($(".main-content .bar-con"), 0.3, {
                  left: `${Number(percent*100).toFixed(3)}%`, 
                  onComplete: () => {
                     const duration = totalDurations * percent;
                     let total = 0;
                     for(let i=0; i< durations.length; i++) {
                        total += durations[i];
                        if(total > duration) {
                           videoIndex = i;
                           break;
                        }
                     }
                     startTime = durations.reduce((acc, cur, i) => videoIndex > i ? acc + cur : acc, 0);
                     playVideo( duration - startTime );
                  }
               });
            }
            clearTimeout(delayThumb);
            delayThumb = setTimeout(() => hideThumb(), 1500);
         }
      });

      $(window).on("touchend", (e) => {
         isTouch = false;
      });
   }

   function hideThumb () {
      gsap.to($(".main-content .thumb-con"), 0.6, {opacity: 0, onComplete: () => {
         $(".main-content .thumb-con").hide();
         isThumbShow = false;
      }});
   }

   function playVideo ( start ) {
      $(".main-content .video-con > video").hide().eq(videoIndex).show();
      $(".main-content .bar-con .title p").html(videos[videoIndex].title);
      $(".main-content .video-title").html(videos[videoIndex].title);
      $(".main-content .video-info a").attr('href', videos[videoIndex].path);
      targetVideo = $(".main-content .video-con > video").eq(videoIndex)[0];
      targetVideo.currentTime = start;
      startTime = durations.reduce((acc, cur, i) => videoIndex > i ? acc + cur : acc, 0);
      targetVideo.play();
      timer = setInterval(() => onUpdate(), 1000/60);
   }

   function onUpdate() {
      percent = (targetVideo.currentTime + startTime) / totalDurations;
      setTime();
      setThumbPos();
      $(".main-content .bar-con").css({left: `${Number(percent*100).toFixed(3)}%`});
      
      if(parseInt(targetVideo.currentTime) >= parseInt(targetVideo.duration)) {
         clearInterval(timer);
         videoIndex++;
         if(videoIndex === videos.length) videoIndex = 0;
         playVideo(0);
      }
   }

   function setTime () {
      const time = totalDurations * percent;
      const sm = Math.floor( time / 60 );
      const ss = Math.floor( time % 60 );
      const em = Math.floor( totalDurations / 60 );
      const es = Math.floor( totalDurations % 60 );
      $(".main-content .time-con").text(`${sm}:${pad(ss, 2)} / ${em}:${pad(es, 2)}`);
      $(".main-content .bar-con .time").text(`${sm}:${pad(ss, 2)}`);
      
   }

   function setThumbPos () {
      if($(".main-content .thumb-con .thumbs").width() + 100> $(window).width()) {
         const end = ($(".main-content .thumb-con .thumbs").width() + 100) - $(window).width();
         gsap.set($(".main-content .thumb-con .thumbs"), {x: -(end * percent) + 50});
      } else {
         gsap.set($(".main-content .thumb-con .thumbs"), {x: 0});
      }
   }

   function pad(num, size) {
      var s = "0000" + num;
     return s.substr(s.length - size);
   }

})();