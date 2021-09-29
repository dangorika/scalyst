import hoverintent from 'hoverintent';
import {TimelineMax} from 'gsap';

import { g } from './global';

export function homeClip() {

  $('.js-tslider-cl a').each(function() {

    let tl = new TimelineMax();

    let svg, img;

    hoverintent(this, onMouseOver, onMouseOut);

    function onMouseOver(e) {
      if (g.inProgress) return;

      svg = $(e.target).next('.tslide').find('path');
      if (!g.isSimple) {
        let index = $(e.target).closest('.swiper-slide').index();
        let slide = $(e.target).closest('.tlist').find('.swiper-slide')[index];
        img = $(slide).find('.tslide__img img');
      }
      else {
        img = $(e.target).next('.tslide').find('.tslide__img img');
      }


      tl
        .to(svg, 0.5, {opacity: 1, ease: new Ease(g.easing)})
        .to(img, 0.5, {scale: 1, opacity: 1, ease: new Ease(g.easing)}, '-=0.5');

    }

    function onMouseOut(e) {
      if (g.inProgress) return;
      tl
        .to(svg, 0.5, {opacity: 0, ease: new Ease(g.easing)})
        .to(img, 0.5, {scale: 0.3, opacity: 0, ease: new Ease(g.easing)}, '-=0.5');
    }
  });
};


export function startClip() {

  $('.js-hslider-cl a').each(function() {

    let tl = new TimelineMax();

    let svg, img, cyl;

    hoverintent(this, onMouseOver, onMouseOut);

    function onMouseOver(e) {
      if (g.inProgress) return;

      svg = $(e.target).next('.hslide').find('path');
      cyl = $('.hlist').find('.hlist__cyl img');
      if (!g.isSimple) {
        let index = $(e.target).closest('.swiper-slide').index();
        let slide = $(e.target).closest('.hlist').find('.swiper-slide')[index];
        img = $(slide).find('.hslide__img img');
      }
      else {
        img = $(e.target).next('.hslide').find('.hslide__img img');
      }


      tl
        .to(svg, 0.5, {opacity: 1, ease: new Ease(g.easing)})
        .to(img, 0.5, {scale: 1, opacity: 1, ease: new Ease(g.easing)}, '-=0.5')
        .to(cyl, 0.5, {opacity: 0, ease: new Ease(g.easing)}, '-=0.5');

    }

    function onMouseOut(e) {
      if (g.inProgress) return;
      tl
        .to(svg, 0.5, {opacity: 0, ease: new Ease(g.easing)})
        .to(img, 0.5, {scale: 0.3, opacity: 0, ease: new Ease(g.easing)}, '-=0.5')
        .to(cyl, 0.5, {opacity: 1, ease: new Ease(g.easing)}, '-=0.5');
    }
  });
};
