import Barba from 'barba.js';
import PubSub from 'pubsub-js';
import {TweenLite} from 'gsap';

import {startHide, startAppear, startToPage} from './transitions/startAnim';
import {homeHide, homeAppear, homeToPage} from './transitions/homeAnim';
import {pageHide, pageAppear} from './transitions/pageAnim';

import { g } from './global';

export default () => {
  Barba.Dispatcher.on('linkClicked', function(el) {
    g.lastClicked = el;
  });


  PubSub.subscribe('HSLIDER.REACH.END', (msg, data) => {
    // Barba.Pjax.goTo(`/${data.url}`);
    Barba.Pjax.goTo('/pages/coderiver/scalyst/home.html');
  });

  PubSub.subscribe('SCROLL.REACH.TOP', (msg, data) => {
    console.log(msg);
    // Barba.Pjax.goTo(`/${data.url}`);
    Barba.Pjax.goTo(`/pages/coderiver/scalyst/${data.url}`);
  });

  PubSub.subscribe('ANCHOR.ANIM.START', (msg, data) => {
    // Barba.Pjax.goTo(`/${data.url}`);
    Barba.Pjax.goTo(`/pages/coderiver/scalyst/${data.url}`);
  });

  let transition = Barba.BaseTransition.extend({
    start: function() {
      Promise
        .all([this.newContainerLoading, this.animate()])
        .then(this.showNew.bind(this));
    },

    animate: function() {
      let oldContainer = $(this.oldContainer);
      let oldName = oldContainer.data('namespace');
      let deferred = Barba.Utils.deferred();

      let isStartToPage;
      let isHomeToPage;


      if (oldName === 'start') {
        if (g.lastClicked) {
          isStartToPage = $(g.lastClicked).closest('.hlist').length !== 0;
        }
        if (!isStartToPage) {
          startHide(() => {
            deferred.resolve();
          });
        }
      }

      if (oldName === 'home') {
        if (g.lastClicked) {
          isHomeToPage = $(g.lastClicked).closest('.tlist').length !== 0;
        }
        if (!isHomeToPage) {
          homeHide(() => {
            deferred.resolve();
          });
        }
      }

      if (oldName !== 'start' && oldName !== 'home') {
        pageHide(() => {
          deferred.resolve();
        });
      }


      if (isStartToPage) {
        startToPage(() => {
          deferred.resolve();
        });
      }

      if (isHomeToPage) {
        homeToPage(() => {
          deferred.resolve();
        });
      }




      return deferred.promise;
    },

    showNew: function() {

      var _this = this;
      let newContainer = $(this.newContainer);
      let oldContainer = $(this.oldContainer);

      oldContainer.hide();

      newContainer.css({
        visibility : 'visible',
      });


      let oldName = Barba.HistoryManager.prevStatus().namespace;
      let newName = Barba.HistoryManager.currentStatus().namespace;


      if (newName === 'home' && !g.isAnchorClicked) {
        homeAppear(() => {
          this.done();
        });
      }

      if (newName === 'start') {
        startAppear(() => {
          this.done();
        });
      }

      if (newName !== 'start' && newName !== 'home') {
        pageAppear(() => {
          this.done();
        });
      }

      if (g.isAnchorClicked) {
        g.isAnchorClicked = false;
        homeAppear(() => {
          PubSub.publish('ANCHOR.ANIM.FINISH');
          this.done();
        });
      }

    }

  });


  Barba.Pjax.getTransition = function() {
    return transition;
  };

  Barba.Pjax.start();
};

