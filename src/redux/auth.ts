import { HotelModel } from '@app/api-hooks/hotel/hotel.model';
import ToastHelper from '@app/common/helpers/toast';
import { createModel } from '@rematch/core';
import type { RootModel, RootState } from '.';
import { User } from '../api-hooks/user/user.model';

export interface BookingModel extends HotelModel {
  orderer: string;
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
      ToastHelper.success('Berhasil membuat booking');
      return { ...state, bookingData: state.bookingData.concat(payload) };
    },
    addFavorite(state: AuthState, payload: HotelModel): AuthState {
      ToastHelper.success('Berhasil ditambahkan ke favorite');
      return { ...state, favorite: state.favorite.concat(payload) };
    },
    removeFavorite(state: AuthState, payload: HotelModel): AuthState {
      const foundFavorite = state.favorite?.findIndex((hotel) => hotel.hotelId === payload.hotelId);

      if (foundFavorite > -1) {
        const newFavorite = [...state.favorite];
        newFavorite.splice(foundFavorite, 1);
        ToastHelper.success('Berhasil dihapus dari favorite');

        return {
          ...state,
          favorite: newFavorite,
        };
      }

      ToastHelper.error('Gagal dihapus dari favorite');

      return { ...state };
    },
    addHistory(state: AuthState, payload: SearchHistoryModel): AuthState {
      return { ...state, searchHistories: state.searchHistories.concat(payload) };
    },
    clearHistory(state: AuthState, payload: SearchHistoryModel): AuthState {
      const foundHistory = state.searchHistories.findIndex((history) => history.id === payload.id);

      if (foundHistory > -1) {
        const newHistories = [...state.searchHistories];
        newHistories.splice(foundHistory, 1);
        ToastHelper.success('History berhasil dihapus');

        return { ...state, searchHistories: newHistories };
      }

      ToastHelper.error('History gagal dihapus');

      return { ...state };
    },
    clearAllHistory(state: AuthState): AuthState {
      ToastHelper.success('Semua History berhasil dihapus');
      return { ...state, searchHistories: [] };
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
const searchHistories = (state: RootState) => state.auth.searchHistories;

export const authSelector = {
  userSelector,
  bookingSelector,
  favoriteSelector,
  searchHistories,
};

export default auth;
