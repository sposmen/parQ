import * as express from 'express';
import * as fetch from 'node-fetch';
import { userSrv } from '../shared/services/user.srv';
import { QueryMeta, User, ApiResponse } from '../shared/models/generic';


export const facebookApiRouter = express.Router();

const fbBaseUrl = 'https://graph.facebook.com';


facebookApiRouter.post('/login', async (req, res) => {

  const body = req.body;
  const accessToken = body.accessToken;

  const fbMeUrl = `${fbBaseUrl}/me?access_token=${accessToken}&fields=id,name,short_name,picture,email`;
  const fbMeResp = await fetch(fbMeUrl);
  const fbMe = await fbMeResp.json();
  fbMe.id = parseInt(fbMe.id, 10);

  const qm: QueryMeta = {};
  qm.filter = [
    {
      $or: [
        { facebookId: fbMe.id },
        { facebookEmail: fbMe.email },
        { username: fbMe.email }
      ]
    }
  ];

  const resp: ApiResponse = {};

  const user = await userSrv.findOne(qm);

  if (user) {
    if (user.facebookId === fbMe.id) {
      req.session.userId = user.id;
    } else if (user.facebookEmail === fbMe.email) {
      resp.error = `A registered user has this email as his FB email, but his FB id do not match`;
    } else {
      resp.error = `A registered user has this email as his username, but his FB id do not match`;
    }
  } else {
    const newUser: User = {};
    newUser.username = fbMe.email;
    newUser.displayName = fbMe.short_name;
    newUser.facebookId = fbMe.id;
    newUser.facebookName = fbMe.name;
    newUser.facebookShortName = fbMe.short_name;
    newUser.facebookPicture = fbMe.picture.data.url;
    newUser.facebookEmail = fbMe.email;
    newUser.id = await userSrv.saveOne(newUser, req.session.userId);
    req.session.userId = newUser.id;
  }

  res.json(resp);
  res.end();
});
