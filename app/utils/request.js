import axios from 'axios';

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default async function call(config = {}, headers = {}) {
  // eslint-disable-next-line no-return-await
  return await axios.request({
    // baseURL: serverBaseUrl,
    headers,
    ...config,
  });
}
