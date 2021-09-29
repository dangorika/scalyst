import BezierEasing from 'bezier-easing';

const { detect } = require('detect-browser');
const browser = detect();

class Global {
  constructor() {
    this.browser = browser.name;

    this.mobile = window.matchMedia('(max-width: 1024px)').matches;
    this.barba = $('.barba-container').data('namespace');
    this.easing = BezierEasing(0.215, 0.61, 0.355, 1);
    this.isSimple = this._isSimple();

    // links
    this.lastAnchor;
    this.lastClicked;

    // states
    this.inProgress;
    this.isHomeWheel;
    this.isAnchorClicked;


    // events
    this.factScroll;
    this.jellyScroll;
    this.homeWheel;


    // pages
    this.isStart;
    this.isHome;
    this.isPage;


    // sliders
    this.hslider;
    this.tslider;
    this.vslider;
    this.dslider;

    // controllers
    this.slidersController;
  }

  _isSimple() {
    let isSimple;

    this.browser === 'chrome' ||
    this.browser === 'opera' ||
    this.browser === 'safari' ?
      isSimple = false : isSimple = true;

    return isSimple;
  }
}

export let g = new Global();
