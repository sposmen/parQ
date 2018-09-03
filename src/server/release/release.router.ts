import * as express from 'express';
import { releaseSrv } from '../shared/services/release.srv';
import {errorHandler} from "../shared/utils/http.util";

export const releaseApiRouter = express.Router();

releaseApiRouter.route('/')
  .post(save);

async function save(req: express.Request, res: express.Response) {
  try {

    let release = req.body;

    //TODO: add the suscriptor_id random assignation

    release.release_date = new Date().toISOString().slice(0, 10);

    const id = await releaseSrv.saveOne(req.body, req.session.userId);
    res.json(id.toString());
    res.end();
  } catch (err) {
    errorHandler(req, res, err);
  }
};

