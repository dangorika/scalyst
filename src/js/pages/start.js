import PubSub from 'pubsub-js';

import {startClip} from './../clip';
import HSlider from './../sliders/HSlider';

import {startPreload, startAppear} from './../transitions/startAnim';

import {g} from './../global';

export function start() {
  // if (g.barba === 'start') {

  // }
  PubSub.subscribe('START.PRELOADER.FINISH', () => {
    startPreload();
  });
  PubSub.subscribe('START.IS', () => {
    initStart();
  });
};

export function initStart() {
  $('body').addClass('is-start');
  startClip();
  g.hslider = new HSlider;
}
