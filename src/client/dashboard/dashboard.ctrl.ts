import './dashboard.style';
import { subscriptionSrv } from '../shared/services/basic.srv';
import { openAlert, openModal, confirmAction } from '../shared/utils/modal.util';
import { authSrv } from '../shared/services/auth.srv';

export async function DashboardCtrl(cmp: Element) {

  const user = await authSrv.findCurrentUser();

  if (!user) {
    return;
  }

  const subscribeBtn = cmp.querySelector('.subscribe > input') as HTMLInputElement;
  const subscribeText = cmp.querySelector('.switch-text');

  subscribeBtn.onclick = async () => {
    const isSubscribed = subscribeBtn.checked;
    if (isSubscribed) {
      const id = await subscriptionSrv.saveOne({})
      subscribeBtn.value = '' + id;
      subscribeText.innerHTML = 'Unsubscribed';
      openAlert('Subscribed');
    } else {
      const id = parseInt(subscribeBtn.value, 10);
      await subscriptionSrv.removeOneById(id);
      subscribeText.innerHTML = 'Subscribe';
      openAlert('Unsubscribed', { type: 'warning' });
    }
  };

  cmp.addEventListener('click', evt => {
    const target = evt.target as Element;
    if (!target.classList.contains('release-cell')) {
      return;
    }
    confirmAction('Are you sure of releasing the cell?');
  });
}
