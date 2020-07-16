import { API } from './constants';

function queryParams(params) {
  return Object.keys(params)
    .map(
      (k) =>
        `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`,
    )
    .join('&');
}

export default function (endPointURL, options = {}) {
  let url = API + endPointURL;
  if (options.queryParams) {
    url +=
      (url.indexOf('?') === -1 ? '?' : '&') +
      queryParams(options.queryParams);
    delete options.queryParams;
  }

  return fetch(url, options);
}

// export default fetch2;
