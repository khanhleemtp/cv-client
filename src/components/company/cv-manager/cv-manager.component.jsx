import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { connect } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

// import PopoverSetting from './../PopoverSetting';

import { PencilIcon, SearchIcon, LinkIcon } from '@heroicons/react/solid';

import InputApp from './../../input-app/input-app.component';

import PaginatedItems from './../../paginate/paginate.component';
import moment from 'moment';

import {
  selectTotalJob,
  selectLoadingJob,
  selectListJob,
} from './../../../redux/job/job.selectors';

import { STATUS_JOB_SEARCH } from '../../../data/input.data';
import InputSelect from './../../input-app/input-select.component';
import LoadingSmall from '../../loading-small/loading-small.component';
import { loadingListJobStart } from '../../../redux/job/job.action';
import { selectCompanyEmployer } from '../../../redux/employer/employer.selectors';
import { openModal } from './../../../redux/viewState/viewState.action';
import { updateJobStart } from './../../../redux/job/job.action';

const CvManager = ({
  total,
  isLoading,
  listJob,
  loadListJob,
  editJob,
  company,
  activeJob,
}) => {
  const router = useRouteMatch();
  console.log('router', router.url);

  const { register, watch, setValue, control } = useForm({
    defaultValues: {
      status: '',
      search: '',
      page: 0,
    },
  });

  const handleChangePage = (page) => setValue('page', page);

  useEffect(() => {
    loadListJob(`?company=${company?.id}&page=1&limit=4`);
    console.log('run here');
  }, [loadListJob, company]);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      const { status, search, page } = value;
      if (name === 'search' || name === 'status') setValue('page', 0);

      const renderSearch = () => {
        if (status === '' && search === '') {
          return `?company=${company?.id}&page=${page + 1}&limit=4`;
        }
        if (status && search === '') {
          return `?company=${company?.id}&status=${status}&page=${
            page + 1
          }&limit=4`;
        }
        if (status === '' && search) {
          return `?company=${company?.id}&slug=${search}&page=${
            page + 1
          }&limit=4`;
        }
        return `?company=${company?.id}&status=${status}&slug=${search}&page=${
          page + 1
        }&limit=4`;
      };
      loadListJob(renderSearch(status, search));
    });
    return () => subscription.unsubscribe();
  }, [loadListJob, watch, setValue, company]);

  const page = useWatch({ control, name: 'page' });

  const renderCurrent = () => {
    if ((page + 1) * 4 > total) return total;
    else return (page + 1) * 4;
  };

  return (
    <div className="flex flex-col mx-auto container">
      <div className="flex flex-col md:flex-row justify-end items-center my-2 mx-8">
        <div className="max-w-xs mx-2 w-full">
          <InputApp
            name="search"
            register={register}
            placeholder="Tìm việc làm"
          />
        </div>

        <InputSelect
          register={register}
          name="status"
          options={STATUS_JOB_SEARCH}
          label=""
        />
      </div>

      <div className="-my-2 overflow-x-auto">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Tiêu đề
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Số lượng
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Vị trí công việc
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Mức lương
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Kinh nghiệm
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Khu vực
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Hạn chót
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Action
                  </th>
                  {/* <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th> */}
                </tr>
              </thead>
              {isLoading ? (
                <tbody className="text-center text-base">
                  <tr>
                    <td>
                      <LoadingSmall />
                    </td>
                  </tr>
                </tbody>
              ) : listJob?.length === 0 ? (
                <tbody className="text-center text-base">
                  <tr>
                    <td>Không có kết quả nào phù hợp</td>
                  </tr>
                </tbody>
              ) : (
                <tbody className="bg-white divide-y divide-gray-200">
                  {listJob?.map((job) => (
                    <tr key={job?.id}>
                      <td className="px-6 py-4 whitespace-wrap">
                        <div className="flex items-center">{job?.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {job?.numOfPerson} người
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {job?.position}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {job?.salary} triệu
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {job?.experience} năm
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{job?.area}</div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {moment(job?.to).fromNow()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium cursor-pointer">
                        <div className="text-indigo-600 hover:text-indigo-900 flex items-center select-none space-x-2">
                          <div title="Chỉnh sửa công việc">
                            <PencilIcon
                              className="w-6 h-6"
                              onClick={editJob(job)}
                            />
                          </div>
                          <Link title="Xem thử" to={`/job-page/${job._id}`}>
                            <LinkIcon className="w-6 h-6" />
                          </Link>
                          <Link
                            title="Xem thử"
                            to={`/company/campaign/${job._id}`}
                          >
                            <div title="Tìm Cv">
                              <SearchIcon className="w-6 h-6" />
                            </div>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
            <div className="flex items-center justify-end">
              <PaginatedItems
                itemsPerPage={4}
                pageCount={Math.ceil(total / 4)}
                cb={handleChangePage}
                page={page}
              />
              <div className="mx-2 w-12 h-full">
                {renderCurrent()}/{total}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  loadListJob: (query) => dispatch(loadingListJobStart(query)),
  editJob: (job) => () => dispatch(openModal('EDIT_JOB', { job })),
  activeJob: (data) => dispatch(updateJobStart(data)),
});

const mapStateToProps = createStructuredSelector({
  isLoading: selectLoadingJob,
  total: selectTotalJob,
  listJob: selectListJob,
  company: selectCompanyEmployer,
});

export default connect(mapStateToProps, mapDispatchToProps)(CvManager);
