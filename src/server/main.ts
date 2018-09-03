import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as expressSession from 'express-session';
import * as expressMySqlSession from 'express-mysql-session';

import { errorHandler, obtainIsAjaxRequest } from './shared/utils/http.util';
import { AppCmp } from '../client/app/app.cmp';
import { AboutCmp } from '../client/about/about.cmp';
import { facebookApiRouter } from './facebook/facebook.router';
import { pool } from './shared/utils/db.util';
import { AppData } from './shared/models/generic';
import { userSrv } from './shared/services/user.srv';
import { cellAssigns } from './shared/services/cellAssigns.srv';
import { LoginCmp } from '../client/login/login.cmp';
import { DashboardCmp } from '../client/dashboard/dashboard.cmp';
import { plateApiRouter } from './plate/plate.router';
import { userApiRouter } from './user/user.router';

const session = buildSession();
const server = express();

server
  .use('/dist', express.static('./dist'))
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use(session)
  .get('/', dashboardRouter)
  .get('/login', loginRouter)
  .post('/logout', logoutRouter)
  .get('/about', aboutRouter)
  .use('/api/facebook', facebookApiRouter)
  .use('/api/user', userApiRouter)
  .use('/api/plate', plateApiRouter)
  .use((req, res) => errorHandler(req, res, `Path not found: ${req.method} ${req.url} ${req.originalUrl}`, 404))
  .listen(4200);


async function aboutRouter(req: express.Request, res: express.Response) {

  const cmp = AboutCmp();

  try {

    const user = await userSrv.findOneById(req.session.userId);

    const data: AppData = {
      content: cmp,
      path: req.originalUrl,
      user: user
    };

    res.end(AppCmp(data));

  } catch (err) {
    errorHandler(req, res, err);
  }
}

async function loginRouter(req: express.Request, res: express.Response) {

  if (req.session.userId) {
    res.redirect('/');
    return;
  }

  const cmp = LoginCmp();

  try {

    const user = await userSrv.findOneById(req.session.userId);

    const data: AppData = {
      content: cmp,
      path: req.originalUrl,
      user: user
    };

    res.end(AppCmp(data));

  } catch (err) {
    errorHandler(req, res, err);
  }
}

async function dashboardRouter(req: express.Request, res: express.Response) {

  const user = await userSrv.findOneById(req.session.userId);

  function processResult(cells: any) {
    try {

      const cmp = DashboardCmp(cells);


      const data: AppData = {
        content: cmp,
        path: req.originalUrl,
        user: user
      };

      res.end(AppCmp(data));

    } catch (err) {
      errorHandler(req, res, err);
    }
  }

  cellAssigns(processResult);
}

async function logoutRouter(req: express.Request, res: express.Response) {
  req.session.destroy((err: string) => {
    if (err) {
      console.error('Error while destroying session', err);
    }
    const isAjaxRequest = obtainIsAjaxRequest(req);
    if (isAjaxRequest) {
      res.send({});
    } else {
      res.redirect('/');
    }
    res.end();
  });
}

function buildSession() {

  const MySqlStore = expressMySqlSession(expressSession);
  const sessionStore = new MySqlStore({}, pool);

  const obj = expressSession({
    key: 'app',
    secret: 'Som3thing-R3ally-S3cr3t-Go3s-H3r3!',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
  });

  return obj;
}

