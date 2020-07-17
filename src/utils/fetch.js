import { API } from './constants';

function queryParams(params) {
  return Object.keys(params)
    .filter((key) => params[key])
    .map(
      (k) =>
        `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`,
    )
    .join('&');
}

export default function (endPointURL, options = {}) {
  let url = API + endPointURL;
  if (options.queryParams) {
    // console.log('TCL: options.queryParams', options.queryParams);
    url +=
      (url.indexOf('?') === -1 ? '?' : '&') +
      queryParams(options.queryParams);
    delete options.queryParams;
  }

  return fetch(url, options);
}

// export default fetch2;
