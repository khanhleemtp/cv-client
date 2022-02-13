import { ResumeJobActionTypes } from './resumeJob.types';
import keyBy from 'lodash-es/keyBy';

const INITIAL_STATE = {
  error: null,
  isLoading: false,
  isCreating: false,
  isUpdating: false,
  isLoadingChart: false,
  listResumeJob: [],
  resumeJob: null,
  total: 0,
  result: 0,
  infoChart: null,
  infoCard: {
    totalJob: 0,
    pending: 0,
    reject: 0,
    accept: 0,
  },
};

const resumeJobReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ResumeJobActionTypes.LOADING_CREATE_RESUME_JOB: {
      return {
        ...state,
        isCreating: true,
      };
    }
    case ResumeJobActionTypes.LOADING_INFO_CHART: {
      return {
        ...state,
        isLoadingChart: true,
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
        listResumeJob: [job, ...state.listResumeJob],
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
    case ResumeJobActionTypes.UPDATE_RESUME_JOB_SUCCESS: {
      const newResumeJob = action.payload;
      const listObj = keyBy(state.listResumeJob, 'id');
      listObj[newResumeJob.id] = newResumeJob;
      const newList = Object.values(listObj);
      return {
        ...state,
        resumeJob: newResumeJob,
        listResumeJob: newList,
        isLoading: false,
        isUpdating: false,
        isCreating: false,
        error: null,
      };
    }
    case ResumeJobActionTypes.LOAD_INFO_CHART_SUCCESS: {
      return {
        ...state,
        isLoadingChart: false,
        infoChart: action.payload,
      };
    }
    case ResumeJobActionTypes.LOAD_INFO_CARD_SUCCESS: {
      console.log('payload', action.payload);
      return {
        ...state,
        infoCard: {
          ...state.infoCard,
          totalJob: action.payload?.totalJob,
          pending: action.payload?.data?.filter(
            (item) => item._id === null
          )?.[0]?.count,
          reject: action.payload?.data?.filter(
            (item) => item._id === 'tu-choi'
          )?.[0]?.count,
          accept: action.payload?.data?.filter(
            (item) => item._id === 'phu-hop'
          )?.[0]?.count,
        },
      };
    }
    case ResumeJobActionTypes.LOAD_INFO_CHART_FAILURE: {
      return {
        ...state,
        isLoadingChart: false,
        error: action.payload,
      };
    }
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
