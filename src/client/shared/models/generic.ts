const columnMetadataKey = Symbol('Column');
const transientMetadataKey = Symbol('Transient');

export type NotificationType = 'start' | 'success' | 'error' | 'complete';
export type Primitive = string | number | boolean;
export type PersistableMode = 'insertable' | 'updatable';

export interface ColumnProperties {
  insertable?: boolean;
  updatable?: boolean;
}

export function isPersistable<T extends BasicEntity>(target: { new(): T }, targetKey: string, persistableMode: PersistableMode) {
  return !target.prototype[columnMetadataKey] ||
    !target.prototype[columnMetadataKey][targetKey] ||
    target.prototype[columnMetadataKey][targetKey][persistableMode];
}

export function isTransient<T extends BasicEntity>(target: { new(): T }, targetKey: string) {
  return target.prototype[transientMetadataKey] && target.prototype[transientMetadataKey][targetKey];
}

export function Column(props?: ColumnProperties) {

  const theProps: ColumnProperties = { ...{ insertable: true, updatable: true }, ...props };

  return (target: object, targetKey: string) => {
    if (target[columnMetadataKey] === undefined) {
      target[columnMetadataKey] = {};
    }
    target[columnMetadataKey][targetKey] = theProps;
  };
}

export function Transient() {
  return (target: object, targetKey: string) => {
    if (target[transientMetadataKey] === undefined) {
      target[transientMetadataKey] = {};
    }
    target[transientMetadataKey][targetKey] = true;
  };
}

export interface QueryFilterConditional {
  [prop: string]: Primitive | Primitive[] | QueryFilterConditional | QueryFilterConditional[];
}

export type QueryFilterValue = Primitive | Primitive[] | QueryFilterConditional | QueryFilterConditional[];

export interface QueryFilterItem {
  [prop: string]: QueryFilterValue;
}

export interface QueryPager {
  limit?: number;
  offset?: number;
}

export interface QueryMeta {
  fields?: string;
  filter?: QueryFilterItem[];
  order?: string;
  pager?: QueryPager;
}

export interface QueryUpdateResult {
  affectedRows?: number;
  insertId?: number;
}

export abstract class BasicEntity {
  @Column({ insertable: false, updatable: false })
  id?: number;
  @Column({ updatable: false })
  createdBy?: number;
  @Column({ updatable: false })
  createdAt?: number;
  @Column({ insertable: false })
  updatedAt?: number;
  @Transient()
  user?: User;
}

export class User extends BasicEntity {
  username?: string;
  displayName?: string;
  facebookId?: string;
  facebookName?: string;
  facebookShortName?: string;
  facebookPicture?: string;
  facebookEmail?: string;
  plates?: Plate[];
}

export class Plate extends BasicEntity {
  plate?: string;
}

export interface BasicContractSrv<T extends BasicEntity> {

  saveOne(data: T, userId?: number): Promise<number>;

  removeOneById(id: number, userId?: number): Promise<number>;

  findOneById(id: number, userId?: number): Promise<T>;

  findOneFullById(id: number, userId?: number): Promise<T>;

  findOne(queryMeta: QueryMeta, userId?: number): Promise<T>;

  find(queryMeta: QueryMeta, userId?: number): Promise<T[]>;
}

export interface UserContractSrv extends BasicContractSrv<User> { }

export interface PlateContractSrv extends BasicContractSrv<Plate> { }

export interface DashboardSrv {
  findCellAssigns(): Promise<CellAssign[]>;
}

export interface NotificationCallback {
  (notificationType: NotificationType, err?: string): void;
}
export interface ApiResponse {
  error?: string;
}

export interface PromiseMap {
  [key: string]: Promise<void[]>;
}

export type AlertType = 'info' | 'success' | 'warning' | 'error';

export interface ModalOptions {
  maxWidth?: string;
}

export interface AlertOptions extends ModalOptions {
  type?: AlertType;
  maxWidth?: string;
  wait?: number;
}

export interface AppData {
  content: string;
  path: string;
  user: User;
}

export interface CellAssign {
  name?: string;
  plate?: string;
  slot?: string;
}
