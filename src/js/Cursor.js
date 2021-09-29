import {TweenLite} from 'gsap';
import PubSub from 'pubsub-js';

import { g } from './global';

export default class Cursor {
  constructor() {
    this.cursor = $('.js-cursor');
    this.text = $('.js-cursor-text');
    this.lens = $('.js-cursor-lens');

    this.clipped = [];
    this.controlled = [];
    this.mouse = {};
    this.topScroll = 0;

    this.isTransition;
    this.isHomeAbove;
    this.isPage;

    this.isScrolling;

    let timeout;

    this.move = e => {
      this._moveCursor(e);
      this._updateClip();
    };

    this.scroll = e => {
      this.isScrolling = true;
      this._scroll();
      if (timeout) {
        clearTimeout(timeout);
      }

      timeout = setTimeout(() => {
        this.isScrolling = false;
      }, 100);
    };

    this.over = e => {
      this._mouseOver(e);
    };

    this.out = e => {
      this._mouseOut(e);
    };

    this.close = e => {
      this._clearText();
      PubSub.publish('FORM.IS.CLOSED');
    };

    this.overBody = e => {
      if (!$(e.target).is('form')) {
        this._addText('close');
      }
    };

    this._init();
  }

  _init() {
    this._createClones();
    this._watch();

    // updating clip on move
    document.addEventListener('mousemove', this.move);
    // updating clip on scroll
    document.addEventListener('scroll', this.scroll);
  }


  _preload() {
    let _this = this;
    let counter = {val: 0, max: 100};

    TweenLite.to(counter, 5, {
      val: counter.max,
      ease: new Ease(g.easing),
      onUpdate: function() {
        $(_this.text).text(Math.round(counter.val) + '%');
      },
      onComplete: function() {
        _this._clearText();
        PubSub.publish('START.PRELOADER.FINISH');
      }
    });

  }

  _watch() {
    if (g.barba === 'start') {
      $('*').css({
        'cursor': 'none'
      });
      this._preload();
    }


    PubSub.subscribe('TRANSITION.START', (msg) => {
      this.cursor.removeClass('is-horizontal');
      this._clearText();
      this._hideCursor();
    });

    PubSub.subscribe('TRANSITION.FINISH', (msg) => {
      this._showCursor();
    });

    PubSub.subscribe('CURSOR.RECOUNT', (msg) => {
      this._createClones();
      this._count();
      this._uncontrol();
      this._control();
    });

    PubSub.subscribe('CURSOR.RECOUNT.POSITION', (msg) => {
      this._count();
    });


    PubSub.subscribe('FORM.IS.OPENED', (msg) => {
      document.addEventListener('click', this.close);
      document.addEventListener('mouseover', this.overBody);
    });

    PubSub.subscribe('FORM.IS.CLOSED', (msg) => {
      document.removeEventListener('click', this.close);
      document.removeEventListener('mouseover', this.overBody);
    });
  }

  _count() {
    this._countClip();
    this._countControl();
  }


  _moveCursor(e) {
    this.mouse.cursorX = e.clientX;
    this.mouse.cursorY = e.clientY;
    this.mouse.mouseX = e.pageX;
    this.mouse.mouseY = e.pageY;

    TweenLite.set(this.cursor, {x: this.mouse.cursorX, y: this.mouse.cursorY});
  }

  _showCursor() {
    TweenLite.fromTo(this.lens, 1, {scale: 0}, {
      scale: 1,
      ease: new Ease(g.easing),
      onUpdate: () => {
        this._updateClip();
      },
      onComplete: () => {
        this.isTransition = false;
      }
    });
  }

  _hideCursor() {
    TweenLite.fromTo(this.lens, 1, {scale: 1}, {
      scale: 0,
      ease: new Ease(g.easing),
      onStart: () => {
        this.isTransition = true;
      },
      onUpdate: () => {
        this._updateClip();
      }
    });
  }

  _scroll() {
    if (this.mouse.cursorY) {
      let mouseY;

      if (g.isStart) {
        mouseY = this.mouse.cursorY;
      }
      else {
        mouseY = this.mouse.cursorY + $(window).scrollTop();
      }

      let radius = Math.round(this.lens[0].getBoundingClientRect().width/2);
      for (let i = 0; i < this.clipped.length; i++) {

        let left = this.mouse.cursorX - this.clipped[i].left;
        let top = mouseY - this.clipped[i].top;

        this._addClip(this.clipped[i].el, left, top, radius);
      }
    }
  }

  _countClip() {
    this.clipped = [];
    let _this = this;
    $('.is-clip').each(function() {
      _this.clipped.push({
        el: this,
        top: $(this).parent().offset().top,
        left: $(this).parent().offset().left
      });
    });
  }

  _updateClip(isSizeChanging) {

    let radius = Math.round(this.lens[0].getBoundingClientRect().width/2);
    for (let i = 0; i < this.clipped.length; i++) {

      let left, top;


      if (g.isStart) {
        left = this.mouse.cursorX - this.clipped[i].left;
        top = this.mouse.cursorY - this.clipped[i].top;
      }
      else {
        left = this.mouse.mouseX - this.clipped[i].left;
        top = this.mouse.mouseY - this.clipped[i].top;
      }

      if (this.clipped[i].typing) {
        return false;
      }
      else {
        this._addClip(this.clipped[i].el, left, top, radius);
      }
    }

  }


  _removeClip(el) {
    $(el).css({
      '-webkit-clip-path': 'circle(0 at 0 0)',
      'clip-path': 'circle(0 at 0 0)'
    });
  }


  _addClip(el, left, top, radius) {
    // if cursor isn't on clipped element
    if (top + radius < 0 || top - radius > $(el).height() || left + radius < 0 || left - radius > $(el).width()) {
      if (!$(el).hasClass('js-input')) {
        this._removeClip(el);
      }
      return;
    }
    // if cursor is on clipped element
    else {
      $(el).css({
        '-webkit-clip-path': 'circle('+radius+'px at '+left+'px '+top+'px)',
        'clip-path': 'circle('+radius+'px at '+left+'px '+top+'px)'
      });
    }
  }

  _countControl() {
    this.controlled = [];
    let _this = this;
    $('[data-cursor]').each(function() {
      _this.controlled.push(this);
    });
  }

  _control() {
    for (let i = 0; i < this.controlled.length; i++) {
      this.controlled[i].addEventListener('mouseover', this.over);
      this.controlled[i].addEventListener('mouseout', this.out);
    }
  }

  _uncontrol() {
    for (let i = 0; i < this.controlled.length; i++) {
      this.controlled[i].removeEventListener('mouseover', this.over);
      this.controlled[i].removeEventListener('mouseout', this.out);
    }
  }

  _mouseOver(e) {
    e.stopPropagation();
    if (this.isTransition) return;

    let t = e.currentTarget;
    let text = $(t).data('cursor');

    let direction = t.getAttribute('data-direction');
    let type = t.getAttribute('data-type');

    this._addText(text);
    if (direction) {
      this.cursor.addClass(`is-${direction}`);
    }
    if (type) {
      this.cursor.addClass(`is-${type}`);
    }

    if ($(t).hasClass('js-link')) {
      let factor = t.getBoundingClientRect().width/this.cursor.width();

      if (t.getBoundingClientRect().width < this.cursor.width()) {
        TweenLite.to(this.lens, 1, {
          scale: factor,
          onUpdate: () => {
            this._updateClip(true);
          }
        });
      }
      else {
        return;
      }
    }
  }

  _mouseOut(e) {
    e.stopPropagation();
    if (this.isTransition) return;

    let t = e.currentTarget;


    let direction = t.getAttribute('data-direction');
    let type = t.getAttribute('data-type');

    this._clearText();
    if (direction) {
      this.cursor.removeClass(`is-${direction}`);
    }
    if (type) {
      this.cursor.removeClass(`is-${type}`);
    }

    if ($(t).hasClass('js-link')) {

      TweenLite.to(this.lens, 1, {
        scale: 1,
        onUpdate: () => {
          this._updateClip();
        }
      });
    }

  }

  _createClones() {
    let _this = this;
    $('.js-lighten, .js-link, .js-title').each(function() {
      if (!$(this).children().hasClass('is-clip')) {
        let el = $(this).children()[0];
        let clone = $(el).clone();
        clone.addClass('is-clip');
        clone.appendTo(this);
      }
    });
  }

  _addText(text) {
    this.text.text(text);
  }

  _clearText() {
    this.text.text('');
  }

}
