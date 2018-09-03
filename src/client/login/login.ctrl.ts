import { post } from "../shared/utils/http.util";
import { ApiResponse } from "../shared/models/generic";
import { openAlert } from "../shared/utils/modal.util";


export function LoginCtrl(cmp: Element) {

  const fbLoginBtn = cmp.querySelector('.fb-login-btn') as HTMLButtonElement;
  fbLoginBtn.onclick = evt => {
    fbLogin();
  };
}

export function fbLogin() {
  FB.login(async (response: { authResponse: object }) => {

    if (!response.authResponse) {
      return;
    }

    const resp = await post<ApiResponse>(`/api/facebook/login`, response.authResponse);

    if (resp.error) {
      openAlert(resp.error, { type: 'warning' });
      return;
    }

    location.reload();

  }, {
      scope: 'public_profile,email',
      return_scopes: true
    });
}

