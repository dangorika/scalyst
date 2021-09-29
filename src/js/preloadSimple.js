import {TweenLite} from 'gsap';
import PubSub from 'pubsub-js';

import {g} from './global';

export default () => {
  let counter = {val: 0, max: 100};
  let loader = $('.js-loader');

  TweenLite.to(counter, 5, {
    val: counter.max,
    ease: new Ease(g.easing),
    onUpdate: () => {
      loader.text(Math.round(counter.val) + '%');
    },
    onComplete: () => {
      loader.text('');
      PubSub.publish('START.PRELOADER.FINISH');
    }
  });
};
