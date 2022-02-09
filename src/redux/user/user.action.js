import { UserActionTypes } from './user.types';

export const loadingApi = () => ({
  type: UserActionTypes.LOADING_API,
});

export const loadingUpdate = () => ({
  type: UserActionTypes.UPDATE_USER,
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

export const checkUserSession = (nextRoute = false) => ({
  type: UserActionTypes.CHECK_USER_SESSION,
  payload: nextRoute,
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

export const updatePasswordStart = (data) => ({
  type: UserActionTypes.UPDATE_PASSWORD_START,
  payload: data,
});

export const updatePasswordSuccess = () => ({
  type: UserActionTypes.UPDATE_PASSWORD_SUCCESS,
});

export const updatePasswordFailure = (error) => ({
  type: UserActionTypes.UPDATE_PASSWORD_FAILURE,
  payload: error,
});

export const updateUserInfoStart = (updatedData) => ({
  type: UserActionTypes.UPDATE_INFO_START,
  payload: updatedData,
});

export const updateUserInfoSuccess = (data) => ({
  type: UserActionTypes.UPDATE_INFO_SUCCESS,
  payload: data,
});

export const updateUserInfoFailure = (error) => ({
  type: UserActionTypes.UPDATE_INFO_FAILURE,
  payload: error,
});

export const userSaveJobStart = (jobId) => ({
  type: UserActionTypes.SAVE_JOB_START,
  payload: jobId,
});

export const updateListCvInUser = (payload) => ({
  type: UserActionTypes.UPDATE_LIST_CV_IN_USER,
  payload,
});

export const deleteCvInUser = (payload) => ({
  type: UserActionTypes.DELETE_CV_IN_USER,
  payload,
});

export const viewNoti = (payload) => ({
  type: UserActionTypes.VIEW_NOTI,
  payload,
});
