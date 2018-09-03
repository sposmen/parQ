import * as SqlString from 'sqlstring';

import {
  QueryMeta, QueryPager, isTransient, isPersistable, BasicEntity, PersistableMode, Primitive, QueryFilterItem
} from '../models/generic';


export function buildCreateOne<T extends BasicEntity>(type: { new(): T }, data: T) {

  const persistableData = filterPersistable(type, data, 'insertable');

  const fieldsArr = [];
  const valuesArr = [];

  for (const prop in persistableData) {
    fieldsArr.push(escapeId(prop));
    valuesArr.push(escape(persistableData[prop]));
  }

  const fields = fieldsArr.join(', ');
  const values = valuesArr.join(', ');

  return `INSERT INTO ${type.name} (${fields}) VALUES (${values})`;
}

export function buildUpdateOneById<T extends BasicEntity>(type: { new(): T }, data: T, id: number) {
  const filter = [{ id }] as T[];
  return buildUpdateOne(type, data, filter);
}

export function buildUpdateOne<T extends BasicEntity>(type: { new(): T }, data: T, filter: T[]) {

  const persistableData = filterPersistable(type, data, 'updatable');
  const keyValueStr = objectToKeyValueStr(persistableData);
  const where = buildWhere(filter);
  const sql = `UPDATE ${type.name} SET ${keyValueStr} WHERE ${where}`;

  return sql;
}

export function buildRemoveOneById<T extends BasicEntity>(type: { new(): T }, id: number) {
  const filter: QueryFilterItem[] = [{ id }];
  return buildRemove(type, filter);
}

export function buildRemove<T extends BasicEntity>(type: { new(): T }, filter: QueryFilterItem[]) {

  const table = obtainTableName(type);
  const where = buildWhere(filter);
  const sql = `DELETE FROM ${table} WHERE ${where}`;

  return sql;
}

export function buildQueryOne<T extends BasicEntity>(type: { new(): T } | string, qm: QueryMeta) {

  if (!qm.pager) {
    qm.pager = {};
  }

  qm.pager.limit = 1;

  return buildQuery(type, qm);
}

export function buildQuery<T extends BasicEntity>(type: { new(): T } | string, qm: QueryMeta = {}) {

  const table = obtainTableName(type);
  const fields = qm.fields ? qm.fields : '*';

  const query = `SELECT ${fields} FROM ${table}` + buildCriteria(qm);

  return query;
}

function buildCriteria<T extends BasicEntity>(qm: QueryMeta) {

  let sql = '';

  if (qm.filter) {
    sql += ' WHERE ' + buildWhere(qm.filter);
  }

  if (qm.order) {
    sql += buildOrder(qm.order);
  }

  if (qm.pager) {
    sql += buildPager(qm.pager);
  }

  return sql;
}

function buildWhere<T extends BasicEntity>(filter: T[], separator: ' AND ' | ' OR ' = ' AND ') {

  // if (!Array.isArray(filter)) {
  //   filter = [filter];
  // }

  const conditionalArr = filter.map(filterIt => {

    const key = Object.keys(filterIt)[0];
    const val = filterIt[key];
    let conditional: string;

    if (Array.isArray(val)) {
      // If used this syntax, the group separator must be ' OR ' (defaults to ' AND ').
      conditional = buildWhere(val, ' OR ');
      if (val.length > 1) {
        conditional = `(${conditional})`;
      }
    } else {
      conditional = buildWhereConditional(key, val);
    }

    return conditional;
  });

  const sql = conditionalArr.join(separator);

  return sql;
}

function buildWhereConditional(prop: string, val: Primitive | object): string {

  const attr = escapeId(prop);

  if (typeof val !== 'object') {
    return attr + ' = ' + escape(val);
  }

  const keys = Object.keys(val);

  if (keys.length !== 1) {
    throw new Error(`One key must be specified, but ${keys.length} was given`);
  }

  const operator = keys[0];

  if (operator === '$startsWith') {
    const ilikeVal = (val[operator] as string).toLowerCase() + '%';
    const escapedIlikeVal = escape(ilikeVal);
    const sql = `LOWER(${attr}) LIKE ${escapedIlikeVal}`;
    return sql;
  }

  if (operator === '$in') {
    const inVal = escape(val[operator], true);
    const sql = `${attr} IN (${inVal})`;
    return sql;
  }

  throw new Error(`Unsuported operator: ${operator}`);
}

function buildOrder(order: string) {

  const orderArr = order.trim().split(/\s+/);

  const sqlArr = [];

  for (const it of orderArr) {
    let field: string;
    let direction: 'ASC' | 'DESC';
    if (it.startsWith('-')) {
      field = it.substring(1);
      direction = 'DESC';
    } else {
      field = it;
      direction = 'ASC';
    }
    sqlArr.push(escapeId(field) + ' ' + direction);
  }

  let sql = ' ORDER BY ';
  sql += sqlArr.join(', ');

  return sql;
}

function buildPager(pager: QueryPager) {

  let sql = '';

  if (pager.offset) {
    sql += ` OFFSET ${+pager.offset}`;
  }

  if (pager.limit) {
    sql += ` LIMIT ${+pager.limit}`;
  }

  return sql;
}

function filterPersistable<T extends BasicEntity>(type: { new(): T }, data: T, persistableMode: PersistableMode) {

  const persistableData = {} as T;

  for (const prop in data) {
    if (!isTransient(type, prop) && isPersistable(type, prop, persistableMode)) {
      persistableData[prop] = data[prop];
    }
  }

  return persistableData;
}

export function obtainTableName<T extends BasicEntity>(type: { new(): T } | string) {
  return typeof type === 'string' ? type : type.name;
}

export function objectToKeyValueStr(data: object, timeZone?: string) {
  return SqlString.objectToValues(data, timeZone);
}

export function escapeId(id: string, forbidQualified?: boolean) {
  return SqlString.escapeId(id, forbidQualified);
}

export function escape(val: Object, stringifyObjects?: boolean, timeZone?: string) {
  return SqlString.escape(val, stringifyObjects, timeZone);
}


// export class Query {

//     private fields = '*';
//     private filter: string;
//     private order: string;
//     private pager: string;

//     constructor(private from: string) { }

//     select(fields: string) {
//       this.fields = buildSelect(fields);
//       return this;
//     }

//     where(filter: QueryFilterItem | QueryFilterItem[]) {
//       this.filter = buildWhere(filter);
//       return this;
//     }

//     sort(order: string) {
//       this.order = buildOrder(order);
//       return this;
//     }

//     limit(pager: QueryPager) {
//       this.pager = buildPager(pager);
//       return this;
//     }

//     toString() {
//       const sql = `SELECT ${this.fields} FROM ${this.from} ${this.filter} ${this.order} ${this.pager}`;
//       return sql.trim();
//     }
//   }
