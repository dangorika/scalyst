import { g } from './global';

export default () => {

  PubSub.subscribe('TRANSITION.START', () => {
    g.inProgress = true;
  });

  PubSub.subscribe('TRANSITION.FINISH', () => {
    g.inProgress = false;
  });

  PubSub.subscribe('START.IS', () => {
    g.isStart = true;
    g.isHome = false;
    g.isPage = false;
  });

  PubSub.subscribe('HOME.IS', () => {
    g.isStart = false;
    g.isHome = true;
    g.isPage = false;
  });

  PubSub.subscribe('PAGE.IS', () => {
    g.isStart = false;
    g.isHome = false;
    g.isPage = true;
  });

};
