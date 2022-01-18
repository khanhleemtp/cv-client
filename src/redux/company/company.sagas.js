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
import { merge } from 'lodash-es';

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
    const {
      data: { data, result, total },
    } = yield axiosInstance.get(`/companies${payload}`);
    const dataFromServer = data;
    let ids = yield dataFromServer?.map((item) => item?.id);

    let listJob = yield all(ids.map((id) => call(fetchListJobInCompany, id)));
    let hostIds = yield dataFromServer?.map((item) => item?.host);
    let hostInfo = yield all(hostIds.map((id) => call(fetchHostCompany, id)));
    console.log('hostInfo', hostInfo);
    // yield put(
    //   loadingListJobSuccess({
    //     result,
    //     total,

    //     data: merge(dataCompany, data),
    //   })
    // );
    yield put(
      loadListCompanySuccess({
        data: merge(dataFromServer, listJob, hostInfo),
        result,
        total,
      })
    );
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

export function* fetchListJobInCompany(id) {
  const {
    data: { data },
  } = yield axiosInstance.get(
    `/jobs?company=${id}&isPublic=true&to[gte]=${new Date().toISOString()}`
  );
  return { listJob: data };
}

export function* fetchHostCompany(id) {
  const {
    data: { data },
  } = yield axiosInstance.get(`/employers/${id}`);
  return { hostInfo: data };
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
