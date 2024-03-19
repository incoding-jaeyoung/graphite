'use strict';
// if ('scrollRestoration' in history) {
//     history.scrollRestoration = 'manual';
// }
gsap.registerPlugin(ScrollTrigger);
gsap.config({nullTargetWarn:false});
window.onload = function () {
    $('body').imagesLoaded().done(function (instance) {
        $('body').addClass('load')
    });
    commonTween()
    mousewheel()
}

// const screenNum = '';
const loadingScreen = document.querySelector('.loading-screen')
const loadingIndex = document.querySelector('.loading-screen.index')
const loadingWork = document.querySelector('.loading-screen.work')
const mainNavigation = document.querySelector('.main-navigation')

function mousewheel(){
    if(!isMobile) {
        $("#wrapper").on("mousewheel",function(event,delta){
            if(!$('#wrapper').hasClass('contect-section')){
                if(delta>0){
                    // if($('#wrapper').hasClass('work-secton') === true){
                    //     $('.video-con').click()        
                    // }
                }else if(delta<0){
                    if($('#wrapper').hasClass('work-secton') === false){
                        $('.video-con').click()        
                        console.log("마우스");
                    } else{
                        console.log("마우스111");
                    }
                }
            }
            
    
        });
     } 
    
}

function timerVar() {
    $('#wrapper').addClass('dimmed'),
    console.log('moveend')
  }
function dimmed(){
    var x;
    // var timerVar =  setInterval(() => 
    //     $('#wrapper').addClass('dimmed'),
    // 4000)
    // var timerVar =  setInterval(function(){
    //     $('#wrapper').addClass('dimmed')
    //     console.log('moveend')
    // },4000)

    

    document.addEventListener('mousemove', function() { 
        $('#wrapper').removeClass('dimmed')
        if (x) clearTimeout(x); 
        x = setInterval(timerVar, 4000); 
        console.log('move')
    }, false);
}

// Function to add and remove the page transition screen
function pageTransitionIn(pageName) {
    // $('body').addClass('fixed')
    const screenNum = document.querySelector('.loading-screen.' + pageName)
    navClose()
    return gsap
    .to(screenNum, {
        delay:0, 
        duration:0.6, 
        opacity: 1, 
        ease:"power1.out",
    })
    
}
// Function to add and remove the page transition screen
function pageTransitionOut(container, pageName) {
    //    $('html').removeClass('fixed')
    const screenNum = document.querySelector('.loading-screen.' + pageName)
  // GSAP methods can be chained and return directly a promise
  return gsap
    .timeline({ delay: 0}) // More readable to put it here
    .add('start') // Use a label to sync screen and content animation
    .call(contentReset, [container])
    .set(container.querySelector('.contents'), {
        duration: 0,
      })
    .to(screenNum, {
      duration:0.6,
      opacity:0,
      transformOrigin: 'top left',
      ease:"power1.out",
      onComplete:function(){
        
      }
    }, 'start')
}

// Function to animate the content of each page


function contentReset(container) {
    let triggers = ScrollTrigger.getAll();
        triggers.forEach( trigger => {
        trigger.kill();
    });
}


let isMobile = false;

$(function() {
    isMobile = $(window).width() < 1000;
    barba.init({
        transitions: [
            {
            name: 'index',
            to: { namespace: ['index'] },
            async leave(data) {
                const pageName = data.next.namespace
                setTimeout(() => {
                    $(".shuffleText-menu").each(function (){
                        if($(this).data('shuffleText'))
                            $(this).data('shuffleText').iteration(true);
                    });
                    $('.main-navigation h1 a').addClass('active')
                    $('.main-navigation ul li:eq(0) a').addClass('active')
                    $('.main-navigation ul li:eq(1) a').removeClass('active')
                });
                await pageTransitionIn(pageName)
                data.current.container.remove()
                $('html,body').animate({
                    scrollTop:0
                },300);
            },
            async enter(data) {
                $('#wrapper').removeClass('contact-secton')
                
                const pageName = data.next.namespace
                pageTransitionOut(data.next.container, pageName)
                var winw = $(window).width();
                await window.initMain();
                mainfunction()
                makeShuffleText();
                if(!isMobile) {
                    dimmed()
                 } 
            },
            async once(data) {
                var winw = $(window).width();
                await window.initMain();
                mainfunction()
                $('.main-navigation h1 a').addClass('active')
                $('.main-navigation ul li:eq(0) a').addClass('active')
                $('.main-navigation ul li:eq(0)').click(function(){
                    $('.video-con').click()
                })
                $('.main-navigation h1').click(function(){
                    if($('#wrapper').hasClass('work-secton') === true){
                        $('.video-con').click()        
                    }
                })
                if(!isMobile) {
                    dimmed()
                    
                 } 
            }
          }, {
            name: 'contact',
            to: { namespace: ['contact'] },
            async leave(data) {
                const  pageName = data.next.namespace
                
                setTimeout(() => {
                    $(".shuffleText-menu").each(function (){
                        if($(this).data('shuffleText'))
                            $(this).data('shuffleText').iteration(true);
                    });
                    $('.main-navigation h1 a').removeClass('active')
                    $('.main-navigation ul li:eq(0) a').removeClass('active')
                    $('.main-navigation ul li:eq(1) a').addClass('active')
                });
                await pageTransitionIn(pageName)
                data.current.container.remove()
                $('html,body').animate({
                    scrollTop:0
                },300)
                
            },
            async enter(data) {
                $('#wrapper').removeClass('work-secton')
                $('#wrapper').addClass('contact-secton')
                
                const pageName = data.next.namespace
                await window.removeMain();
                pageTransitionOut(data.next.container, pageName)
                await init()
                makeShuffleText();
                
                
            },
            async once(data) {
                $('#wrapper').addClass('contact-secton')
                $('.main-navigation ul li:eq(1) a').addClass('active')
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


function mainfunction() {
    let flag = true;
    // slder();
    $('.video-con').on('click',function(){
        const winw = $(window).width()
        const thumW = $('.swiper-wrapper .swiper-slide').width()+20
        const thumNum = $('.swiper-wrapper .swiper-slide').length
        const listWidth = thumW*thumNum + winw;

        if($('.contents-wrap').hasClass('detail')){
            return false;
        }
        if(flag == true){
            flag = false;
            gsap.timeline({ delay: 0})
            .add('start')
            // .set('.video-list',{
            //     x:'100vw',
            // },'start')
            .set('.video-list .swiper-slide',{
                x:listWidth,
                // marginLeft:'20rem',
            },'start')
            .to('.video-list-wrap .video-dim',{
                opacity:1,
                onStart:function(){
                    $('#wrapper').addClass('work-secton')
                    $('#header').addClass('normal')    
                }
            },'start')
            // .to('.video-list',{
            //     x:'0',
            //     ease: 'power2.inOut',
            // },'start')
            .to('.video-list .swiper-slide',{
                // duration:0.4,
                ease: 'Power3.easeOut',
                x:'0',
                stagger: 0.05
            },'start')
            .to('.bottom-text',{
                opacity:0,
            },'start')
            .to('.footer-s',{
                opacity:1,
            })
        } else if(flag == false){
            flag = true;
            gsap.timeline({ delay: 0})
            .add('start')
            // .to('.video-list',{
            //     x:'100vw',
            //     ease: 'power2.inOut',
            // },'start')
            .to('.video-list .swiper-slide',{
                x:listWidth,
                // stagger:0.05,
                stagger:{
                    from:"end", 
                    each:0.05
                }, 
                ease: 'Power3.easeIn',
            },'start')
            .to('.video-list-wrap .video-dim',{
                opacity:0,
                onStart:function(){
                    $('#wrapper').removeClass('work-secton')
                    $('#header').removeClass('normal')    
                }
            },'start')
            .to('.bottom-text',{
                opacity:1,
            })
            .to('.footer-s',{
                opacity:0,
            },'start')
        }
    })
}

function init() {
    setTimeout(() => {
        $('body').removeClass('fixed')
    }, 0);
}


function commonTween() {
    $('.main-navigation a').on('click',function(){
        if($(this).hasClass('active')){
            return false;
        }
    })
}


/* 글자섞기 */
function ShuffleText(element, onload, delay, iterationNumber, iterationSpeed, displayedSpeed, index, noMouse = false) {
    this.element = element;
    this.onload = onload;
    this.index = delay === true ? index + 1 : 1;
    this.iterationNumber = iterationNumber;
    this.iterationSpeed = iterationSpeed;
    this.displayedSpeed = displayedSpeed;
    this.texts = this.element.textContent;
    this.startTexts = this.texts;
    this.textsArr = [];
    this.textsNewArr = [];
    this.newText = '';
    this.isRunning = false;
    
    if(!noMouse) {
        this.setupEvents();
    }
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
    
    while(this.textsArr.length > 0) {
      var num = Math.floor(this.textsArr.length * Math.random());
      this.textsNewArr.push(this.textsArr[num]);
      this.textsArr.splice(num, 1);
    }
  };
  
  ShuffleText.prototype.createNewTexts = function() {
    for (var i = 0; i < this.textsNewArr.length; i++) {
      this.newText += this.textsNewArr[i];
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
    
    var that = this;
    for (var i = 0; i < this.iterationNumber; i++) {
      (function(i) {
        setTimeout(function() {
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
    window.addEventListener('load', makeShuffleText, false);
  })();


  function makeShuffleText () {
    var classes = document.getElementsByClassName('shuffleText-menu');
    for (var i = 0; i < classes.length; i++) {
        
        if(!$(classes[i]).data('shuffleText')){
            var shuffleText;
            if($(classes[i]).is(".no-mouse")) {
                shuffleText = new ShuffleText(classes[i], false, false, 7, 50, 0, i, true);
            } else {
                shuffleText = new ShuffleText(classes[i], false, false, 7, 50, 0, i);
            }
            $(classes[i]).data('shuffleText', shuffleText);
        }
    }
    $(".swiper-slide .block").each(function (i) {
        var dt = $(this).find("dt");
        var dd = $(this).find("dd");
        var time = $(this).find(".playtime span");
        var shuffleText1 = new ShuffleText(dt.eq(0)[0], false, false, 8, 60, 0, 11+i);
        var shuffleText2 = new ShuffleText(dd.eq(0)[0], false, false, 8, 60, 0, 11+i);
        var shuffleText3 = new ShuffleText(dd.eq(1)[0], false, false, 8, 60, 0, 11+i);
        // var time1 = new ShuffleText(time.eq(0)[0], false, false, 8, 60, 0, 11+i);
        // var time2 = new ShuffleText(time.eq(1)[0], false, false, 8, 60, 0, 11+i);

        $(this).on('mouseenter', () => {
            shuffleText1.iteration(true);
            shuffleText2.iteration(true);
            shuffleText3.iteration(true);
            // time1.iteration(true);
            // time2.iteration(true);
        });
    });
  }


