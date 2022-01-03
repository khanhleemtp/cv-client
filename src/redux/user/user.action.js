import { UserActionTypes } from './user.types';

export const loadingApi = () => ({
  type: UserActionTypes.LOADING_API,
});

export const loadingUser = () => ({
  type: UserActionTypes.LOADING_USER,
});

export const loadingVerify = () => ({
  type: UserActionTypes.LOADING_VERIFY,
});

export const emailSignInStart = (emailAndPassword) => ({
  type: UserActionTypes.EMAIL_SIGN_IN_START,
  payload: emailAndPassword,
});

export const signInSuccess = (user) => ({
  type: UserActionTypes.SIGN_IN_SUCCESS,
  payload: user,
});

export const signInFailure = (error) => ({
  type: UserActionTypes.SIGN_IN_FAILURE,
  payload: error,
});

export const checkUserSession = () => ({
  type: UserActionTypes.CHECK_USER_SESSION,
});

export const signOutStart = () => ({
  type: UserActionTypes.SIGN_OUT_START,
});

export const signOutSuccess = () => ({
  type: UserActionTypes.SIGN_OUT_SUCCESS,
});

export const signOutFailure = (error) => ({
  type: UserActionTypes.SIGN_OUT_FAILURE,
  payload: error,
});

export const signUpStart = (userInfo) => ({
  type: UserActionTypes.SIGN_UP_START,
  payload: userInfo,
});

export const signUpSuccess = ({ user, additionalData }) => ({
  type: UserActionTypes.SIGN_UP_SUCCESS,
  payload: { user, additionalData },
});

export const signUpFailure = (error) => ({
  type: UserActionTypes.SIGN_UP_FAILURE,
  payload: error,
});

export const verifyStart = (data) => ({
  type: UserActionTypes.VERIFY_START,
  payload: data,
});

export const verifySuccess = () => ({
  type: UserActionTypes.VERIFY_SUCCESS,
});

export const verifyFailure = (error) => ({
  type: UserActionTypes.VERIFY_FAILURE,
  payload: error,
});

export const requestVerifyStart = (data) => ({
  type: UserActionTypes.REQUEST_VERIFY_START,
  payload: data,
});
