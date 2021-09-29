import PubSub from 'pubsub-js';

import facts from './../facts';
import parallax from './../parallax';
import {homeAppear} from './../transitions/homeAnim';

import {g} from './../global';

let mouseY;

export function home() {
  if (g.barba === 'home') {
    initHome();
    homeAppear();
  }

  PubSub.subscribe('HOME.IS', () => {
    initHome();
  });

  document.addEventListener('mousemove', e => {
    mouseY = e.pageY;
  });

  g.homeWheel = e => {
    console.log('whhheeell');
    if (mouseY < 130) {
      return;
    }
    else {
      if (!g.isHomeWheel && e.deltaY < 0 && $(window).scrollTop() === 0) {
        g.isHomeWheel = true;

        PubSub.publish('SCROLL.REACH.TOP', {url: ''});
      }
      return;
    }
  };
};

export function initHome() {
  $('body').addClass('is-home');
  facts();
  parallax();
  document.addEventListener('scroll', g.factScroll);
}

export function homeMob() {
  facts();
  document.addEventListener('scroll', g.factScroll);
}
