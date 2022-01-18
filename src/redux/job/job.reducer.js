import { JobActionTypes } from './job.types';
import keyBy from 'lodash-es/keyBy';

const INITIAL_STATE = {
  error: null,
  isLoading: false,
  isUpdating: false,
  isCreating: false,
  isSingleLoading: false,
  isApply: false,
  job: null,
  listJob: [],
  result: null,
  total: null,
};

const jobReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case JobActionTypes.LOADING_APPLY_JOB: {
      return {
        ...state,
        isApply: true,
      };
    }
    case JobActionTypes.APPLY_JOB_SUCCESS: {
      return {
        ...state,
        isApply: false,
      };
    }
    case JobActionTypes.APPLY_JOB_FAILURE: {
      return {
        ...state,
        isApply: false,
        error: action.payload,
      };
    }
    case JobActionTypes.LOADING_CREATE_JOB:
      return {
        ...state,
        isCreating: true,
      };
    case JobActionTypes.LOADING_JOB:
      return {
        ...state,
        isLoading: true,
      };
    case JobActionTypes.LOADING_SINGLE_JOB:
      return {
        ...state,
        isSingleLoading: true,
      };
    case JobActionTypes.UPDATING_JOB:
      return {
        ...state,
        isUpdating: true,
      };
    case JobActionTypes.CREATE_JOB_SUCCESS: {
      const job = action.payload;
      return {
        ...state,
        listJob: [job, ...state.listJob],
        result: state.result + 1,
        total: state.total + 1,
        isCreating: false,
      };
    }
    case JobActionTypes.LOAD_LIST_JOB_SUCCESS: {
      const { data, result, total } = action.payload;
      return {
        ...state,
        listJob: data,
        result: result,
        total: total,
        isLoading: false,
        isUpdating: false,
        isCreating: false,
        isSingleLoading: false,
        error: null,
      };
    }
    case JobActionTypes.LOAD_JOB_SUCCESS:
    case JobActionTypes.UPDATE_JOB_SUCCESS:
      return {
        ...state,
        job: action.payload,
        isLoading: false,
        isUpdating: false,
        isCreating: false,
        isSingleLoading: false,
        error: null,
      };
    case JobActionTypes.UPDATE_JOB_IN_LIST: {
      const { id, data } = action.payload;
      const listJob = state.listJob;
      const objectListJob = keyBy(listJob, 'id');
      objectListJob[id] = data;
      const newList = Object.values(objectListJob);
      return {
        ...state,
        listJob: newList,
      };
    }

    case JobActionTypes.UPDATE_JOB_FAILURE:
    case JobActionTypes.CREATE_JOB_FAILURE:
    case JobActionTypes.LOAD_JOB_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
        isUpdating: false,
        isCreating: false,
        isSingleLoading: false,
      };

    default:
      return state;
  }
};

export default jobReducer;
