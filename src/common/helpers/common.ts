import axios, { RawAxiosRequestHeaders } from 'axios';
import qs from 'qs';

type MutationMethodType = 'GET' | 'POST';
export function MutationFetchFunction({
  url,
  method,
  body,
  inputParams,
  headers,
}: {
  url: string;
  method: MutationMethodType;
  body?: any;
  inputParams?: any;
  headers?: RawAxiosRequestHeaders;
}): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      let newParams = '';
      if (inputParams?.params) {
        newParams = qs.stringify(inputParams?.params);
        if (method === 'GET') {
          url += `&${newParams}`;
        }
      }
      console.log(url);
      resolve(
        await axios({
          method: method,
          url: url,
          data: body,
          headers,
        }),
      );
    } catch (e: any) {
      reject(e);
    }
  });
}
