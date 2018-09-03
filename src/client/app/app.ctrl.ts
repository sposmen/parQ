import { router } from '../shared/router';
import { isApplicationPath } from '../shared/utils/string.util';
import * as httpUtil from '../shared/utils/http.util';
import * as spinnerUtil from '../shared/utils/spinner.util';
import { openAlert } from '../shared/utils/modal.util';


export function AppCtrl(cmp: Element) {

  cmp.addEventListener('click', (evt) => {

    const target = evt.target as Element;
    let link: Element;

    if (target.nodeName === 'A') {
      link = target;
    } else {
      link = target.closest('a');
      if (!link) {
        return;
      }
    }

    const url = link.getAttribute('href');

    if (!isApplicationPath(url)) {
      return;
    }

    evt.preventDefault();

    router.push(url);
  });

  httpUtil.subscribe((notificationType, err) => {
    if (notificationType === 'start') {
      spinnerUtil.show();
    } else if (notificationType === 'complete') {
      spinnerUtil.hide();
    } else if (notificationType === 'error') {
      openAlert(err, { type: 'error' });
    }
  });

}
