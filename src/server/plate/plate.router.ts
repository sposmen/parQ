import * as express from 'express';
import { addResourceApiRoutes } from '../shared/utils/resource.util';
import { plateSrv } from '../shared/services/plate.srv';

export const plateApiRouter = express.Router();
addResourceApiRoutes(plateApiRouter, plateSrv);

