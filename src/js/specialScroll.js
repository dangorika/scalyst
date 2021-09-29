import PubSub from 'pubsub-js';
import {TimelineMax} from 'gsap';
import ScrollMagic from 'scrollmagic';
import './lib/animation.gsap';
import 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators';

var controller = new ScrollMagic.Controller();
let sw;
let tl = new TimelineMax();
let tl1 = new TimelineMax();

tl1.set($('.swiper-wrapper1').find('.swiper-slide:eq(0)'),{
  scale: 2,
  opacity: 1
});
tl.to($('.swiper-wrapper1'),1,{y: -300},0);

for (var i = 0; i < 5; i++) {
  let $el = $('.swiper-wrapper1').find('.swiper-slide:eq('+i+')');

  if(i!==0) tl.to($el, 0.1, {scale: 2.0, opacity: 1.0}, i * 0.2 + 0.1 - 0.3);
  if(i<4) tl.to($el, 0.1, {scale: 1, opacity: 0}, i * 0.2 + 0.2 - 0.3);
}

var scene = new ScrollMagic.Scene({
	  triggerHook:'0.2',
	  triggerElement: '.wrap-vsliders',
	  duration: 800
})
  .setPin('.wrap-vsliders')
  .setTween(tl)
  .on('start', function() {
    $('.sections').css('transform', 'none');
  })
  .on('progress',function(e) {
    PubSub.publish('CURSOR.RECOUNT');
  	// if(!sw) {
  	// 	sw = document.querySelector('.js-vslider-cl').swiper;
  	// 	console.log(sw);
  	// } else{
  	// 	let slide = Math.floor(e.progress*sw.slides.length);
  	// 	sw.slideTo(slide);
  	// }


  })
  .addIndicators({name: '2 (duration: 100)'}) // add indicators (requires plugin)
  .addTo(controller);


setTimeout(function() {

},300);


// function isScrolledIntoView(elem) {
//   var docViewTop = $(window).scrollTop();
//   var docViewBottom = docViewTop + $(window).height();

//   var elemTop = $(elem).offset().top;
//   var elemBottom = elemTop + $(elem).height();

//   return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
// }
// let i =0;
// $(window).scroll(function(e) {

//   console.log(i++);
//   if(isScrolledIntoView($('.vslider'))) {
//   	console.log('PREVEnted');
//   	// PubSub.publish('SCROLL.PREVENT');
//   }


// });
// let container = $('.dslider')[0];
// document.body.addEventListener('mousewheel', function(e) {
//   console.log(e,'native');
//   var evt = document.createEvent('MouseEvents');
//   evt.initEvent(
//     'mousewheel', // in DOMString typeArg,
//     true, // in boolean canBubbleArg,
//     true // in boolean cancelableArg,
//   );
//   evt.wheelDeltaY=e.wheelDeltaY;
//   container.dispatchEvent(evt);
// });
