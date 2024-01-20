'use strict';
// if ('scrollRestoration' in history) {
//     history.scrollRestoration = 'manual';
// }
gsap.registerPlugin(ScrollTrigger);
// ScrollTrigger.normalizeScroll(true)
window.onload = function () {
    $('body').imagesLoaded().done(function (instance) {
        $('body').addClass('load')
        headerScroll()
        navActive()
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

function delay(n) {
    n = n || 2000
    // Keep official documentation wording, done -> resolve
    // and make it more concise
    return new Promise(resolve => {
      setTimeout(resolve, n)
    })
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
    .to(screenNum, {delay:0, duration:0.6, scaleY: 1, transformOrigin: 'bottom left',opacity: 1,y: '-100vh',ease:"power1.in",})
    
}
// Function to add and remove the page transition screen
function pageTransitionOut(container, pageName) {
    console.log('2')
    //    $('html').removeClass('fixed')
    const screenNum = document.querySelector('.loading-screen.' + pageName)
  // GSAP methods can be chained and return directly a promise
  return gsap
    .timeline({ delay: 0}) // More readable to put it here
    .add('start') // Use a label to sync screen and content animation
    .call(contentReset, [container])
    .set(container.querySelector('.contents'), {
        duration: 0,
        translateY: '80vh',
      })
    .to(screenNum, {
      duration:0.6,
      y: '-200vh',
      skewX: 0,
      transformOrigin: 'top left',
      ease:"power1.out",
    }, 'start')
    .to(container.querySelector('.contents'), {
      duration:0.6,
      translateY: '0%',
      opacity: 1,
      ease: "power1.out",
    }, 'start')
    .to(screenNum, {
        duration: 0,
        y: '0',
        transformOrigin: 'top left',
      })
    .call(contentAnimation, [container])



}

// Function to animate the content of each page

function workfunction(container) {
    console.log('work 스크립트')
    init()
}
function contentReset(container) {
    let triggers = ScrollTrigger.getAll();
        triggers.forEach( trigger => {
        trigger.kill();
    });
}
function contentAnimation(container) {
    headerScroll()
    $('.main-navigation').removeClass('nav-hide')
    init()
}


function navshow(){
    $(mainNavigation).removeClass('nav-hide')
}

function navHide(){
    
    setTimeout(() => {
        $(mainNavigation).addClass('nav-hide')
    }, 1000);
    
}
$(function() {
    barba.init({
        transitions: [
            {
                async leave(data) {
                    console.log('asdasd')
                },
                async enter(data) {
                    $('.main-navigation li').removeClass('active')
                },
              },
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
                $('#wrapper').removeClass('work-secton')
                $('#wrapper').removeClass('about-secton')
                $('#wrapper').removeClass('contact-secton')
                $('#wrapper').addClass('index-secton')
                const pageName = data.next.namespace
                await pageTransitionOut(data.next.container, pageName)
                headerScroll()
                commonTween()
                window.initMain();
            },
            async once(data) {
                $('#wrapper').addClass('index-secton')
                commonTween()
            }
          }, {
            name: 'work',
            to: { namespace: ['work'] },
            async leave(data) {
                const  pageName = data.next.namespace
                await pageTransitionIn(pageName)
                data.current.container.remove()
                $('html,body').animate({
                    scrollTop:0
                },300)
                
            },
            async enter(data) {
                // $('.main-navigation li').removeClass('active')
                // $('.main-navigation li').eq(0).addClass('active')
                const pageName = data.next.namespace
                await pageTransitionOut(data.next.container, pageName)
                // await commonTween()
                setTimeout(() => {
                    
                }, 400);
                headerScroll()
                await commonTween()
                window.removeMain();
                console.log(pageName)
            },
            async afterEnter(data) {
                await smoothScroll()
                
                await videoAutoPlay()
                await datagrid()
            },
            async once(data) {
                // $('.main-navigation li').removeClass('active')
                // $('.main-navigation li').eq(0).addClass('active')
                await smoothScroll()
                await init()
                await videoAutoPlay()
                await commonTween()
                await datagrid()
                
                
            }
          }, {
            name: 'detail',
            to: { namespace: ['detail'] },
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
                // $('.main-navigation li').removeClass('active')
                // $('.main-navigation li').eq(0).addClass('active')
                const pageName = data.next.namespace
                await pageTransitionOut(data.next.container, pageName)
                await commonTween()
                await headerScroll()
                window.removeMain();
            },
            async afterEnter(data) {
                await smoothScroll()
                await videoAutoPlay()
                await work()
            },
            async once(data) {
                // $('.main-navigation li').removeClass('active')
                // $('.main-navigation li').eq(0).addClass('active')
                await init()
                await smoothScroll()
                await videoAutoPlay()
                await commonTween()
                await work()
            }
          }
          , {
            name: 'about',
            to: { namespace: ['about'] },
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
                // $('.main-navigation li').removeClass('active')
                // $('.main-navigation li').eq(1).addClass('active')
                
                $('#wrapper').addClass('about-secton')
                const pageName = data.next.namespace
                await pageTransitionOut(data.next.container, pageName)
                await smoothScroll()
                await headerScroll()
                await commonTween()
                window.removeMain();
            },
            async once(data) {
                // $('.main-navigation li').removeClass('active')
                // $('.main-navigation li').eq(1).addClass('active')
                $('#wrapper').addClass('about-secton')
                await smoothScroll()
                await init()
                await commonTween()
                
            }
          }
          , {
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
               
                // $('.main-navigation li').removeClass('active')
                // $('.main-navigation li').eq(2).addClass('active')
                $('#wrapper').addClass('contact-secton')
                const pageName = data.next.namespace
                await pageTransitionOut(data.next.container, pageName)
                headerScroll()
                await commonTween()
                window.removeMain();
            },
            async once(data) {
                // $('.main-navigation li').removeClass('active')
                // $('.main-navigation li').eq(2).addClass('active')
                $('#wrapper').addClass('contact-secton')
                await init()
                await commonTween()
            }
          }
          
        ],
      });
});

function navClose(){
    $('#header').removeClass('m-menu')
    $('.navTrigger').removeClass('active')
}

function datagrid(){
    $('.grid-item').each(function(){
        const moreNum = $(this).find('.more').length
        if(moreNum == 1){
            $(this).find('.select').show();
        }
        const itemNum = $(this).find('.slider').length
        if(itemNum == 0){
            $(this).addClass('disabled')
            $(this).find('.open').hide();
        }
    })
    var $grid = $('.work-list').isotope({
        itemSelector: '.grid-item',
        percentPosition: true,
        // transitionDuration: 1,
        // visibleStyle: {
        //     opacity: 1,
        //     transform: 'translateY(0)',
        //   },
        //   hiddenStyle: {
        //     opacity: 1,
        //     transform: 'translateY(100px)',
        //   },
        //   transformsEnabled: false,
    });

    const projectNum = $('.work-list .thumb').length;
    $('.project-type li').eq(1).find('span').text(projectNum / 2)
        var $grid = $('.work-list').isotope({
        itemSelector: '.grid-item'
    });
    var filterFns = {};
    $('.work-list .grid-item').append('<span class="block"></span>')
    $('.work-list.all-item').append('<span class="block"></span>')
    $('.filters-button-group').on( 'click', 'button', function(event) {
        contentReset()
        var $target = $( event.currentTarget );
        if($target.hasClass('is-checked')){
            return false;
        }
        $target.toggleClass('is-checked');
        var filterValue = $( this ).attr('data-filter');
        var filter = $target.attr('data-filter');
        filterValue = filterFns[ filterValue ] || filterValue;
        setTimeout(() => {
            $grid.isotope({ filter: filterValue });
        }, 600);
        var tl = gsap.timeline();
        tl.set(".work-list .grid-item span.block, .work-list.all-item .block",{
            delay:0,
            duration: 0,
            y:'100%',
        })
        tl.to(".work-list .grid-item span.block, .work-list.all-item .block",{
            duration: 0.4,
            y:'0%',
            ease:"power1.in",
            onComplete:function(){
                $('.work-list').addClass('sort')
                $grid.isotope({ filter: filterValue });
                $grid.isotope('updateSortData').isotope();
                $grid.isotope('layout');
                
            }
        })
        tl.to(".work-list .grid-item span.block, .work-list.all-item .block",{
            delay:0.4,
            duration: 0.4,
            y:'-200%',
            ease:"power1.out",
            onComplete:function(){
                const filterCount =  $(".grid-item:visible").length;
                $('.project-type li').eq(0).find('span').text(filterCount / 2)
                videoAutoPlay()
            }
        })
        
      });
    $('.filters-button-group ').each( function( i, buttonGroup ) {
        var $buttonGroup = $( buttonGroup );
        $buttonGroup.on( 'click', 'button', function() {
          $buttonGroup.find('.is-checked').removeClass('is-checked');
          $( this ).addClass('is-checked');
        });
      });
    $('.filter-block .title').on( 'click', 'button', function() {
        $('.work-list').removeClass('sort')
        $('.button-group button').removeClass('is-checked')
        $grid.isotope({ filter: '*' });
        $grid.isotope('updateSortData').isotope();
        $('.project-type li').eq(0).find('span').text('0')
    })



      
    
    


    // 필터 초기화
    $('.filter-block .title').on( 'click', 'button', function() {
        $('.work-list').removeClass('sort')
        $('.button-group button').removeClass('is-checked')
        $grid.isotope({ filter: '*' });
        $grid.isotope('updateSortData').isotope();
        $('.project-type li').eq(0).find('span').text('0')
    })

}
function headerScroll() {
    
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var navbarHeight = $('#header').outerHeight();
    $(window).scroll(function (event) {
        didScroll = true;
    });

    setInterval(function () {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 0);

    function hasScrolled() {
        var st = $(window).scrollTop();
        const winw = $(window).width()
        if(winw >= 769){
            // Make sure they scroll more than delta
            if (Math.abs(lastScrollTop - st) <= delta)
                return;
            if (st > lastScrollTop && st > navbarHeight) {
                // Scroll Down
                setTimeout(() => {
                    $(mainNavigation).addClass('nav-hide')
                }, 0);
            } else {
                // Scroll Up
                if (st + $(window).height() < $(document).height()) {
                    setTimeout(() => {
                        // $(mainNavigation).removeClass('nav-hide')
                    }, 0);
                }
            }
            lastScrollTop = st;
            if (st <= 10) {
                
                $(mainNavigation).addClass('nav-default')
                $(mainNavigation).removeClass('nav-hide')
            } else {
                $(mainNavigation).removeClass('nav-default')
            }
        }
    }
}
function navActive(){
    
    $('.main-navigation h1 a').on('click',function(){
        navClose()
    })
    $('.main-navigation li a').on('click',function(){
        
        const navName = $('.contents-wrap').attr('data-barba-namespace')
        console.log(navName)
        if($(this).parent().hasClass('active') && navName == 'detail'){
            console.log('일치')
            return;
        }else if($(this).parent().hasClass('active')){
            return false;
        }else{
            
            const indexNum = $('.main-navigation li a').index(this)
            setTimeout(() => {
                $('#wrapper').removeClass('index-secton')
                if($(this).parent().hasClass('active')){
                    return false;
                }
                else{
                    $('.main-navigation li').removeClass('active')
                    $('.main-navigation li').eq(indexNum).addClass('active')
                }
                if(indexNum == 0){
                    $('#wrapper').addClass('work-secton')
                }else{
                    $('#wrapper').removeClass('work-secton')
                }
                if(indexNum == 1){
                    $('#wrapper').addClass('about-secton')
                }else{
                    $('#wrapper').removeClass('about-secton')
                }
                if(indexNum == 2){
                    $('#wrapper').addClass('contact-secton')
                }else{
                    $('#wrapper').removeClass('contact-secton')
                }
            }, 600);
        }
    })
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
    // $(".js-video-button").each(function(){
    //     const urlAdress = $(this).attr('data-url')
    //     console.log(urlAdress)
    //     $(this).modalVideo({
    //         url: urlAdress
    //     });
    // })
    const work = $('.work-list').clone().appendTo('.work-block' )
    $('.work-list').eq(1).addClass('all-item').addClass('hide')
    $('.project-type a').on('click',function(){
        const indexNum = $('.project-type a').index(this)
        console.log(indexNum)
        $('.project-type li').removeClass('active')
        $('.project-type li').eq(indexNum).addClass('active')
        if(indexNum == 0){
            var tl = gsap.timeline();
            tl.call(
                
            )
            tl.to('.work-block',{
                onStart:function(){
                    $('.work-list').eq(0).removeClass('hide')
                },
                duration: 1.2,
                x:'0%',
                marginLeft: 0,
                ease: "power2.inOut",
                onComplete:function(){
                    $('.work-list').eq(0).removeClass('hide')
                    $('.work-list').eq(1).addClass('hide')
                    contentReset()
                    commonTween()
                }
                // delay:0.5,
                
            })
            tl.call(
                setTimeout(() => {
                    videoAutoPlay()
                    
                }, 500)
            );
        }else if(indexNum == 1){
            const fullwidth = $(".contents").innerWidth()
            const conwidth = $(".contents").width()
            const padding = - (fullwidth - conwidth)
            console.log(padding)
            var tl = gsap.timeline();
            tl.call()
            tl.to('.work-block',{
                onStart:function(){
                    $('.work-list').eq(1).removeClass('hide')
                },
                // delay:0.5,
                duration:1.2,
                x:"-50%",
                marginLeft: padding,
                ease: "power2.inOut",
                onComplete:function(){
                    $('.work-list').eq(1).removeClass('hide')
                    $('.work-list').eq(0).addClass('hide')
                    
                    contentReset()
                }
            }),
            tl.call(
                setTimeout(() => {
                    videoAutoPlay()
                }, 500)
            );
        }

    })
    $('.grid-item').each(function(){
        const itemName = $(this).find('.thumb .title').text()
        const itemCate = $(this).find('.thumb .cate').text()
        $(this).find('.line .title dt').text(itemName)
        $(this).find('.line .title dd').text(itemCate)
    })
    $('.grid-item .line .title').on('click',function(){
        $(this).parents('.grid-item').siblings().find('.line').removeClass('active')
        $(this).parents('.line').toggleClass('active')
    })
    var swiper = new Swiper(".work-slider", {
        slidesPerView: "auto",
        // autoHeight: true,
        slideWidth:'auto',
        spaceBetween:0,
        loop: true,
        observer : true,
        observeParents : true,
        pagination: {
          el: ".swiper-pagination",
          type: "fraction",
          clickable: true,
          type: 'custom',
          renderCustom: function (swiper, current, total) {
                return '0' + current + '/0' + (total); 
            }
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        on: {
            afterInit:function(){
                setTimeout(() => {
                    $('.work-type .type').each(function(){
                        const name = $(this).parents('.swiper').find('.swiper-slide.swiper-slide-active > *').prop('tagName')
                        if(name == 'IMG'){
                            $(this).text('image')
                        }else if(name == 'VIDEO'){
                            $(this).text('video')
                            
                        }
                    })
                }, 500);
                
            },
            slideChangeTransitionEnd : function() {
                $('.work-type .type').each(function(){
                    const name = $(this).parents('.swiper').find('.swiper-slide.swiper-slide-active > *').prop('tagName')
                    if(name == 'IMG'){
                        $(this).text('image')
                    }else if(name == 'VIDEO'){
                        $(this).text('video')
                    }
                })
            },
        },
      });
    
    setTimeout(() => {
        $('body').removeClass('fixed')
    }, 0);
    
    $('.filter-block .title button').on('click',function(){
        $(this).toggleClass('active')
        $(this).parents('.title').next().toggleClass('active')
        setTimeout(() => {
            ScrollTrigger.refresh();
        }, 500);
    })  
    $('.filter-list button').on('click',function(){
        // $(this).toggleClass('active')
    })
    $('#header').on('mouseover',function(){
        if (winw > 768) {
            setTimeout(() => {
                $(mainNavigation).removeClass('nav-hide')
            }, 100);
        }
    })
    var winw = $(window).width();
    $('#header').on('mouseleave',function(){
        if (winw > 768) {
            if($(mainNavigation).hasClass('nav-default')){return false;}
            setTimeout(() => {
                $(mainNavigation).addClass('nav-hide')
            }, 300);
        }
    })
    $('.main-navigation h1 a').on('click',function(){
        $('.main-navigation li').removeClass('active')
    })  
   
    
    
    if (winw > 768) {
        $(".artist .image img").each(function(){
            $(this).attr("src", $(this).attr("src").replace("-m.png", ".png"))
        })
    } else if (winw <= 768) {
        $(".artist .image img").each(function(){
            $(this).attr("src", $(this).attr("src").replace(".png", "-m.png"))
        })
        
    }
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



function work(){
    
    ScrollTrigger.matchMedia({
        "(min-width:769px)": function () {
            $('.work-preview .image').each(function (e) {
                let text = $(this)
                const upmotion = gsap.timeline({
                    scrollTrigger: {
                        trigger: $(this),
                        start: "0% 0%", // 앞 : 객체 , 뒤 : 페이지 전체
                        end: "80% 0%%", // 앞 : 객체 , 뒤 : 페이지 전체
                        scrub: true, //스크롤에 반응 (없으면 자동재생)
                        // markers: true,
                        // scroller: ".contents-wrap",
                        toggleActions: "play none none reverse",
                    },
                });
                upmotion.to(text, 1, {
                    marginLeft:'-2rem',
                    marginRight:'-2rem',
                    // scale:1,
                    ease: "power1.out",
                    onComplete: function () {
        
                    }
                })
            })
        },
        "(max-width:768px)": function () {
            $('.work-preview .image img').each(function (e) {
                let text = $(this)
                const upmotion = gsap.timeline({
                    scrollTrigger: {
                        trigger: $(this),
                        start: "0% 0%", // 앞 : 객체 , 뒤 : 페이지 전체
                        end: "100% 0%%", // 앞 : 객체 , 뒤 : 페이지 전체
                        scrub: true, //스크롤에 반응 (없으면 자동재생)
                        markers: true,
                        // scroller: ".contents-wrap",
                        toggleActions: "play none none reverse",
                    },
                });
                upmotion.to(text, 1.4, {
                    scale:1.2,
                    opacity: 1,
                    ease: "power3.out",
                    onComplete: function () {
        
                    }
                })
            })
        },
    })


    
    
}





