import { HotelModel } from '@app/api-hooks/hotel/hotel.model';
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

export interface AuthState {
  data?: User;
  bookingData: BookingModel[];
  favorite: HotelModel[];
}

const initialState: AuthState = {
  data: undefined,
  bookingData: [],
  favorite: [],
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
      return { ...state };
    },
    addFavorite(state: AuthState, payload: HotelModel): AuthState {
      state.favorite.push(payload);
      return { ...state };
    },
    removeFavorite(state: AuthState, payload: HotelModel): AuthState {
      const foundFavorite =
        state.favorite?.findIndex((hotel) => hotel.hotelId === payload.hotelId) || -1;
      if (foundFavorite > -1) {
        state.favorite.splice(foundFavorite, 1);
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
