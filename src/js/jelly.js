import {TweenMax} from 'gsap';
import { g } from './global';

export default () => {

  let jellyElements = [];

  let scrollTop = $(window).scrollTop();
  let wh = $(window).height();

  let maxScroll = 100;
  let maxScale = 1.2;
  let minScale = 0.8;

  let isScrolling;

  $('.js-jelly').each(function() {
    jellyElements.push({
      el: this,
      pos: $(this).offset().top,
      height: $(this).height()
    });
  });



  let elh = $('.js-jelly').height();
  let elp = $('.js-jelly').offset().top;



  g.jellyScroll = e => {

    for (let i = 0; i < jellyElements.length; i++) {


      if ($(window).scrollTop() > jellyElements[i].pos - wh && $(window).scrollTop() < jellyElements[i].pos + jellyElements[i].height) {


        // Clear our timeout throughout the scroll
        window.clearTimeout(isScrolling);

        // Set a timeout to run after scrolling ends
        isScrolling = setTimeout(function() {


          for (let j = 0; j < jellyElements.length; j++) {
            TweenMax.killChildTweensOf(jellyElements[j].el);
            TweenMax.to(jellyElements[j].el, 1.4, {scaleY: 1, ease: Power2.easeOut});
          }


        }, 10);

        TweenMax.to(jellyElements[i].el, 1.4, {scaleY: 0.9, overwrite: 5, ease: Power2.easeOut});


      }

    }

  };

};
