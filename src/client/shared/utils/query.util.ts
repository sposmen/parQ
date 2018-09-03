import { QueryMeta, QueryFilterItem } from '../models/generic';

export function buildQueryMeta(obj: object): QueryMeta {

  let qm = {} as QueryMeta;

  if (obj['$query-meta']) {
    qm = obj['$query-meta'];
    if (obj['$query-meta'].filter) {
      qm.filter = JSON.parse(obj['$query-meta'].filter);
    }
  } else {
    qm = {};
  }

  return qm;
}


export function buildQueryFilter(obj: object): QueryFilterItem[] {
  return obj['$query-meta'] ? obj['$query-meta'].filter : [];
}

export function stringifyQueryMeta(qm: QueryMeta): string {

  const res: string[] = [];

  if (qm.filter) {
    const filterStr = stringifyQueryFilter(qm.filter);
    res.push(filterStr);
  }

  if (qm.order) {
    res.push(`$query-meta[order]=${qm.order}`);
  }

  if (qm.pager) {
    for (const prop in qm.pager) {
      res.push(`$query-meta[pager][${prop}]=${qm.pager[prop]}`);
    }
  }

  return res.join('&');
}

export function stringifyQueryFilter(filter: QueryFilterItem | QueryFilterItem[]) {

  // if (!Array.isArray(filter)) {
  //   filter = [filter];
  // }

  return `$query-meta[filter]=${JSON.stringify(filter)}`;
}
