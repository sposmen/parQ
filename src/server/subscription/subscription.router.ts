import * as express from 'express';
import { addResourceApiRoutes } from '../shared/utils/resource.util';
import { subscriptionSrv } from '../shared/services/subscription.srv';

export const subscriptionApiRouter = express.Router();
addResourceApiRoutes(subscriptionApiRouter, subscriptionSrv);
