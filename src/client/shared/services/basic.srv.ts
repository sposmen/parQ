import { get, put, post, remove } from '../utils/http.util';
import { normalizeName } from '../utils/string.util';
import { stringifyQueryMeta } from '../utils/query.util';
import { BasicEntity, QueryMeta, BasicContractSrv, User, UserContractSrv, Plate, PlateContractSrv } from '../models/generic';


export function generateBasicService<T extends BasicEntity>(type: { new(): T }): BasicContractSrv<T> {

  const entityName = normalizeName(type.name);
  const baseUrl = `/api/${entityName}`;

  return {

    saveOne(data: T) {
      if (data.id) {
        return put<number>(`${baseUrl}/${data.id}`, data);
      }
      return post<number>(baseUrl, data);
    },

    removeOneById(id: number) {
      return remove<number>(`${baseUrl}/${id}`);
    },

    findOneById(id: number) {
      return get<T>(`${baseUrl}/${id}`);
    },

    findOneFullById(id: number) {
      return get<T>(`${baseUrl}/${id}?full=true`);
    },

    findOne(queryMeta: QueryMeta) {
      const qs = stringifyQueryMeta(queryMeta);
      return get<T>(`${baseUrl}/find/one?${qs}`);
    },

    find(queryMeta: QueryMeta) {
      const qs = stringifyQueryMeta(queryMeta);
      return get<T[]>(`${baseUrl}?${qs}`);
    }
  };
}


export const userSrv: UserContractSrv = generateBasicService(User);
export const plateSrv: PlateContractSrv = generateBasicService(Plate);
