import svg4everybody from 'svg4everybody';
import scrollEvents from './scrollEvents';
import listen from './listener';
import removeHash from './removeHash';

import {start} from './pages/start';
import {home, homeMob} from './pages/home';
import {page, pageMob} from './pages/page';

import mobNav from './mobNav';

import preloadSimple from './preloadSimple';
import Cursor from './Cursor';
import parallax from './parallax';
import {form} from './form';
import TSlider from './sliders/TSlider';
import anchors from './anchors';
import router from './router';

import {homeClip} from './clip';
import {g} from './global';



$(document).ready(() => {
  removeHash();


  let cursor;

  if (!g.mobile) {
    $('body').addClass('is-disabled');
    scrollEvents();
    listen();
  }


  svg4everybody();
  if (!g.mobile) {
    parallax();
  }
  form();


  if (!g.mobile) {
    g.tslider = new TSlider;
    homeClip();
    anchors();
    router();
  }


  if (g.isSimple) {
    $('body').addClass('is-simple');
  }

  if (!g.mobile) {
    start();
    home();
    page();
  }

  if (g.mobile) {
    mobNav();

    if (g.barba === 'start') {
      homeMob();
    }

    if (g.barba !== 'start' && g.barba !== 'home') {
      pageMob();
    }
  }


  if (g.isSimple && !g.mobile && g.barba === 'start') {
    preloadSimple();
  }

  if (!g.isSimple && !g.mobile) {
    cursor = new Cursor();
  }

});
