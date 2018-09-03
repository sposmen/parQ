import './dashboard.style';
import { subscriptionSrv } from '../shared/services/basic.srv';

export function DashboardCtrl(cmp: Element) {

  const subscribeBtn = cmp.querySelector('.subscribe > input') as HTMLInputElement;

  subscribeBtn.onclick = async () => {
    const isSubscribed = subscribeBtn.checked;
    if (isSubscribed) {
      const id = await subscriptionSrv.saveOne({})
      subscribeBtn.value = '' + id;
    } else {
      const id = parseInt(subscribeBtn.value, 10);
      subscriptionSrv.removeOneById(id);
    }
  };
}
