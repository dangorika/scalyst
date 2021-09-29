import PubSub from 'pubsub-js';
import { g } from './global';

export default () => {

  $('.js-anchor').on('click', function(e) {
    e.preventDefault();
    g.lastAnchor = this.getAttribute('href');

    if (g.isHome) {
      $('html, body').animate({
        scrollTop: $(g.lastAnchor).offset().top - 20
      }, 2000);
    }

    if (g.isStart || g.isPage) {
      g.isAnchorClicked = true;
      PubSub.publish('ANCHOR.ANIM.START', {url: 'home.html'});
      PubSub.subscribe('ANCHOR.ANIM.FINISH', (msg, data) => {
        $('html, body').animate({
          scrollTop: $(g.lastAnchor).offset().top - 20
        }, 2000);
      });
    }
  });
};
