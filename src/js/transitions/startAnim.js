import {TimelineMax} from 'gsap';
import PubSub from 'pubsub-js';

import { g } from './../global';

export function startPreload() {
  let tl = new TimelineMax({
    onComplete: () => {
      startAppear();
    }
  });

  tl
    .to('.header', 1, {y: 0, ease: new Ease(g.easing)});
}


export function startAppear(cb) {
  PubSub.publish('START.IS');

  let tl = new TimelineMax({
    onComplete: () => {
      PubSub.publish('CURSOR.RECOUNT');
      PubSub.publish('TRANSITION.FINISH');
      $('body').removeClass('is-disabled');

      if (cb) cb();
    }
  });

  tl
    .set('.header', {y: 0, ease: new Ease(g.easing)})
    .to('.start__text', 1, {opacity: 1, y: '-50%', ease: new Ease(g.easing)})
    .to('.hslide', 1, {opacity: 1, y: 0, ease: new Ease(g.easing)}, '-=0.5')
    .to('.scroll__line', 1, {scaleY: 1, ease: new Ease(g.easing)}, '-=1')
    .to('.scroll__text, .nav, .js-hlist-msg', 1, {opacity: 1, ease: new Ease(g.easing)})
    .to('.hlist__cyl .img', 1, {scale: 1, opacity: 1, ease: new Ease(g.easing)}, '-=1.5');
}


export function startHide(cb) {
  $('body').addClass('is-disabled');
  $('body').removeClass('is-start');

  PubSub.publish('SCROLL.PREVENT');
  PubSub.publish('TRANSITION.START');
  let tl = new TimelineMax({
    onComplete: () => {
      if (cb) cb();
    }
  });

  tl
    .to('.hlist__cyl .img', 1, {scale: 0.3, opacity: 0, ease: new Ease(g.easing)})
    .to('.hslide', 1, {opacity: 0, y: '5vh', ease: new Ease(g.easing)}, '-=0.5')
    .to('.start__text', 1, {opacity: 0, y: '-30%', ease: new Ease(g.easing)}, '-=1')
    .to('.scroll__line', 1, {scaleY: 0, ease: new Ease(g.easing)}, '-=1')
    .to('.scroll__text, .js-hlist-msg', 1, {opacity: 0, ease: new Ease(g.easing)}, '-=1');
}

export function startToPage(cb) {
  $('body').addClass('is-disabled');
  $('body').removeClass('is-start');


  PubSub.publish('SCROLL.PREVENT');
  PubSub.publish('TRANSITION.START');
  let tl = new TimelineMax({
    onComplete: () => {
      if (cb) cb();
    }
  });

  let linkSlide;

  if (!g.isSimple) {
    let linkIndex = $(g.lastClicked).closest('.swiper-slide').index();
    linkSlide = $('.hlist__slider:not(.is-clip)').find('.swiper-slide')[linkIndex];
  }
  else {
    linkSlide = $(g.lastClicked).closest('.swiper-slide');
  }

  let link = $(linkSlide).find('.hslide');

  let d = {};
  d.scale = 2.777;
  d.top = $(link).offset().top - 116;
  d.left = $(link).offset().left - 100;

  let widthPrev = $(window).width();
  let widthNext = $(window).width() - 100;


  tl
    .to('.hlist__cyl .img', 1, {scale: 0.3, opacity: 0, ease: new Ease(g.easing)})
    .to('.hslide__img img', 1, {scale: 0.3, opacity: 0, ease: new Ease(g.easing)}, '-=1')
    .to('.hslide__svg path', 1, {opacity: 0, ease: new Ease(g.easing)}, '-=1')
    .to('.start__text', 1, {opacity: 0, ease: new Ease(g.easing)}, '-=1')
    .to('.scroll__line', 1, {scaleY: 0, ease: new Ease(g.easing)}, '-=1')
    .to('.scroll__text, .js-hlist-msg', 1, {opacity: 0, ease: new Ease(g.easing)}, '-=1')
    .to($(linkSlide).siblings(), 1, {opacity: 0, ease: new Ease(g.easing)})
    .to($(link).find('.num'), 1, {opacity: 0, ease: new Ease(g.easing)}, '-=1')
    .fromTo('.main', 1, {y: 0, x: 0, width: widthPrev}, {y: 50, x: 50, width: widthNext}, '-=0.5')
    .to(link, 1, {scale: d.scale, y: -d.top, x: -d.left, transformOrigin: '0 0', ease: new Ease(g.easing)}, '-=1');
}
