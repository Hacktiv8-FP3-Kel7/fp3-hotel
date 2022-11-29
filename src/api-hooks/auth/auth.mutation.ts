import { useMutation, UseMutationOptions } from 'react-query';
import { MutationFetchFunction } from '../../common/helpers/common';
import { ApiResult } from '../../common/repositories';
import { LoginInput, TokenResult } from './auth.model';

export function useLogin(
  options?: UseMutationOptions<ApiResult<TokenResult>, 'Error', LoginInput>,
) {
  return useMutation<ApiResult<TokenResult>, 'Error', LoginInput>(async function (body) {
    return await MutationFetchFunction('https://fakestoreapi.com/auth/login', 'POST', body);
  }, options);
}
