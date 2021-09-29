import Swiper from 'swiper';
import PubSub from 'pubsub-js';

import {g} from './../global';

export default class VSlider {
  constructor() {

    this.options = {
      direction: 'vertical',
      slidesPerView: 3,
      freeMode: true,
      centeredSlides: true,
      mousewheel: {
        eventsTarged: '.vsliders'
      },
      speed: 1000
    };

    this.slider;
    this.sliderCl;
    this.pages;
    this.pagesCl;
    this._init();
  }

  _init() {

    if (g.isSimple || g.mobile) {
      this.pagesCl = new Swiper('.js-vslider-pages-cl', this.options);
      this.sliderCl = new Swiper('.js-vslider-cl', this.options);

      this.pagesCl.controller.control = this.sliderCl;
      this.sliderCl.controller.control = this.pagesCl;
    }
    else {
      this.pages = new Swiper('.js-vslider-pages', this.options);
      this.slider = new Swiper('.js-vslider', this.options);

      this.pagesCl = new Swiper('.js-vslider-pages-cl', this.options);
      this.sliderCl = new Swiper('.js-vslider-cl', this.options);

      // four-way control
      this.pagesCl.controller.control = [this.sliderCl, this.slider];
      this.sliderCl.controller.control = [this.pagesCl, this.pages];
    }

  }

  _destroy() {
    if (isSimple || g.mobile) {
      this.sliderCl.destroy(true, true);
      this.pagesCl.destroy(true, true);
    }
    else {
      this.slider.destroy(true, true);
      this.sliderCl.destroy(true, true);
      this.pages.destroy(true, true);
      this.pagesCl.destroy(true, true);
    }
  }
}
