import './main.style';

import { APP_TITLE } from './shared/models/constants';
import { router } from './shared/router';
import { AboutCmp } from './about/about.cmp';
import { AppCtrl } from './app/app.ctrl';
import { inferTitleFromPath } from './shared/utils/string.util';
import { LoginCmp } from './login/login.cmp';
import { openModal } from './shared/utils/modal.util';
import { LoginCtrl } from './login/login.ctrl';
import { sendHtml } from './shared/utils/dom.util';
import { DashboardCmp } from './dashboard/dashboard.cmp';
import { UserDetailCmp } from './user/userDetail.cmp';
import { userSrv } from './shared/services/basic.srv';
import { UserDetailCtrl } from './user/userDetail.ctrl';
import { dashboardSrv } from './shared/services/dasboard.srv';

router
  .use('/', async (req, res, next) => {
    if (req.listening) {
      const cells = await dashboardSrv.findCellAssigns();
      const html = DashboardCmp(cells);
      sendHtml(html);
    }
    next();
  })
  .use('/login', (req, res, next) => {

    if (req.listening) {
      const html = LoginCmp();
      if (router.getPath() === req.originalUrl) {
        sendHtml(html);
      } else {
        openModal(html, { maxWidth: '30rem' });
        const cmp = document.querySelector('.login');
        LoginCtrl(cmp);
        res.end({ preventNavigation: true });
        return;
      }
    }

    const cmp = document.querySelector('.login');
    LoginCtrl(cmp);

    next();
  })
  .use('/about', (req, res, next) => {
    if (req.listening) {
      const html = AboutCmp();
      sendHtml(html);
    }
    next();
  })
  .use('/user/:id(\\d+)', async (req, res, next) => {
    if (req.listening) {
      const user = await userSrv.findOneFullById(req.params.id);
      const html = UserDetailCmp(user);
      sendHtml(html);
    }
    const cmp = document.querySelector('.user');
    UserDetailCtrl(cmp);
    next();
  })
  .use('*', (req, res, next) => {
    if (req.listening) {
      const title = inferTitleFromPath(req.originalUrl, APP_TITLE);
      document.title = title;
    }
    res.end();
  })
  .listen();


AppCtrl(document.body);


window.fbAsyncInit = () => {
  FB.init({
    appId: '195322843827243',
    cookie: false,
    xfbml: false,
    version: 'v3.1'
  });
};

