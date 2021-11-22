import { takeLatest, put, call, all } from 'redux-saga/effects';
import axiosInstance from './../../api/axiosConfig';

import { push } from 'connected-react-router';
import { toast } from 'react-toastify';

export function* cvSagas() {
  yield all([]);
}
