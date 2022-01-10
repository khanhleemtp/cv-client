import { takeLatest, put, call, all, select } from 'redux-saga/effects';
import { CompanyActionTypes } from './company.types';
import axiosInstance from './../../api/axiosConfig';
import { toast } from 'react-toastify';
import {
  loadingRegister,
  registerCompanySuccess,
  registerCompanyFailure,
  loadListCompanySuccess,
  loadListCompanyFailure,
  loadingCompany,
  loadCompanySuccess,
  loadCompanyFailure,
  updatingCompany,
  updateCompanySuccess,
  updateCompanyFailure,
  loadingSingleCompany,
  updateCompanyInList,
} from './company.action';

export function* registerCompany({ payload }) {
  try {
    yield put(loadingRegister());
    yield axiosInstance.post(`/companies`, payload);
    yield put(registerCompanySuccess());
    yield toast.success(
      'Yêu cầu của bạn đã được gửi đi, chúng tôi sẽ liên hệ và phản hồi yêu cầu của bạn.'
    );
  } catch (error) {
    yield toast.error(error?.message);
    yield put(registerCompanyFailure(error?.message));
  }
}

export function* loadListCompany({ payload }) {
  try {
    yield put(loadingCompany());
    const { data } = yield axiosInstance.get(`/companies${payload}`);
    console.log('companyList', data);
    yield put(loadListCompanySuccess(data));
  } catch (error) {
    yield toast.error(error?.message);
    yield put(loadListCompanyFailure(error?.message));
  }
}

export function* loadCompany({ payload }) {
  try {
    yield put(loadingSingleCompany());
    const {
      data: { data },
    } = yield axiosInstance.get(`/companies/${payload}`);
    yield put(loadCompanySuccess(data));
  } catch (error) {
    yield toast.error(error?.message);
    yield put(loadCompanyFailure(error?.message));
  }
}

export function* updateCompany({ payload }) {
  const { id, updateData, config = {} } = payload;
  try {
    yield put(updatingCompany());
    const {
      data: { data },
    } = yield axiosInstance.patch(`/companies/${id}`, updateData, config);
    yield put(updateCompanySuccess(data));
    const listCompany = yield select((state) => state.company.listCompany);
    if (listCompany) {
      yield put(updateCompanyInList(data.id, data));
    }

    yield toast.success('Cập nhật thành công');
  } catch (error) {
    yield toast.error(error?.message);
    yield put(updateCompanyFailure(error?.message));
  }
}

// START
export function* onRegisterCompanyStart() {
  yield takeLatest(CompanyActionTypes.REGISTER_COMPANY_START, registerCompany);
}

export function* onLoadListCompanyStart() {
  yield takeLatest(CompanyActionTypes.LOAD_LIST_COMPANY_START, loadListCompany);
}

export function* onUpdateCompanyStart() {
  yield takeLatest(CompanyActionTypes.UPDATE_COMPANY_START, updateCompany);
}

export function* onLoadCompanyStart() {
  yield takeLatest(CompanyActionTypes.LOAD_COMPANY_START, loadCompany);
}

export function* companySagas() {
  yield all([
    call(onRegisterCompanyStart),
    call(onLoadListCompanyStart),
    call(onLoadCompanyStart),
    call(onUpdateCompanyStart),
  ]);
}
