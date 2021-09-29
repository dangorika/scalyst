import Swiper from 'swiper';
import {TweenLite} from 'gsap';
import PubSub from 'pubsub-js';

import { g } from './../global';

export default class TSlider {
  constructor() {
    this.options = {
      slidesPerView: 'auto',
      speed: 1000,
      mousewheel: true,
      freeMode: true,
      watchSlidesProgress: true
    };

    this.slider;
    this.sliderCl;
    this._init();
  }

  _init() {

    this.slider = new Swiper('.js-tslider', this.options);
    this.sliderCl = new Swiper('.js-tslider-cl', this.options);

    this.slider.controller.control = this.sliderCl;
    this.sliderCl.controller.control = this.slider;


    this.sliderCl.on('progress', e => {
      if (e !== 0) {
        TweenLite.to('.js-tlist-msg', 1, {opacity: 0, ease: new Ease(g.easing)});
      }
      else {
        TweenLite.to('.js-tlist-msg', 1, {opacity: 1, ease: new Ease(g.easing)});
      }
    });

    PubSub.subscribe('TSLIDER.SLIDE.TO', (msg, data) => {
      this.sliderCl.slideTo(data.slide);
    });
  }

  _destroy() {
    this.slider.destroy(true, true);
    this.sliderCl.destroy(true, true);
  }
}
