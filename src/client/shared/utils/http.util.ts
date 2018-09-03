import { NotificationType, NotificationCallback } from "../models/generic";

const subscriptors: NotificationCallback[] = [];


export function get<T>(url: string) {
  return request<T>(url, { method: 'get' });
}

export function post<T>(url: string, data: object) {
  const stringifiedData = JSON.stringify(data);
  return request<T>(url, { method: 'post', body: stringifiedData });
}

export function put<T>(url: string, data: object) {
  const stringifiedData = JSON.stringify(data);
  return request<T>(url, { method: 'put', body: stringifiedData });
}

export function remove<T>(url: string) {
  return request<T>(url, { method: 'delete' });
}

function request<T>(url: string, init: RequestInit): Promise<T> {

  notify('start');

  init.headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };

  return fetch(url, init)
    .then(res => checkStatus(res))
    .then(res => {
      notify('success');
      return res;
    })
    .then(res => res.json())
    .then(res => {
      notify('complete');
      return res;
    })
    .catch(err => {
      notify('error', err);
      notify('complete');
      throw err;
    });
}

export function subscribe(subscriptor: NotificationCallback) {
  subscriptors.push(subscriptor);
}

export function unsubscribe(subscriptor: NotificationCallback) {
  const pos = subscriptors.indexOf(subscriptor);
  subscriptors.splice(pos, 1);
}

function notify(notificationType: NotificationType, err?: string) {
  subscriptors.forEach(subscriptor => {
    subscriptor(notificationType, err);
  });
}

function checkStatus(res: Response) {

  if (res.status >= 200 && res.status < 300) {
    return res;
  }

  throw new Error(res.statusText);
}


