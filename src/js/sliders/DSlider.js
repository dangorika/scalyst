import Swiper from 'swiper';
import {TweenLite} from 'gsap';
import PubSub from 'pubsub-js';

import { g } from './../global';

export default class DSlider {
  constructor() {

    this.options = {
      direction: 'vertical',
      slidesPerView: 1,
      freeMode: true,
      slideToClickedSlide: true,
      mousewheel: {
        eventsTarged: '.js-dslider-controller'
      },
      speed: 1000,
      watchSlidesProgress: true
    };

    this.slider;
    this._init();

  }

  _init() {
    // this.slider = new Swiper('.js-dslider', this.options);
    $('.js-rect').css('width', $('.dslider').width());

    let mobile = window.matchMedia('(max-width: 767px)').matches;

    if (!g.isSimple && !mobile) {
      this._drawLine();
    }
  }

  _drawLine() {
    let path = $('.js-path');
    let svg = $('.js-line');

    path.attr('fill', 'none');

    let sliderWidth = $('.dslider').width();
    let sliderHeight = $('.dslider').outerHeight();


    let p = [];
    let x = $('.js-dot').offset().left - $('.js-dot').closest('.dslider__track').offset().left + 7;

    let delta = Math.sin(1.0472);


    $('.js-dot').each(function() {
      let parentTop = $(this).closest('.dslider__track').offset().top + $(this).closest('.dslider__track').width()*delta;

      p.push($(this).offset().top - parentTop + 7);
    });


    svg.attr('viewBox', '0 0 9999 9999');
    svg.attr('width', 9999);
    svg.attr('height', 9999);


    let pn = p.length;

    let str = '';
    str += `M ${x},${p[0]} `;


    let scaleIndex = delta/(1+delta);
    let scale = 1 + scaleIndex;


    path.attr('transform', `rotate(-60 ${x} ${p[0]}) translate(-${x} -${p[0]}) scale(2)`);


    for (let i = 0; i < pn-1; i++) {
      let pp = x;
      let scalar, cp1, cp2;

      if (i % 2 === 0) {
        scalar = -1;
        cp1 = pp + (1/(pn-1)*getRandomInt(490,1200))/2 * scalar;
        cp2 = pp + (1/(pn-1)*0)/2 * scalar;
      }
      else {
        scalar = 1;
        cp1 = pp + (1/(pn-1)*0)/2 * scalar;
        cp2 = pp + (1/(pn-1)*getRandomInt(490,1200))/2 * scalar;
      }

      str += `C ${cp1},${p[i]} ${cp2},${p[i+1]} ${pp},${p[i+1]}`;
    }


    if (!path.attr('d')) {
      path.attr('d', str);
    }


    let startDashOffset = $('.dslide').height() * pn;
    TweenLite.set('.js-path', {strokeDasharray: startDashOffset});
    TweenLite.fromTo('.js-path', 5, {strokeDashoffset: startDashOffset}, {strokeDashoffset: 0});

    // let trackWidth = $('.dslider .swiper-slide').height() * pn - $('.dslider .dslide').height();
    // this.slider.on('progress', function(e) {
    //   let t = e * trackWidth;

    //   TweenLite.set('.js-rect', {x: t/2, y: t/2});
    // });

    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }

  }
}
