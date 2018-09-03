import './dashboard.style';
import { subscriptionSrv } from '../shared/services/basic.srv';
import { openAlert } from '../shared/utils/modal.util';

export function DashboardCtrl(cmp: Element) {

  const subscribeBtn = cmp.querySelector('.subscribe > input') as HTMLInputElement;

  subscribeBtn.onclick = async () => {
    const isSubscribed = subscribeBtn.checked;
    if (isSubscribed) {
      const id = await subscriptionSrv.saveOne({})
      subscribeBtn.value = '' + id;
      openAlert('Subscribed');
    } else {
      const id = parseInt(subscribeBtn.value, 10);
      await subscriptionSrv.removeOneById(id);
      openAlert('Unsubscribed', { type: 'warning' });
    }
  };
}
