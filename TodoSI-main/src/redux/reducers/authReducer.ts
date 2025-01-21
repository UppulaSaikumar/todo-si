// src/redux/reducers/authReducer.ts

import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS } from '../types/actionTypes';
import { AuthAction } from '../actions/authActions';

export interface AuthState {
  user: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

const authReducer = (state: AuthState = initialState, action: AuthAction): AuthState => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true, error: null };
    case LOGIN_SUCCESS:
      return { ...state, user: action.payload, loading: false, error: null };
    case LOGIN_FAILURE:
      return { ...state, error: action.payload, loading: false };
    case LOGOUT_SUCCESS:
      return { ...state, user: null, loading: false, error: null };
    default:
      return state;
  }
};

export default authReducer;