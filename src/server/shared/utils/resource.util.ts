import * as express from 'express';
import { BasicEntity, BasicContractSrv } from '../models/generic';
import { errorHandler, buildQueryMeta } from './http.util';


export function addResourceApiRoutes<T extends BasicEntity, S extends BasicContractSrv<T>>(
  router: express.Router, resourceService: S) {

  router
    .route('/')
    .post(saveOne)
    .get(async (req, res) => {
      const queryMeta = buildQueryMeta(req.query);
      try {
        const models = await resourceService.find(queryMeta, req.session.userId);
        res.json(models);
        res.end();
      } catch (err) {
        errorHandler(req, res, err);
      }
    });

  router.route('/:id(\\d+)')
    .get(async (req, res) => {
      try {
        let model: T;
        if (req.query.full) {
          model = await resourceService.findOneFullById(req.params.id, req.session.userId);
        } else {
          model = await resourceService.findOneById(req.params.id, req.session.userId);
        }
        res.json(model);
        res.end();
      } catch (err) {
        errorHandler(req, res, err);
      }
    })
    .put(saveOne)
    .delete(async (req, res) => {
      try {
        const affectedRows = await resourceService.removeOneById(req.params.id, req.session.userId);
        res.json(affectedRows.toString());
        res.end();
      } catch (err) {
        errorHandler(req, res, err);
      }
    });

  router.get('/find/one', async (req, res) => {
    const queryMeta = buildQueryMeta(req.query);
    try {
      const model = await resourceService.findOne(queryMeta, req.session.userId);
      res.json(model);
      res.end();
    } catch (err) {
      errorHandler(req, res, err);
    }
  });

  async function saveOne(req: express.Request, res: express.Response) {
    try {
      const id = await resourceService.saveOne(req.body, req.session.userId);
      res.json(id.toString());
      res.end();
    } catch (err) {
      errorHandler(req, res, err);
    }
  }


  return router;
}
