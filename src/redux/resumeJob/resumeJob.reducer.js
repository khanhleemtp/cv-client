import { ResumeJobActionTypes } from './resumeJob.types';
import keyBy from 'lodash-es/keyBy';

const INITIAL_STATE = {
  error: null,
  isLoading: false,
  isCreating: false,
  isUpdating: false,
  listResumeJob: [],
  resumeJob: null,
  total: 0,
  result: 0,
};

const resumeJobReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ResumeJobActionTypes.LOADING_CREATE_RESUME_JOB: {
      return {
        ...state,
        isCreating: true,
      };
    }

    case ResumeJobActionTypes.LOADING_RESUME_JOB:
      return {
        ...state,
        isLoading: true,
      };
    case ResumeJobActionTypes.UPDATING_RESUME_JOB:
      return {
        ...state,
        isUpdating: true,
      };
    case ResumeJobActionTypes.CREATE_RESUME_JOB_SUCCESS: {
      const job = action.payload;
      return {
        ...state,
        listJob: [job, ...state.listJob],
        result: state.result + 1,
        total: state.total + 1,
        isCreating: false,
      };
    }
    case ResumeJobActionTypes.LOAD_LIST_RESUME_JOB_SUCCESS: {
      const { data, result, total } = action.payload;
      return {
        ...state,
        listResumeJob: data,
        result: result,
        total: total,
        isLoading: false,
        isUpdating: false,
        isCreating: false,
        error: null,
      };
    }
    case ResumeJobActionTypes.LOAD_RESUME_JOB_SUCCESS:
    case ResumeJobActionTypes.UPDATE_RESUME_JOB_SUCCESS:
      return {
        ...state,
        resumeJob: action.payload,
        isLoading: false,
        isUpdating: false,
        isCreating: false,
        error: null,
      };
    case ResumeJobActionTypes.UPDATE_RESUME_JOB_IN_LIST: {
      const { id, data } = action.payload;
      const listJob = state.listJob;
      const objectListJob = keyBy(listJob, 'id');
      objectListJob[id] = data;
      const newList = Object.values(objectListJob);
      return {
        ...state,
        listResumeJob: newList,
      };
    }

    case ResumeJobActionTypes.UPDATE_RESUME_RESUME_JOB_FAILURE:
    case ResumeJobActionTypes.CREATE_RESUME_JOB_FAILURE:
    case ResumeJobActionTypes.LOAD_RESUME_JOB_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
        isUpdating: false,
        isCreating: false,
      };

    default:
      return state;
  }
};

export default resumeJobReducer;
