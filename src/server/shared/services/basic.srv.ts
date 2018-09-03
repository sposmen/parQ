import { buildCreateOne, buildUpdateOneById, buildQueryOne, buildRemoveOneById } from '../utils/sql.util';
import { runQueryOne, runUpdate, runTypedQuery, runTypedQueryOne, runTypedQueryOneById } from '../utils/db.util';
import { BasicEntity, User, QueryMeta, BasicContractSrv, UserContractSrv } from '../models/generic';


export function generateBasicService<T extends BasicEntity>(type: { new(): T }): BasicContractSrv<T> {
  return {

    find(qm: QueryMeta, userId?: number): Promise<T[]> {
      return runTypedQuery(type, qm);
    },

    findOne(qm: QueryMeta, userId?: number): Promise<T> {
      return runTypedQueryOne(type, qm);
    },

    findOneById(id: number, userId?: number): Promise<T> {
      return runTypedQueryOneById(type, id);
    },

    async findOneFullById(id: number, userId?: number): Promise<T> {

      const data = await runTypedQueryOneById(type, id);

      if (!data) {
        return;
      }

      const sqlUser = buildQueryOne(User, {
        fields: 'id, displayName',
        filter: [{ id: data.createdBy }]
      });

      data.user = await runQueryOne<User>(sqlUser);

      return data;
    },

    async saveOne(data: T, userId?: number): Promise<number> {

      let query: string;

      if (data.id) {
        data.updatedAt = Date.now();
        query = buildUpdateOneById(type, data, data.id);
      } else {
        data.createdBy = userId;
        data.createdAt = Date.now();
        query = buildCreateOne(type, data);
      }

      const res = await runUpdate(query);

      return data.id ? data.id : res.insertId;
    },

    async removeOneById(id: number, userId?: number): Promise<number> {
      const sql = buildRemoveOneById(type, id);
      const res = await runUpdate(sql);
      return res.affectedRows;
    }

  };
}


export const userSrv: UserContractSrv = generateBasicService(User);

