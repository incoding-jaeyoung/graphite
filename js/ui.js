'use strict';
// if ('scrollRestoration' in history) {
//     history.scrollRestoration = 'manual';
// }
gsap.registerPlugin(ScrollTrigger);
gsap.config({nullTargetWarn:false});
// ScrollTrigger.normalizeScroll(true)
window.onload = function () {
    $('body').imagesLoaded().done(function (instance) {
        $('body').addClass('load')
        // navActive()
        // overtext()
        $('.main-navigation .menu').on('click',function(){
            $(this).find('.navTrigger').toggleClass('active')
            $('#header').toggleClass('m-menu')
        })        
    });
}
function smoothScroll(){
    // const locoScroll = new LocomotiveScroll({
    //     el: document.querySelector(".contents-wrap"),
    //     smooth: true
    // });
    // locoScroll.on('.contents-wrap', ScrollTrigger.update)
    // ScrollTrigger.scrollerProxy(".contents-wrap", {
    //     scrollTop(value) {
    //       return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    //     }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    //     getBoundingClientRect() {
    //       return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
    //     },
    //     pinType: document.querySelector(".contents-wrap").style.transform ? "transform" : "fixed"
    // });
    // ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    // ScrollTrigger.refresh();
}


// const screenNum = '';
const loadingScreen = document.querySelector('.loading-screen')
const loadingIndex = document.querySelector('.loading-screen.index')
const loadingWork = document.querySelector('.loading-screen.work')
const mainNavigation = document.querySelector('.main-navigation')

// Function to add and remove the page transition screen
function pageTransitionIn(pageName) {
    $('body').addClass('fixed')
    const screenNum = document.querySelector('.loading-screen.' + pageName)
    navClose()
    return gsap
    .to(screenNum, {delay:0, duration:0.6, scaleY: 1, transformOrigin: 'bottom left',opacity: 1, width:'100vw', x: '0',ease:"power1.out",})
    
}
// Function to add and remove the page transition screen
function pageTransitionOut(container, pageName) {
    //    $('html').removeClass('fixed')
    const screenNum = document.querySelector('.loading-screen.' + pageName)
  // GSAP methods can be chained and return directly a promise
  return gsap
    .timeline({ delay: 0.6}) // More readable to put it here
    .add('start') // Use a label to sync screen and content animation
    .call(contentReset, [container])
    .set(container.querySelector('.contents'), {
        duration: 0,
      })
    .to(screenNum, {
      duration:0.6,
      x: '-20vw',
      width:'20vw',
      skewX: 0,
      transformOrigin: 'top left',
      ease:"power1.out",
    }, 'start')
    .to(container.querySelector('.contents'), {
      duration:0.6,
      translateX: '0%',
      opacity: 1,
      ease: "power1.out",
    }, 'start')
    .to(screenNum, {
        duration: 0,
        x: '100vw',
        transformOrigin: 'top left',
      })



}

// Function to animate the content of each page


function contentReset(container) {
    let triggers = ScrollTrigger.getAll();
        triggers.forEach( trigger => {
        trigger.kill();
    });
}




$(function() {
    barba.init({
        transitions: [
            {
            name: 'index',
            to: { namespace: ['index'] },
            async leave(data) {
                const pageName = data.next.namespace
                await pageTransitionIn(pageName)
                data.current.container.remove()
                $('html,body').animate({
                    scrollTop:0
                },300)
                setTimeout(() => {
                   
                }, 400);
            },

            
            
            async enter(data) {
                $('#wrapper').removeClass('contact-secton')
                // $('.main-navigation li').removeClass('active')
                // $('.main-navigation li').eq(0).addClass('default')
                const pageName = data.next.namespace
                pageTransitionOut(data.next.container, pageName)
                // await init()
                await mainfunction()
                await window.initMain();
            },
            async once(data) {
                // $('.main-navigation li').removeClass('active')
                //$('.main-navigation li').eq(0).addClass('default')
                // await init()
                await mainfunction()
                await window.initMain();
            }
          }, {
            name: 'contact',
            to: { namespace: ['contact'] },
            async leave(data) {
                const  pageName = data.next.namespace
                await pageTransitionIn(pageName)
                data.current.container.remove()
                $('html,body').animate({
                    scrollTop:0
                },300)
                setTimeout(() => {
                    
                }, 400);
            },
            async enter(data) {
                $('#wrapper').removeClass('work-secton')
                $('#wrapper').addClass('contact-secton')
                $('.main-navigation li').eq(0).removeClass('default')
                const pageName = data.next.namespace
                await window.removeMain();
                pageTransitionOut(data.next.container, pageName)
                await init()
                
            },
            async once(data) {
                
                $('.main-navigation li').eq(1).addClass('active')
                $('#wrapper').addClass('contact-secton')
                await init()
            }
          }
          
        ],
      });
});

function navClose(){
    $('#header').removeClass('m-menu')
    $('.navTrigger').removeClass('active')
}

var detailSwiper = '';
var swiper = '';

function slder(){
    swiper = new Swiper(".mySwiper", {
        slidesPerView: "auto",
        // autoHeight: true,
        
        freeMode: true,
        centeredSlides: true,
        slideWidth:'auto',
        spaceBetween:30,
        observer : true,
        observeParents : true,
        mousewheel: true,
        // slideToClickedSlide:true,
        preventClicks: true,
        preventClicksPropagation: true,
        // thumbs: {
            // swiper: detailSwiper,
        //   },
        on: {
            click() {
                // console.log('index', this.clickedIndex);
                // swiper.slideTo(this.clickedIndex);
            },
            beforeDestroy:function(){
                gsap.timeline()
                .set('.mySwiper .block', {
                        // duration: 0.2, 
                        delay:0.1,
                        x: '100vw',
                        stagger: 0.1,
                        ease: 'Power1.easeOut'
                })
            },
            beforeInit:function(){
                gsap.to('.mySwiper .block', {
                    duration:0,
                    x: '100vw',
                })
                // $('.mySwiper .swiper-slide').eq(0).addClass('active')
            },
            afterInit:function(){
                $('.video-list-wrap').css({opacity:1})
                gsap.timeline()
                .to('.mySwiper .block', {
                        // duration: 0.2, 
                        delay:0.1,
                        x: '0vw',
                        stagger: 0.1,
                        ease: 'Power1.easeOut'
                })
            },
            slideChangeTransitionEnd : function() {
                
            },
        },
      });

      detailSwiper = new Swiper(".detailSlider", {
        slidesPerView: "auto",
        // autoHeight: true,
        // freeMode: true,
        // minimumVelocity:1,
        speed: 1200,
        centeredSlides: true,
        slideWidth:'auto',
        spaceBetween:'36%',
        observer : true,
        allowTouchMove:false,
        observeParents : true,
        mousewheel: true,
        slideToClickedSlide:true,
        // thumbs: {
            // swiper: swiper,
        //   },
        on: {
            click() {
                // console.log('index', this.clickedIndex);
                // detailSwiper.slideTo(this.clickedIndex);
            },
            beforeDestroy:function(){
                gsap.timeline()
                .set('.mySwiper .block', {
                        // duration: 0.2, 
                        delay:0.1,
                        x: '100vw',
                        stagger: 0.1,
                        ease: 'Power1.easeOut'
                })
            },
            beforeInit:function(){
                gsap.to('.mySwiper .block', {
                    duration:0,
                    x: '100vw',
                })
                $('.mySwiper .swiper-slide').eq(0).addClass('active')
            },
            afterInit:function(){
                $('.video-list-wrap').css({opacity:1})
                gsap.timeline()
                .to('.mySwiper .block', {
                        // duration: 0.2, 
                        delay:0.1,
                        x: '0vw',
                        stagger: 0.1,
                        ease: 'Power1.easeOut'
                })
            },
            slidePrevTransitionStart : function() {
                // gsap.timeline()
                // .set('.work-block .block-box-side',{
                //     delay:0,
                //     duration:0,
                //     opacity:1,
                //     x:'-100%',
                // })
                // .to('.work-block .block-box-side',{
                //     delay:0.2,
                //     duration:0.4,
                //     x:0,
                //     ease: 'Power3.easeOut',
                    
                // })
                // .to('.work-block .block-box-side',{
                //     delay:0.4,
                //     duration:0.8,
                //     x:'100%',
                //     ease: 'Power3.easeOut',
                    
                // })
            },
            slideNextTransitionStart : function() {
                // gsap.timeline()
                // .set('.work-block .block-box-side',{
                //     delay:0,
                //     duration:0,
                //     opacity:1,
                //     x:'100%',
                // })
                // .to('.work-block .block-box-side',{
                //     delay:0.2,
                //     duration:0.4,
                //     x:0,
                //     ease: 'Power3.easeOut',
                    
                // })
                // .to('.work-block .block-box-side',{
                //     delay:0.4,
                //     duration:0.8,
                //     x:'-100%',
                //     ease: 'Power3.easeOut',
                    
                // })
            },
        },
      });
}
function mainfunction() {
    // const tl = gsap.timeline();
    // tl.to('.detailSlider',{
    //     opacity:1,
    // })
    // tl.reversed(true);
    let flag = true;

    slder();

    $('.video-con').on('click',function(){
        if($('.contents-wrap').hasClass('detail')){
            return false;
        }
    //    tl.reversed(!tl.reversed());
        
        if(flag == true){
            flag = false;
            gsap.to('.video-list-wrap .video-dim',{
                opacity:1,
                onComplete:function(){
                    $('#wrapper').addClass('work-secton')
                    $('#header').addClass('normal')    
                }
            })
            setTimeout(() => {
                gsap.timeline()
                .set('.video-list',{
                    x:'100vw',
                })
                .to('.video-list',{
                    x:'0',
                })
            }, 0);
            
        } else if(flag == false){
            flag = true;
            gsap.timeline()
                .to('.video-list',{
                    x:'100vw',
                    ease: 'Power1.easeOut',
                    onComplete:function(){
                        // swiper.destroy();
                        // swiper = undefined;
                    }
                })
            setTimeout(() => {

                gsap.to('.video-list-wrap .video-dim',{
                    opacity:0,
                    onComplete:function(){
                        $('#wrapper').removeClass('work-secton')
                        $('#header').removeClass('normal')    
                    }
                })
            }, 0);
            
        }
    })

    // $('.close button').on('click',function(){
    //     $('.contents-wrap').removeClass('detail')
    //     gsap.timeline()
    //     .to('.work-block .block-box',{
            
    //         duration:0.4,
    //         width:'100%',
    //         height:'100%',
    //         onComplete:function(){
    //             $('.work-contents').removeClass('active')
    //             $('#header').show()
    //             $('.video-list-wrap').show()
    //             $('.detailSlider').hide()
    //             $('.close').hide();
    //             $('.sound button.on').show()
    //             $('.sound button.off').hide()
    //         }
    //     })
        
    //     .to('.work-block',{
    //         delay:0.2,
    //         duration:0.4,
    //         width:'41.6rem',
    //         height:'23.4rem',
    //         top:'50%',
    //         left:'50%',
    //         x:'-50%',
    //         y:'-50%',
    //         marginTop:'2.5rem',
            
    //     })
    //     .to('.work-block .block-box',{
    //         delay:0.2,
    //         duration:0.4,
    //         width:'0%',
    //         ease: 'Power3.easeOut',
    //     })

    //     gsap.to('.video-list-wrap .video-dim',{
    //         opacity:1,
    //         onComplete:function(){
    //             $('#wrapper').addClass('work-secton')
    //             $('#header').addClass('normal')    
    //         }
    //     })
        
    // })
    
    // $('.mySwiper .swiper-slide').on('click',function(){
    //     $('.contents-wrap').addClass('detail')
    //     $('.mySwiper .swiper-slide').removeClass('work-detail')    
    //     $(this).addClass('work-detail')   
    //     gsap.timeline()
    //     .add('start')
    //     .to('.work-block .block-box',{
    //         delay:0.4,
    //         duration:0.4,
    //         width:'100%',
    //         ease: 'Power3.easeOut',
    //         onComplete:function(){
             
    //         }
    //     })
    //     .to('.work-block',{
    //         duration:0.4,
    //         width:'100%',
    //         height:'100%',
    //         top:0,
    //         left:0,
    //         transform:'translate(0%, 0%)',
    //         marginTop:0,
    //         onComplete:function(){
    //             $('.work-contents').addClass('active')
    //             $('#header').hide()
    //             $('.video-list-wrap').hide()
    //             $('.detailSlider').show()
    //             $('.close').show();
    //             $('.sound button.on').hide()
    //             $('.sound button.off').show()
                
    //         }
    //     })
    //     .to('.work-block .block-box',{
    //         delay:0.4,
    //         duration:0.4,
    //         width:'100%',
    //         height:'0%',
    //     })
     
    // });
    
    // $('.detailSlider .swiper-slide .control button.stop').on('click',function(){
    //     $(this).parent().addClass('active')
    //     // video.pause()
    // })
    // $('.detailSlider .swiper-slide .control button.play').on('click',function(){
    //     $(this).parent().removeClass('active')
    //     // video.play()
    // })
    // $('.sound button.off').on('click',function(){
    //     $('.sound button.on').show()
    //     $(this).hide()
    //     // video.muted = true;
    // })
    // $('.sound button.on').on('click',function(){
    //     $('.sound button.off').show()
    //     $(this).hide()
    //     // video.muted = false;
    // })

    
    
    
}

function videoAutoPlay(){
    setTimeout(() => {
        const videos = gsap.utils.toArray('.work-list video')
        videos.forEach(function(video, i) {
            ScrollTrigger.create({
                trigger: video,
                scroller: '',
                start: '0 100%',
                end: '100% 0%',
                // markers: true,
                onEnter: () => video.play(),
                onEnterBack: () => video.play(),
                onLeave: () => video.pause(),
                onLeaveBack: () => video.pause(),
            });
        })
        
    }, 500);
        
  }
function init() {
    
    
    setTimeout(() => {
        $('body').removeClass('fixed')
    }, 0);
    
    
}


function commonTween() {
    
    $('.tada').each(function (e) {
        let tada = $(this)
        gsap.set(tada, {
            opacity: 0,
            scale:0.5
        })
        const upmotion = gsap.timeline({
            scrollTrigger: {
                trigger: $(this),
                start: "0% 80%", // 앞 : 객체 , 뒤 : 페이지 전체
                end: "0% 50%%", // 앞 : 객체 , 뒤 : 페이지 전체
                // scrub: true, //스크롤에 반응 (없으면 자동재생)
                // markers: true,
                toggleActions: "play  none none none",
            },
        });
        upmotion.to(tada, 0.5, {
            opacity: 1,
            scale:1,
            ease: "power3.out",
        })
        .to(tada, 0.5, {
            scale:0.9,
            ease: "power3.out",
        })

    })
    $('.fade').each(function (e) {
        let text = $(this)
        gsap.set(text, {
            opacity:0,
        })
        const upmotion = gsap.timeline({
            scrollTrigger: {
                trigger: $(this),
                start: "0% 80%", // 앞 : 객체 , 뒤 : 페이지 전체
                end: "50% 50%%", // 앞 : 객체 , 뒤 : 페이지 전체
                scrub: true, //스크롤에 반응 (없으면 자동재생)
                markers: true,
                toggleActions: "play none none reverse",
            },
        });
        upmotion.to(text, 3, {
            opacity: 1,
            ease: "power3.out",
            onComplete: function () {

            }
        })

    })
    $('.work-list').eq(0).find('.grid-item').each(function (e) {
        let text = $(this).find('.thumb dt a')
        const upmotion = gsap.timeline({
            scrollTrigger: {
                trigger: $(this),
                start: "50% 90%", // 앞 : 객체 , 뒤 : 페이지 전체
                end: "50% 0%", // 앞 : 객체 , 뒤 : 페이지 전체
                scrub: true, //스크롤에 반응 (없으면 자동재생)
                // markers: true,
                // scroller: ".contents-wrap",
                toggleActions: "play complete none reverse",
            },
        });
        upmotion.to(text,0.4, {
            delay:0,
            y:'10%',
            ease: "none",
            onComplete: function () {

            }
        })

    })
    $('.slide-down').each(function (e) {
        let text = $(this)
        const upmotion = gsap.timeline({
            scrollTrigger: {
                trigger: $(this),
                start: "0% 80%", // 앞 : 객체 , 뒤 : 페이지 전체
                end: "0% 0%", // 앞 : 객체 , 뒤 : 페이지 전체
                //                scrub: true, //스크롤에 반응 (없으면 자동재생)
                //                markers: true,
                toggleActions: "play complete none none",
            },
        });
        upmotion.from(text, 1, {
            y: -50,
            opacity: 0,
            //            ease: "power3.out",
            onComplete: function () {

            }
        })

    })
    $('.slide-up, .about-con > *').each(function (e) {
        // let text = $(this).wrapInner('<div class="over-text-con"></div>')
        // let target = text.find('.over-text-con')
        gsap.set($(this), {
            y:40,
            opacity: 0,
        })
        const upmotion = gsap.timeline({
            scrollTrigger: {
                trigger: $(this),
                start: "top 80%", // 앞 : 객체 , 뒤 : 페이지 전체
                end: "top 0%", // 앞 : 객체 , 뒤 : 페이지 전체
                //scrub: true, //스크롤에 반응 (없으면 자동재생)
                // markers: true,
                toggleActions: "play none none reverse",
            },
        });
        upmotion.to($(this), 1, {
            y:0,
            opacity: 1,
            ease: "power1.out",
        })

    })
    
    ScrollTrigger.matchMedia({
        "(min-width:769px)": function () {
            $('.right-slide .swiper-wrapper').each(function (e){
                let slideWidth = $(this).innerWidth()
                let slide = $('.right-slide .swiper-wrapper .swiper-slide').width()
                let innerWidth = $('.right-slide .swiper-wrapper .swiper-slide').length
                let full = slide * innerWidth
                console.log(slideWidth, slide * innerWidth, full - slideWidth)
                let text = $(this)
                const leftMotion = gsap.timeline({
                    scrollTrigger: {
                        trigger: $('.highlight'),
                        start: "0% 0%", // 앞 : 객체 , 뒤 : 페이지 전체
                        end: "100% 50%",
                        pin:true,
                        scrub: 1, //스크롤에 반응 (없으면 자동재생)
                        // markers: true,
                    },
                });
                gsap.set(text, {
                    x: '0%'
                })
                leftMotion.to(text, 1, {
                    x: - (full - slideWidth + 120),
                    ease: "none",
                })
            })
        },
        "(max-width:768px)": function () {
            $('.right-slide .swiper-slide').each(function (e) {
                var stagger = $(this)
                gsap.set($('.mySwiper'), {
                    x: '0%',
                    opacity: 1,
                    onComplete: function () {
        
                    }
                })
                gsap.set(stagger, {
                    y:'20px',
                    x: '0%',
                    opacity: 0,
                    onComplete: function () {
        
                    }
                })
                gsap.to(stagger, {
                    scrollTrigger: {
                        trigger: $(this),
                        start: "0 90%", // 앞 : 객체 , 뒤 : 페이지 전체
                        // scrub: true, //스크롤에 반응 (없으면 자동재생)
                        // markers: true,
                        toggleActions: "play none none reverse",
                    },
                    y:'0px',
                    opacity:1,
                    stagger: 0.1,
                    ease: 'Power1.easeOut'
                })
                
            })
        },
    })
    
    $('.over-text-wrap').each(function (e) {
        $(this).find(' > *').addClass('over-text').wrapInner('<span class="over-text-con"></span>')
        let text = $(this).find('.over-text-con')
        const textmotion = gsap.timeline({
            scrollTrigger: {
                trigger: $(this),
                start: "0% 80%", // 앞 : 객체 , 뒤 : 페이지 전체
                end: "0% 0%", // 앞 : 객체 , 뒤 : 페이지 전체
                //                scrub: true, //스크롤에 반응 (없으면 자동재생)
                // markers: true,
                toggleActions: "play complete none none",
            },
        });
        textmotion.to(text, 0.5, {
            y: 0,
            stagger: 0.3,
            opacity: 1,
            //            ease: "power2.inOut",
            onComplete: function () {

            }
        })
    })
    $('.up-slide-stagger > *').each(function (e) {
        var stagger = $(this)
        gsap.from(stagger, {
            scrollTrigger: {
                trigger: $(this),
                start: "0 90%", // 앞 : 객체 , 뒤 : 페이지 전체
                // scrub: true, //스크롤에 반응 (없으면 자동재생)
                // markers: true,
                // scroller: ".contents-wrap",
                toggleActions: "play none none reverse",
            },
            y: 40,
            opacity:0,
            
            
            stagger: 1,
            ease: 'Power1.easeOut'
        })
    })

}

function openLayer(selector, href, floor) {
    var flag = selector,
        target = href;
    flag = $(flag);
    flag.load(href, function () {
        $(this).show();
        $(this).find('.modal').show().addClass('scroll')
        $('.overlay').show();
        if(floor){
            $(this).find('.modal .modal-header .swiper-slide').removeClass("active").eq(floor).addClass("active");
        }
       $('body').css('overflow','hidden');
    });
    //    $('body').addClass('scroll')
    return false;
}

function closeLayer(no) {
    var no = no;
    if (no) {
        $('#popup' + no).removeClass('show').hide().removeAttr('style');
    } else {
        $('.popup-wrap').empty()
        $('.popup-wrap').removeAttr('style').hide();
        $('.overlay').hide().removeAttr('style');
        $('body').css('overflow','').removeAttr('style');
        $('.float-menu-wrap').removeClass('active')
    }
    //    $('body').removeClass('fixed')
}


/* 글자섞기 */
function ShuffleText(element, onload, delay, iterationNumber, iterationSpeed, displayedSpeed, index, useEvent = true) {
    this.element = element;
    this.onload = onload;
    this.index = delay === true ? index + 1 : 1;
    this.texts = this.element.textContent;
    this.startTexts = this.texts;
    this.iterationNumber = this.texts.length;
    this.iterationSpeed = iterationSpeed;
    this.displayedSpeed = displayedSpeed;

    this.textsArr = [];
    this.textsNewArr = [];
    this.newText = '';
    this.isRunning = false;
    this.renderCount = 0;

    if(useEvent) this.setupEvents();
}

ShuffleText.prototype.setupEvents = function() {
    if (this.onload === true) {
        this.iteration();
    }
    var that = this;
    this.element.addEventListener('mouseover', function() {
        that.iteration(true);
    }, false);
};

ShuffleText.prototype.createNewArr = function() {
    for (var i = 0; i < this.texts.length; i++) {
        this.textsArr.push(this.texts[i]);
    }
    this.textsNewArr = this.textsArr;
};

ShuffleText.prototype.createNewTexts = function() {
    for (var i = 0; i < this.textsNewArr.length; i++) {
        var num = i + this.renderCount;
        if(num >= this.textsNewArr.length) num = num - this.textsNewArr.length;
        this.newText += this.textsNewArr[num];
    }
    this.element.textContent = this.newText;
};

ShuffleText.prototype.reset = function() {
    this.newText = '';
    this.textsArr = [];
    this.textsNewArr = [];
};

ShuffleText.prototype.render = function() {
    this.createNewArr();
    this.createNewTexts();
    this.reset();
};

ShuffleText.prototype.iteration = function(ev) {
    if (this.isRunning !== false) return;
    if (ev === true) this.index = 1;

    this.isRunning = true;
    this.renderCount = 0;

    var that = this;
    for (var i = 0; i < this.iterationNumber; i++) {
        (function(i) {
        setTimeout(function() {
            that.renderCount++;
            that.render();
            
            if (i === that.iterationNumber - 1) {
            that.element.textContent = '';
            
            for (var j = 0; j < that.startTexts.length; j++) {
                (function(j) {
                setTimeout(function() {
                    that.element.textContent += that.startTexts[j];
                    
                    if (j === that.startTexts.length - 1) {
                    that.isRunning = false;
                    }
                }, j * that.displayedSpeed);
                })(j);
            }
            }
        }, i * that.index * that.iterationSpeed);
        })(i);
    }
};


(function() {
    $(function () {
        var classes = document.getElementsByClassName('shuffleText');
        for (var i = 0; i < classes.length; i++) {
            var shuffleText = new ShuffleText(classes[i], false, false, 8, 50, 0, i);
            $(classes[i]).data('shuffleText', shuffleText);
        }
    });
})();




