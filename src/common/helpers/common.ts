import axios, { AxiosRequestConfig, RawAxiosRequestHeaders } from 'axios';
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
      let params = '';
      if (params) {
        params = qs.stringify(inputParams);
      }
      resolve(
        await axios({
          method: method,
          url: url,
          params,
          data: body,
          headers,
        }),
      );
    } catch (e: any) {
      reject('Error');
    }
  });
}
