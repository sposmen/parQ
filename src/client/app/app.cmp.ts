import { inferTitleFromPath } from '../shared/utils/string.util';
import { APP_TITLE } from '../shared/models/constants';
import { AppData } from '../shared/models/business';
import { User } from '../shared/models/generic';

export function AppCmp(data: AppData) {

  const title = inferTitleFromPath(data.path, APP_TITLE);

  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta http-equiv="x-ua-compatible" content="ie=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta name="theme-color" content="#4682b4"/>
      <title>${title}</title>
      <link href="/dist/assets/img/logo-small.png?" rel="icon" type="image/png">
      <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400|Open+Sans:300,400" rel="stylesheet">
      <link href="https://unpkg.com/bootstrap@4.1.3/dist/css/bootstrap-reboot.min.css" rel="stylesheet">
      <link href="/dist/main.css" rel="stylesheet">
    </head>
    <body>

      <section class="header">
        <nav class="nav clearfix">
          <a class="nav__link" href="/"><span class="sr-only">${APP_TITLE}</span></a>
          <a class="nav__link" href="/">Home</a>
          <a class="nav__link" href="/about">About</a>
          ${AuthCmp(data.user)}
        </nav>
      </section>

      <main role="main">${data.content}</main>

      <script src="https://connect.facebook.net/en_US/sdk.js"></script>
      <script src="/dist/polyfills.js"></script>
      <script src="/dist/vendor.js"></script>
      <script src="/dist/main.js"></script>

    </body>
  </html>
  `;
}

function AuthCmp(user?: User) {

  if (user) {
    return `
    ${LogoutFormCmp()}
    <a class="user-link nav__link" href="/user/${user.id}">${user.displayName}</a>
    `;
  }

  return `
  <a class="login-link nav__link" href="/login">Login</a>
  `;
}

function LogoutFormCmp() {
  return `
  <form action="/logout" method="post" class="logout-form inline">
    <button type="submit" class="btn-link">
      Logout
    </button>
  </form>
  `;
}

