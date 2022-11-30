import { HotelModel } from '@app/api-hooks/hotel/hotel.model';
import ToastHelper from '@app/common/helpers/toast';
import { createModel } from '@rematch/core';
import { produce } from 'immer';
import type { RootModel, RootState } from '.';
import { User } from '../api-hooks/user/user.model';

export interface BookingModel extends HotelModel {
  name: string;
  email: string;
  phoneNumber: string;
  days: number;
  rooms: number;
  guests: number;
  totalPrice: number;
}

export interface SearchHistoryModel {
  id: number;
  name: string;
  start: string;
  end: string;
  starRating: number;
}

export interface AuthState {
  data?: User;
  bookingData: BookingModel[];
  favorite: HotelModel[];
  searchHistories: SearchHistoryModel[];
}

const initialState: AuthState = {
  data: undefined,
  bookingData: [],
  favorite: [],
  searchHistories: [],
};

const auth = createModel<RootModel>()({
  name: 'auth',
  state: initialState,
  reducers: {
    setUser(state: AuthState, payload: User): AuthState {
      return {
        ...state,
        data: payload,
      };
    },
    addBooking(state: AuthState, payload: BookingModel): AuthState {
      state.bookingData.push(payload);
      ToastHelper.success('Berhasil membuat booking');
      return { ...state };
    },
    addFavorite(state: AuthState, payload: HotelModel): AuthState {
      return { ...state, favorite: state.favorite.concat(payload) };
    },
    removeFavorite(state: AuthState, payload: HotelModel): AuthState {
      const foundFavorite = state.favorite?.findIndex((hotel) => hotel.hotelId === payload.hotelId);

      if (foundFavorite > -1) {
        const newFavorite = [...state.favorite];
        newFavorite.splice(foundFavorite, 1);
        return {
          ...state,
          favorite: newFavorite,
        };
      }

      return { ...state };
    },
    reset(): AuthState {
      return {
        ...initialState,
      };
    },
  },
});

const userSelector = (state: RootState) => state.auth?.data;
const bookingSelector = (state: RootState) => state.auth.bookingData;
const favoriteSelector = (state: RootState) => state.auth.favorite;

export const authSelector = {
  userSelector,
  bookingSelector,
  favoriteSelector,
};

export default auth;
