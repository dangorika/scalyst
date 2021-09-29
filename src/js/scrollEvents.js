import PubSub from 'pubsub-js';
import { g } from './global';

export default () => {
  $(window).on('beforeunload', () => {
    $(window).scrollTop(0);
  });

  let preventMouseScroll = e => {
    e.preventDefault();
    return;
  };

  let preventKeyScroll = e => {
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
    }
    return;
  };

  if (!g.mobile) {
    $(window).on('mousewheel DOMMouseScroll MozMousePixelScroll', preventMouseScroll);
    $(window).on('keydown', preventKeyScroll);
  }

  PubSub.subscribe('SCROLL.PREVENT', (msg, data) => {
    console.log(msg);
    $(window).on('mousewheel DOMMouseScroll MozMousePixelScroll', preventMouseScroll);
    $(window).on('keydown', preventKeyScroll);
  });


  PubSub.subscribe('SCROLL.RELEASE', (msg, data) => {
    console.log(msg);
    $(window).off('mousewheel DOMMouseScroll MozMousePixelScroll', preventMouseScroll);
    $(window).off('keydown', preventKeyScroll);
  });
};
