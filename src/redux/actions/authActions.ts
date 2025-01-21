// src/redux/actions/authActions.ts

import { Dispatch } from "redux";
import {  GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS } from "../types/actionTypes";
import { auth } from "../../fireBaseConfig/fireBaseConfig";

// Define action interfaces
export interface LoginRequestAction {
  type: typeof LOGIN_REQUEST;
}


export interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: any; // Replace with a proper user type if available
}

export interface LoginFailureAction {
  type: typeof LOGIN_FAILURE;
  payload: string; // Error message
}

export interface LogoutSuccessAction {
  type: typeof LOGOUT_SUCCESS;
}

// Union of all action types
export type AuthAction =
  | LoginRequestAction
  | LoginSuccessAction
  | LoginFailureAction
  | LogoutSuccessAction;

// Google login action
export const googleLogin = () => async (dispatch: Dispatch<AuthAction>) => {
  dispatch({ type: LOGIN_REQUEST });
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    dispatch({ type: LOGIN_SUCCESS, payload: user });
  } catch (error: any) {
    dispatch({ type: LOGIN_FAILURE, payload: error.message });
  }
};

// Logout action
export const logout = () => async (dispatch: Dispatch<AuthAction>) => {
  try {
    await signOut(auth);
    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    console.error("Logout Error:", error);
  }
};