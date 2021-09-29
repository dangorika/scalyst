import Swiper from 'swiper';
import {TweenLite} from 'gsap';
import PubSub from 'pubsub-js';

import { g } from './../global';

export default class HSlider {
  constructor() {
    this.HSliderOptions = {
      slidesPerView: 'auto',
      mousewheel: true,
      freeMode: true,
      speed: 1000,
      watchSlidesProgress: true
    };

    this.HSlider;
    this.HSliderClip;
    this._init();
  }

  _init() {
    this.HSliderClip = new Swiper('.js-hslider-cl', this.HSliderOptions);
    this.HSlider = new Swiper('.js-hslider', this.HSliderOptions);
    this.HSliderClip.controller.control = this.HSlider;

    this.HSliderClip.on('progress', e => {
      if (e !== 0) {
        TweenLite.to('.js-scroll-start', 1, {opacity: 0, ease: new Ease(g.easing)});
      }
      else {
        TweenLite.to('.js-scroll-start', 1, {opacity: 1, ease: new Ease(g.easing)});
      }
      if (e < 0.3) {
        TweenLite.set('.hlist .swiper-slide:nth-child(1) .hlist__cyl img', {scale: (0.3 - e/2)*10/3, ease: new Ease(g.easing)});
        TweenLite.set('.hlist .swiper-slide:nth-child(2) .hlist__cyl img', {scale: 1 + 0.5 - (0.3 - e/2)*10/3, ease: new Ease(g.easing)});
      }

      if (e > 0.3 && e < 0.9) {
        TweenLite.set('.hlist .swiper-slide:nth-child(2) .hlist__cyl img', {scale: 0.9 - e + 0.4, ease: new Ease(g.easing)});
        TweenLite.set('.hlist .swiper-slide:nth-child(3) .hlist__cyl img', {scale: 1 - (0.9 - e + 0.5) + 0.5, ease: new Ease(g.easing)});
      }
    });

    // PubSub.subscribe('HOME.CHANGED', (msg) => {
    //   sliderG.HSliderClip.slideTo(0);
    //   if (!g.isSimple && !g.mobile) {
    //     sliderG.HSlider.slideTo(0);
    //   }
    //   this.reachEnd = false;
    // });

    // if (!this.reachEnd) {
    this.HSliderClip.on('reachEnd', e => {
      PubSub.publish('HSLIDER.REACH.END', {url: 'home'});
    });
    //   this.reachEnd = true;
    // }
  }
}
