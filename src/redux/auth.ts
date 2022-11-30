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
      state.favorite.push(payload);
      ToastHelper.success(`${payload.name} berhasil ditambahkan ke favorite`);
      return { ...state };
    },
    removeFavorite(state: AuthState, payload: HotelModel): AuthState {
      const foundFavorite = state.favorite.findIndex((hotel) => hotel.hotelId === payload.hotelId);
      if (foundFavorite > -1) {
        state.favorite.splice(foundFavorite, 1);
        console.log(state.favorite);
        ToastHelper.success('Favorite berhasil dihapus');
      } else {
        ToastHelper.error('Data tidak ditemukan');
      }

      return { ...state };
    },
    addHistory(state: AuthState, payload: SearchHistoryModel): AuthState {
      console.log(payload);
      state.searchHistories.push(payload);
      return { ...state };
    },
    removeHistory(state: AuthState, payload: SearchHistoryModel): AuthState {
      const foundHistory = state.searchHistories.findIndex((history) => history.id === payload.id);
      if (foundHistory > -1) {
        state.searchHistories.splice(foundHistory, 1);
        ToastHelper.success('History berhasil dihapus');
      } else {
        ToastHelper.error('Data tidak ditemukan');
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
