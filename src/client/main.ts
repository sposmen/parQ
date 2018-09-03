import './main.style';

import { router } from './shared/router';
import { sendHtml } from './shared/utils/dom.util';
import { HomeCmp } from './home/home.cmp';

router
  .use('/', async (req, res, next) => {
    if (req.listening) {
      const html = HomeCmp();
      sendHtml(html);
    }
    next();
  })
  .listen();


window.fbAsyncInit = () => {
  FB.init({
    appId: '195322843827243',
    cookie: false,
    xfbml: false,
    version: 'v3.1'
  });
};

