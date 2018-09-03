export function isNavigationPath(path: string) {
  return !!path && !path.startsWith('javascript:void');
}

export function isExternalPath(path: string) {
  return /^https?:\/\//.test(path);
}

export function isApplicationPath(path: string) {
  return isNavigationPath(path) && !isExternalPath(path);
}

export function normalizeName(val: string, separator = '-') {

  let resp = val.charAt(0).toLowerCase();

  for (let i = 1; i < val.length; ++i) {
    if (val[i] === val[i].toUpperCase()) {
      resp += separator + val[i].toLowerCase();
    } else {
      resp += val[i];
    }
  }

  return resp;
}

export function inferTitleFromPath(path: string, prefix = '') {

  const relativeUrl = path.replace(/^\/|\/$/g, '');
  let title = prefix;

  if (relativeUrl) {
    if (title) {
      title += ' | ';
    }
    title += relativeUrl.split('/').reverse().map(word => word.length ? word[0].toUpperCase() + word.substring(1)
      : word).join(' ');
  }

  return title;
}


