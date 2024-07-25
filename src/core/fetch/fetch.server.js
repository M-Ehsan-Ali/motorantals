import Promise from "bluebird";
import fetch, { Headers, Request, Response } from "node-fetch";

fetch.Promise = Promise;
Response.Promise = Promise;

function localUrl(url) {
  if (url.startsWith("//")) {
    return `https:${url}`;
  }

  if (url.startsWith("http")) {
    return url;
  }

  return `https://octal-nodejs-959e0f23ca0e.herokuapp.com/${url}`;
  // return `https://www.motorentals.co${url}`;
}

function localFetch(url, options) {
  return fetch(localUrl(url), options);
}

export { localFetch as default, Headers, Request, Response };
