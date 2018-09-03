export const APP_TITLE = 'App';

class AppLibs {

  readonly facebook: AppLib = {
    cssFiles: [],
    jsFiles: [
      'https://connect.facebook.net/en_US/sdk.js'
    ],
    deps: []
  };
}


export type appLibKey = keyof AppLibs;

export const appLibs = new AppLibs();


export interface AppLib {
  cssFiles: string[];
  jsFiles: string[];
  deps: appLibKey[];
}
