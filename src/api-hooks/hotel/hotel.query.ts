import { MutationFetchFunction } from '@app/common/helpers/common';
import { ExtendedApiResult } from '@app/common/repositories';
import { apiKey, apiURL } from '@app/utils/api-info';
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
        url: apiURL,
        headers: {
          'x-api-key': apiKey,
        },
        inputParams: { size: 1, ...input?.params },
      }),
    options,
  );
}
