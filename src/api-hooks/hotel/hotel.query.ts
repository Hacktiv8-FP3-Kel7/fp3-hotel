import { MutationFetchFunction } from '@app/common/helpers/common';
import { ExtendedApiResult } from '@app/common/repositories';
import { API_KEY, API_URL } from '@env';
import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { getHotels, HotelModel } from './hotel.model';

export default function useGetHotels(
  input?: getHotels,
  options?: UseQueryOptions<ExtendedApiResult<HotelModel[]>, 'Error'>,
): UseQueryResult<ExtendedApiResult<HotelModel[]>, 'Error'> {
  return useQuery<ExtendedApiResult<HotelModel[]>, 'Error'>(
    ['get-hotels', input?.params],
    () =>
      MutationFetchFunction({
        method: 'GET',
        url: API_URL,
        headers: {
          'x-api-key': API_KEY,
        },
        inputParams: { size: 5, ...input?.params },
      }),
    options,
  );
}
