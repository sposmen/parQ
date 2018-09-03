import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as expressSession from 'express-session';
import * as expressMySqlSession from 'express-mysql-session';

const session = buildSession();
const server = express();

server
  .use('/dist', express.static('./dist'))
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use(session)
  .use((req, res) => errorHandler(req, res, `Path not found: ${req.method} ${req.url} ${req.originalUrl}`, 404))
  .listen(4200);


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

