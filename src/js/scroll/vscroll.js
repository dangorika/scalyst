import {TweenMax} from 'gsap';
import ScrollMagic from 'scrollmagic';
import './../lib/animation.gsap';
import './../lib/debug.addIndicators.min';

import PubSub from 'pubsub-js';

import { g } from './../global';

export default () => {

  // g.slidersController = new ScrollMagic.Controller();

  // $($('.js-vslider .vslide')[0]).addClass('is-active');
  // $($('.js-vslider-pages .vpage')[0]).addClass('is-active');
  // $($('.js-vslider-cl .vslide')[0]).addClass('is-active');
  // $($('.js-vslider-pages-cl .vpage')[0]).addClass('is-active');

  // let vslideCount = $('.js-vslider .vslide').length - 2;

  // let tl1 = new TimelineMax();

  // $('.js-vslider .vslide').each((index, el) => {
  //   if (index < vslideCount-1) {
  //     tl1
  //       .to('.vslider__track', 0.5, {y: -100*(index+1)})
  //       .to('.vpages__track', 0.5, {y: -23.333*(index+1)});
  //   }
  // });

  // let part1 = 0, vslides = $('.js-vslider .vslide').length-1;
  // let vsliderDirection = 1;

  // let vsl = new ScrollMagic.Scene({
  //   triggerElement: '#vsliderPin',
  //   triggerHook: 'onCenter',
  //   duration: vslideCount*10+'%'
  // })
  //   .on('progress', e => {

  //     if (part1 < e.progress && vsliderDirection === 1) {
  //       part1 += 1/vslides;
  //       console.log('forward');
  //     }

  //     if (e.progress === 1) {
  //       part1 = 1;
  //       vsliderDirection = -1;
  //     }


  //     if (part1 > e.progress+1/vslides && vsliderDirection === -1) {
  //       part1 -= 1/vslides;
  //       console.log('backward');
  //     }

  //     if (e.progress === 0) {
  //       part1 = 0;
  //       vsliderDirection = 1;
  //     }


  //     let indexSlide = Math.round(part1*vslides);
  //     console.log(indexSlide);
  //     $('.vslide').removeClass('is-active');
  //     $('.vpage').removeClass('is-active');
  //     $($('.js-vslider .vslide')[indexSlide]).addClass('is-active');
  //     $($('.js-vslider-pages .vpage')[indexSlide]).addClass('is-active');
  //     $($('.js-vslider-cl .vslide')[indexSlide]).addClass('is-active');
  //     $($('.js-vslider-pages-cl .vpage')[indexSlide]).addClass('is-active');

  //     // $('#vsliderPin').css({
  //     //   paddingTop: $('#vsliderPin').height()*e.progress
  //     // });
  //     // $('.vsliders').css({
  //     //   marginTop: -$('#vsliderPin').height()*e.progress/2
  //     // });

  //   })
  //   // .setPin('#vsliderPin')
  //   .setTween(tl1)
  //   .addIndicators({
  //     name: 'vslide scene',
  //     colorTrigger: 'tomato',
  //     colorStart: 'green',
  //     indent: 200
  //   })
  //   .addTo(g.slidersController);

  let scaleIndex = 2.0;

  g.mobile ? scaleIndex = 1.1 : scaleIndex = 2.0;


  g.slidersController = new ScrollMagic.Controller();

  let vslides = $('.js-vslider').find('.vslide').length-1;

  console.log(vslides);
  let sw;
  let tl = new TimelineMax();
  let tl1 = new TimelineMax();

  tl1
    .set($('.js-scroll-slider').find('.js-scroll-slide:eq(0)'),{
      scale: scaleIndex,
      opacity: 1,
      color: '#333'
    })
    .set($('.js-scroll-pages').find('.js-scroll-page:eq(0)'),{
      opacity: 1,
      color: '#333'
    })
    .set($('.js-scroll-pages').find('.js-scroll-page:eq(0)').find('.total'),{
      opacity: 1
    });

  $('.js-scroll-pages').find('.js-scroll-page:eq(0)').addClass('is-active');
  tl.to($('.js-scroll-slider'),1,{y: -300},0);
  tl.to($('.js-scroll-pages'),1,{y: -70},0);

  for (var i = 0; i < vslides+1; i++) {
    let $el = $('.js-scroll-slider').find('.js-scroll-slide:eq('+i+')');
    let $page = $('.js-scroll-pages').find('.js-scroll-page:eq('+i+')');
    if(i!==0) tl.to($el, 0.1, {scale: scaleIndex, opacity: 1.0, color: '#333'}, i * 0.2 + 0.1 - 0.3);
    if(i!==0) tl.to($page, 0.1, {color: '#333', opacity: 1}, i * 0.2 + 0.1 - 0.3);
    if(i!==0) tl.to($page.find('.total'), 0.1, {opacity: 1}, i * 0.2 + 0.1 - 0.3);
    if(i<vslides) tl.to($el, 0.1, {scale: 1, opacity: 0, color: '#ccc'}, i * 0.2 + 0.2 - 0.3);
    if(i<vslides) tl.to($page, 0.1, {color: '#ccc', opacity: 0}, i * 0.2 + 0.2 - 0.3);
    if(i<vslides) tl.to($page.find('.total'), 0.1, {opacity: 0}, i * 0.2 + 0.2 - 0.3);
  }

  var scene = new ScrollMagic.Scene({
    triggerHook: '0.25',
    triggerElement: '.wrap-vsliders',
    duration: vslides*200
  })
    .setPin('.wrap-vsliders')
    .setTween(tl)
    .on('start', function() {
      $('.sections').css('transform', 'none');
    })
    .on('progress',function(e) {
      PubSub.publish('CURSOR.RECOUNT');
    })
    // .addIndicators({name: '2 (duration: 100)'}) // add indicators (requires plugin)
    .addTo(g.slidersController);



  let dslides = $('.dslide').length-1;
  console.log(dslides);

  let scrollDistance = 1800;
  let scrollDurationIndex = 400;
  let scrollDelay = 0.15;

  g.mobile ? scrollDistance = 1500 : scrollDistance = 1800;
  g.mobile ? scrollDurationIndex = 400 : scrollDurationIndex = 400;
  g.mobile ? scrollDelay = 0.15 : scrollDelay = 0.15;

  let tl2 = new TimelineMax();
  let tl3 = new TimelineMax();

  $('.dslide:eq(0)').find('.dslider__dot').addClass('is-active');

  tl3
    .set($('.dslide:eq(0)').find('.dslider__pic'),{
      scale: 2,
    })
    .set($('.dslide:eq(0)').find('.dslider__text h2'),{
      opacity: 1
    })
    .set($('.dslide:eq(0)').find('.dslider__text p'),{
      opacity: 1,
      y: 0
    });

  if (g.mobile) {
    tl3
      .set($('.dslide:eq(0)'),{
        opacity: 1
      });
  }


  console.log(scrollDistance);

  tl2.to($('.js-scroll-dslider'),1,{y: -scrollDistance},0);
  tl2.to($('.js-rect'),1,{y: scrollDistance/2, x: scrollDistance/2},0);

  for (var j = 0; j < dslides+1; j++) {
    let $slide = $('.dslide:eq('+j+')');
    if(j!==0) tl2.to($slide.find('.dslider__pic'), 0.1, {scale: 2}, j * scrollDelay + 0.1 - 0.3);
    if(j!==0) tl2.to($slide.find('.dslider__text h2'), 0.1, {opacity: 1}, j * scrollDelay + 0.1 - 0.3);
    if(j!==0) tl2.to($slide.find('.dslider__text p'), 0.1, {opacity: 1, y: 0}, j * scrollDelay + 0.1 - 0.3);
    if(j!==0 && g.mobile) tl2.to($slide, 0.1, {opacity: 1}, j * scrollDelay + 0.1 - 0.3);

    if(j<dslides) tl2.to($slide.find('.dslider__pic'), 0.1, {scale: 1}, j * scrollDelay + 0.2 - 0.3);
    if(j<dslides) tl2.to($slide.find('.dslider__text h2'), 0.1, {opacity: 0}, j * scrollDelay + 0.2 - 0.3);
    if(j<dslides) tl2.to($slide.find('.dslider__text p'), 0.1, {opacity: 0, y: 20}, j * scrollDelay + 0.2 - 0.3);
    if(j<dslides && g.mobile) tl2.to($slide, 0.1, {opacity: 0}, j * scrollDelay + 0.2 - 0.3);
  }

  var scene2 = new ScrollMagic.Scene({
    triggerHook: '0.1',
    triggerElement: '.wrap-dslider',
    duration: dslides*scrollDurationIndex
  })
    .setPin('.wrap-dslider')
    .setTween(tl2)
    .on('start', function() {
      $('.sections').css('transform', 'none');
    })
    .on('progress',function(e) {
      PubSub.publish('CURSOR.RECOUNT');
    })
    // .addIndicators({name: '1 (duration: 100)'}) // add indicators (requires plugin)
    .addTo(g.slidersController);


  // $($('.js-dslider .dslide')[0]).addClass('is-active');
  // let dslideCount = $('.js-dslider .dslide').length;


  // let tl2 = new TimelineMax();

  // $('.js-dslider .dslide').each((index, el) => {
  //   if (index < dslideCount) {
  //     tl2.to('.dslider__track', 0.1, {y: -250*(index+1)}, index * 0.2 + 0.2 - 0.3);
  //   }
  // });

  // let part2 = 0, dslides = $('.js-dslider .dslide').length-1;
  // let trackWidth = $('.dslide').height() * dslides;

  // let dPinTop = $('#dsliderPin').offset().top - $('.sections').offset().top;
  // console.log(dPinTop);

  // let dsliderDirection = 1;

  // let dsl = new ScrollMagic.Scene({
  //   triggerElement: '.wrap-dslider',
  //   triggerHook: '0.2',
  //   duration: dslideCount*100
  // })
  //   .on('progress', e => {
  //     let t = e.progress * trackWidth;
  //     TweenLite.set('.js-rect', {x: t/1.75, y: t/1.75});

  //     if (part2 < e.progress && dsliderDirection === 1) {
  //       part2 += 1/dslides;
  //       console.log('forward');
  //     }

  //     if (e.progress === 1) {
  //       part2 = 1;
  //       dsliderDirection = -1;
  //     }


  //     if (part2 > e.progress+1/dslides && dsliderDirection === -1) {
  //       part2 -= 1/dslides;
  //       console.log('backward');
  //     }

  //     if (e.progress === 0) {
  //       part2 = 0;
  //       dsliderDirection = 1;
  //     }


  //     // if (part2 < e.progress) {
  //     //   part2 += 1/dslides;
  //     // }

  //     // if (part2 > 1) {
  //     //   part2 = 1;
  //     // }


  //     // if (part2 > e.progress) {
  //     //   part2 -= 1/dslides;
  //     // }

  //     // if (part2 < 0) {
  //     //   part2 = 0;
  //     // }


  //     let indexSlide = Math.round(part2*dslides);
  //     $('.dslide').removeClass('is-active is-prev is-next');
  //     $($('.js-dslider .dslide')[indexSlide-1]).addClass('is-prev');
  //     $($('.js-dslider .dslide')[indexSlide]).addClass('is-active');
  //     $($('.js-dslider .dslide')[indexSlide+1]).addClass('is-next');

  //     // $('#dsliderPin').css({
  //     //   paddingTop: $('#dsliderPin').height()*e.progress
  //     // });

  //     // $('.dslider').css({
  //     //   marginTop: -$('#dsliderPin').height()*e.progress/3
  //     // });
  //   })
  //   .setPin('.wrap-dslider')
  //   .on('leave', e => {
  //     PubSub.publish('CURSOR.RECOUNT');
  //   })
  //   .setTween(tl2)
  //   .addIndicators({
  //     name: 'dslide scene',
  //     colorTrigger: 'black',
  //     colorStart: 'aqua',
  //     indent: 200
  //   })
  //   .addTo(g.slidersController);

};
