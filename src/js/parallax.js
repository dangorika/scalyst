import {TweenMax} from 'gsap';
import ScrollMagic from 'scrollmagic';
import './lib/animation.gsap';

import { g } from './global';

export default () => {
  let parallaxElements = [], rotatedElements = [];

  let controller = new ScrollMagic.Controller();


  // CREATING ARRAYS
  $('[data-prlx]').each(function() {
    parallaxElements.push({el: this, prlx: $(this).data('prlx')});
  });

  $('[data-rotation]').each(function() {
    rotatedElements.push({el: this, rotation: $(this).data('rotation')});
  });



  parallaxElements.forEach(function(element, index) {

    var img = $(element.el);

    var slideParallaxScene = new ScrollMagic.Scene({
      triggerElement: img[0],
      // triggerHook: 1,
      duration: '100%'
    })
      // .removeTween(true)
      .setTween(TweenMax.fromTo(img, 0.1, {y: element.prlx}, {y: -element.prlx, ease: new Ease(g.easing)}))
      .addTo(controller);
  });


  rotatedElements.forEach(function(element, index) {

    var img = $(element.el);

    var slideRotationScene = new ScrollMagic.Scene({
      triggerElement: img[0],
      // triggerHook: 1,
      duration: '100%'
    })
      // .removeTween(true)
      .setTween(TweenMax.from(img, 0.1, {rotation: element.rotation, ease: new Ease(g.easing)}))
      .addTo(controller);
  });

};
