import PubSub from 'pubsub-js';

// import VSlider from './../sliders/VSlider';
import vscroll from './../scroll/vscroll';
import DSlider from './../sliders/DSlider';
import jelly from './../jelly';
import more from './../more';
import parallax from './../parallax';

import {pageAppear} from './../transitions/pageAnim';

import {g} from './../global';

export function page() {
  if (g.barba !== 'start' && g.barba !== 'home') {
    // initPage();
    pageAppear();
  }
  PubSub.subscribe('PAGE.IS', () => {
    initPage();
  });
};

export function initPage() {
  $('body').addClass('is-page');
  vscroll();
  // g.vslider = new VSlider;
  g.dslider = new DSlider;
  parallax();
  jelly();
  more();
  document.addEventListener('scroll', g.jellyScroll);
}

export function pageMob() {
  vscroll();
  // g.vslider = new VSlider;
  g.dslider = new DSlider;
  jelly();
  more();
  document.addEventListener('scroll', g.jellyScroll);
}
