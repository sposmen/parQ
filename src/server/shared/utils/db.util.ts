import * as mysql from 'mysql';

import { QueryUpdateResult, BasicEntity, QueryMeta } from '../models/generic';
import { buildQueryOne, buildQuery } from './sql.util';

export const pool = mysql.createPool({
  host: 'someIp',
  user: 'someUser',
  password: 'somePass',
  database: 'someDb'
});

pool.on('connection', (connection: { threadId: string }) => {
  console.log('DB Connection %d made', connection.threadId);
});


export function runTypedQueryOneById<T extends BasicEntity>(type: { new(): T }, id: number) {

  if (!id) {
    return Promise.resolve(undefined);
  }

  return runTypedQueryOne(type, { filter: [{ id }] });
}

export function runTypedQueryOne<T extends BasicEntity>(type: { new(): T }, qm: QueryMeta) {
  const sql = buildQueryOne(type, qm);
  return runQueryOne<T>(sql);
}

export function runTypedQuery<T extends BasicEntity>(type: { new(): T }, qm: QueryMeta) {
  const sql = buildQuery(type, qm);
  return runQuery<T>(sql);
}

export function runQueryOne<T>(query: string): Promise<T> {
  return runQuery<T>(query).then(results => {
    if (!results || results.length === 0) {
      return;
    }
    return results[0];
  });
}

export function runQuery<T>(query: string): Promise<T[]> {
  console.log('runQuery:', query);
  return new Promise((resolve, reject) => {
    pool.query(query, (error: Error, results: T[], fields: string[]) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results);
    });
  });
}

export function runUpdate(query: string): Promise<QueryUpdateResult> {
  console.log('runUpdate:', query);
  return new Promise((resolve, reject) => {
    pool.query(query, (error: Error, results: QueryUpdateResult, fields: string[]) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results);
    });
  });
}

