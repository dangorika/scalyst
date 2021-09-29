import {TimelineMax} from 'gsap';

import { g } from './global';

export default () => {
  let onElement = false, isScrolling = false;

  let facts = [], factIndex = -1;

  let tl = new TimelineMax();
  tl
    .set('.js-fact-scale', {scale: 0.3, opacity: 0, transformOrigin: '0 0'})
    .set('.js-fact-draw', {scaleX: 0, transformOrigin: '0 0', ease: new Ease(g.easing)})
    .set('.js-fact-fade', {opacity: 0, ease: new Ease(g.easing)});


  $('.fact').each(function() {
    facts.push({
      el: this,
      top: $(this).offset().top,
      height: $(this).height()
    });
  });

  let wh = $(window).height();

  g.factScroll = e => {

    let scrolled = $(window).scrollTop() + wh;

    facts.forEach((fact, index) => {
      let tl1 = new TimelineMax();

      if (scrolled > fact.top + fact.height/2 && scrolled < fact.top + fact.height/2 + wh) {
        if (factIndex !== index) {
          tl1
            .to($(fact.el).find('.js-fact-scale'), 0.5, {scale: 1, opacity: 1, ease: new Ease(g.easing)})
            .to($(fact.el).find('.js-fact-draw'), 0.5, {scaleX: 1, ease: new Ease(g.easing)}, '-=0.25')
            .to($(fact.el).find('.js-fact-fade'), 0.5, {opacity: 1, ease: new Ease(g.easing)}, '-=0.25');
        }

        if (index === 0 || index === facts.length - 1) {
          factIndex = -1;
        }
        else {
          factIndex = index;
        }
      }
      else {
        tl1
          .to($(fact.el).find('.js-fact-scale'), 0.5, {scale: 0.3, opacity: 0, ease: new Ease(g.easing)})
          .to($(fact.el).find('.js-fact-draw'), 0.5, {scaleX: 0, ease: new Ease(g.easing)}, '-=0.25')
          .to($(fact.el).find('.js-fact-fade'), 0.5, {opacity: 0, ease: new Ease(g.easing)}, '-=0.25');
      }
    });

  };
};
