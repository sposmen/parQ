declare module 'body-parser';

declare module 'sqlstring';

declare module 'node-fetch';

declare module 'mysql';

declare module 'express-session';

declare module 'express-mysql-session';

declare namespace Express {
  export interface Request {
    session: {
      userId: number;
      regenerate: Function;
      destroy: Function;
    };
  }
}
