import axios from 'axios';

type MutationMethodType = 'GET' | 'POST';
export function MutationFetchFunction(
  url: string,
  method: MutationMethodType,
  body?: any,
): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      resolve(
        await axios({
          method: method,
          url: url,
          data: body,
        }),
      );
    } catch (e: any) {
      reject('Error');
    }
  });
}
