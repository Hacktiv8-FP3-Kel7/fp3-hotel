import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { UserLiteModel } from './user.model';

export function useGetUsers(
  options?: UseQueryOptions<{ data: UserLiteModel[] }, any>,
): UseQueryResult<{ data: UserLiteModel[] }, any> {
  return useQuery<{ data: UserLiteModel[] }, any>(
    ['getUsers'],
    async () => {
      const result = await fetch('https://fakestoreapi.com/users').then((res) => res.json());
      return { data: result };
    },
    options,
  );
}
