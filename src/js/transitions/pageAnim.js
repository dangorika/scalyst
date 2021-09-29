import {TimelineMax} from 'gsap';
import PubSub from 'pubsub-js';

import ScrollMagic from 'scrollmagic';

import { g } from './../global';


export function pageAppear(cb) {
  PubSub.publish('PAGE.IS');

  $('.main').css({
    'width': 'calc(100% - 100px)',
    'height': 'calc(100% - 100px)',
    'margin': '50px',
    'transform': 'none'
  });

  let tl = new TimelineMax({
    onComplete: () => {
      PubSub.publish('CURSOR.RECOUNT');
      PubSub.publish('TRANSITION.FINISH');
      PubSub.publish('SCROLL.RELEASE');
      $('body').removeClass('is-disabled');

      if (cb) cb();
    }
  });

  tl
    .set('.nav', {opacity: 1})
    .to('.title__img img', 1, {opacity: 1, scale: 1, ease: new Ease(g.easing)})
    .to('.title__svg path', 1, {opacity: 1, ease: new Ease(g.easing)}, '-=1')
    .to('.brief', 1, {opacity: 1, y: 0, ease: new Ease(g.easing)}, '-=0.5')
    .to('.sections', 1, {opacity: 1, y: 0, ease: new Ease(g.easing)}, '-=1')
    .to('.cyl img', 1, {scale: 1, opacity: 1, ease: new Ease(g.easing)});
}


export function pageHide(cb) {
  $('body').addClass('is-disabled');


  PubSub.publish('SCROLL.PREVENT');
  PubSub.publish('TRANSITION.START');
  let tl = new TimelineMax({
    onComplete: () => {
      $('body').removeClass('is-page');
      $('.main').css({
        'width': '100%',
        'height': '100%',
        'margin': 0,
        'transform': 'none'
      });

      g.lastClicked = undefined;
      g.slidersController.destroy(true);

      if (cb) cb();
    }
  });

  let widthPrev = $(window).width() - 100;
  let widthNext = $(window).width();



  tl
    .to('.cyl img', 1, {scale: 0.3, opacity: 0, ease: new Ease(g.easing)})
    .to('.sections', 1, {opacity: 0, y: '5vh', ease: new Ease(g.easing)}, '-=0.5')
    .to('.brief', 1, {opacity: 0, y: '5vh', ease: new Ease(g.easing)}, '-=1')
    .to('.title__img img', 1, {opacity: 0, scale: 0.3, ease: new Ease(g.easing)}, '-=1')
    .to('.title__svg path, .title', 1, {opacity: 0, ease: new Ease(g.easing)}, '-=1')
    .fromTo('.main', 1, {y: 0, x: 0, width: widthPrev}, {y: -50, x: -50, width: widthNext});
}
