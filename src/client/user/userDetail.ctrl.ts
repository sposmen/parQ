import { Plate } from "../shared/models/generic";
import { openAlert } from "../shared/utils/modal.util";
import { plateSrv } from "../shared/services/basic.srv";
import { PlateItCmp } from "./userDetail.cmp";


export function UserDetailCtrl(cmp: Element) {

  const plateForm = cmp.querySelector('.plate-form') as HTMLFormElement;
  plateForm.onsubmit = async evt => {

    evt.preventDefault();

    const plateEl = plateForm.elements['plate'];

    const plateObj: Plate = {
      plate: plateEl.value
    };

    const id = await plateSrv.saveOne(plateObj);
    plateObj.id = id;

    const plateListCmp = cmp.querySelector('.plate-list');
    const plateIt = PlateItCmp(plateObj);
    plateListCmp.insertAdjacentHTML('afterbegin', plateIt);

    plateEl.value = '';

    openAlert('Plate added');
  };
}
