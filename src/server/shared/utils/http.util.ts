import * as express from 'express';
export {
  stringifyQueryMeta,
  buildQueryMeta,
  buildQueryFilter
} from '../../../client/shared/utils/query.util';
import { UnmatchedCmp } from '../../../client/unmatched/unmatched.cmp';


export function obtainIsAjaxRequest(req: express.Request) {
  return req.xhr || (req.headers.accept && req.headers.accept.indexOf('json') > -1);
}

export function errorHandler(req: express.Request, res: express.Response, errMsg: string, errCode = 500) {

  console.error(errMsg, errCode);

  res.status(errCode);

  const isAjaxRequest = obtainIsAjaxRequest(req);

  if (isAjaxRequest) {
    res.json({ error: errMsg });
  } else {
    res.send(UnmatchedCmp(errMsg));
  }

  res.end();
}

