import {TimelineMax} from 'gsap';
import PubSub from 'pubsub-js';

import { g } from './../global';


export function homeAppear(cb) {
  PubSub.publish('HOME.IS');

  let tl = new TimelineMax({
    onComplete: () => {
      PubSub.publish('CURSOR.RECOUNT');
      PubSub.publish('TRANSITION.FINISH');
      PubSub.publish('SCROLL.RELEASE');
      $('body').removeClass('is-disabled');
      $('.home').css('transform', 'none');

      document.addEventListener('wheel', g.homeWheel);
      g.isHomeWheel = false;

      if (cb) cb();
    }
  });

  tl
    .set('.nav', {opacity: 1})
    .to('.header__bottom', 1, {opacity: 1, y: 0, ease: new Ease(g.easing)})
    .to('.home', 1, {opacity: 1, y: 0, ease: new Ease(g.easing)}, '-=0.5')
    .to('.cyl img', 1, {scale: 1, opacity: 1, ease: new Ease(g.easing)});
}


export function homeHide(cb) {
  $('body').addClass('is-disabled');
  $('body').removeClass('is-home');

  PubSub.publish('SCROLL.PREVENT');
  PubSub.publish('TRANSITION.START');
  let tl = new TimelineMax({
    onComplete: () => {
      document.removeEventListener('scroll', g.factScroll);
      document.removeEventListener('wheel', g.homeWheel);

      if (cb) cb();
    }
  });

  tl
    .to('.cyl img', 1, {scale: 0.3, opacity: 0, ease: new Ease(g.easing)})
    .to('.home', 1, {opacity: 0, y: '5vh', ease: new Ease(g.easing)}, '-=0.5')
    .to('.header__bottom', 1, {opacity: 0, y: '5vh', ease: new Ease(g.easing)}, '-=0.5');
}

export function homeToPage(cb) {
  $('body').addClass('is-disabled');
  $('body').removeClass('is-home');

  // $('.tlist__slider.is-clip').hide();

  PubSub.publish('SCROLL.PREVENT');
  PubSub.publish('TRANSITION.START');

  let linkSlide;

  if (!g.isSimple) {
    let linkIndex = $(g.lastClicked).closest('.swiper-slide').index();
    linkSlide = $('.tlist__slider:not(.is-clip)').find('.swiper-slide')[linkIndex];
  }
  else {
    linkSlide = $(g.lastClicked).closest('.swiper-slide');
  }
  let link = $(linkSlide).find('.tslide');

  let d = {};
  d.scale = 3.704;
  d.top = $(link).offset().top + 37;
  d.left = $(link).offset().left - 100;

  let widthPrev = $(window).width();
  let widthNext = $(window).width() - 100;

  let tl = new TimelineMax({
    onComplete: () => {
      document.removeEventListener('scroll', g.factScroll);
      document.removeEventListener('wheel', g.homeWheel);

      $('.header__bottom').css({
        'opacity': 0
      });
      $('.js-tlist-msg').css({
        'opacity': 1
      });
      $(linkSlide).siblings().css({
        'opacity': 1
      });
      $(link).find('.num').css({
        'opacity': 1
      });
      $(link).css({
        'transform': 'none'
      });

      PubSub.publish('TSLIDER.SLIDE.TO', {slide: 0});

      if (cb) cb();
    }
  });


  tl
    .to('.tslide__img img', 1, {scale: 0.3, opacity: 0, ease: new Ease(g.easing)})
    .to('.tslide__svg path', 1, {opacity: 0, ease: new Ease(g.easing)}, '-=1')
    .to('.js-tlist-msg', 1, {opacity: 0, ease: new Ease(g.easing)}, '-=1')
    .to('.cyl img', 1, {scale: 0.3, opacity: 0, ease: new Ease(g.easing)}, '-=1')
    .to('.home', 1, {opacity: 0, y: '5vh', ease: new Ease(g.easing)}, '-=0.5')
    .to($(linkSlide).siblings(), 1, {opacity: 0, ease: new Ease(g.easing)})
    .to($(link).find('.num'), 1, {opacity: 0, ease: new Ease(g.easing)}, '-=1')
    .fromTo('.main', 1, {y: 0, x: 0, width: widthPrev}, {y: 50, x: 50, width: widthNext}, '-=0.5')
    .to(link, 1, {scale: d.scale, y: d.top, x: -d.left, transformOrigin: '0 0', ease: new Ease(g.easing)}, '-=1');
}
