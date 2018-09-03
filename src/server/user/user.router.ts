import * as express from 'express';
import { addResourceApiRoutes } from '../shared/utils/resource.util';
import { UserDetailCmp } from '../../client/user/userDetail.cmp';
import { AppCmp } from '../../client/app/app.cmp';
import { userSrv } from '../shared/services/user.srv';
import { AppData } from '../shared/models/generic';

export const userApiRouter = express.Router();
addResourceApiRoutes(userApiRouter, userSrv);


export const userRouter = express.Router()
  .get('/:id(\\d+)', async (req, res) => {

    const user = await userSrv.findOneFullById(req.params.id, req.session.userId);
    const cmp = await UserDetailCmp(user);

    const data: AppData = {
      content: cmp,
      path: req.originalUrl,
      user: user
    };

    res.end(AppCmp(data));
  });

