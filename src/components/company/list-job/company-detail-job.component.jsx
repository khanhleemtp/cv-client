import { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { Link, useRouteMatch, useLocation } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';
import { useForm, useWatch } from 'react-hook-form';
import {
  // RESUME_JOB_RECEIVED,
  RESUME_JOB_RESPONSE,
} from '../../../data/input.data';
import LoadingSmall from '../../loading-small/loading-small.component';
import {
  selectListResumeJob,
  selectLoadingListResumeJob,
  selectTotalResumeJob,
} from './../../../redux/resumeJob/resumeJob.selectors';
import {
  loadListResumeJobStart,
  updateResumeJobStart,
} from './../../../redux/resumeJob/resumeJob.action';
import PaginatedItems from '../../paginate/paginate.component';
import SingleSelect from './../../input-app/single-select.component';
import { PencilIcon, SearchIcon } from '@heroicons/react/solid';
import { Popover, Transition } from '@headlessui/react';
import Button from './../../button/button.component';
import FindCvForJob from './find-cv-for-job.component';
import { selectObjectListJob } from '../../../redux/job/job.selectors';
import ListSavedCv from './list-saved-cv.component';

const CompanyDetailsJob = ({
  loadListResume,
  listResumeJob,
  loading,
  total,
  editResumeJob,
  objectListJob,
}) => {
  const {
    params: { jobId },
  } = useRouteMatch();
  const { pathname } = useLocation();

  const { watch, setValue, control } = useForm({
    defaultValues: {
      received: '',
      response: '',
      page: 0,
    },
  });

  useEffect(() => {
    loadListResume(`?job=${jobId}`);
  }, [loadListResume, jobId]);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      const { received, response, page } = value;
      if (name === 'response' || name === 'received') setValue('page', 0);

      const renderSearch = () => {
        if (!received && !response) {
          return `?job=${jobId}&page=${page + 1}&limit=4`;
        }
        if (received && !response) {
          return `?job=${jobId}&received=${received}&page=${page + 1}&limit=4`;
        }
        if (response && !received) {
          return `?job=${jobId}&response=${response}&page=${page + 1}&limit=4`;
        }
        return `?job=${jobId}&response=${response}&received=${received}&page=${
          page + 1
        }&limit=4`;
      };
      loadListResume(renderSearch());
    });
    return () => subscription.unsubscribe();
  }, [setValue, watch, jobId, loadListResume]);

  const page = useWatch({ control, name: 'page' });

  const handleChangePage = (page) => setValue('page', page);

  const renderCurrent = () => {
    if ((page + 1) * 4 > total) return total;
    else return (page + 1) * 4;
  };

  const renderResponse = useCallback((res) => {
    switch (res) {
      case 'tu-choi':
        return {
          text: 'Từ chối',
          color: 'bg-red-400',
          status: 'từ chối',
        };
      case 'phu-hop':
        return {
          text: 'Phù hợp',
          color: 'bg-green-400',
          status: 'phù hợp',
        };
      case 'hen-phong-van':
        return {
          text: 'Hẹn phỏng vấn',
          color: 'bg-blue-400',
          status: 'hẹn phỏng vấn',
        };
      default:
        return {
          text: 'Chưa phản hồi',
          color: 'bg-gray-400',
          status: 'chưa phản hồi',
        };
    }
  }, []);

  // const renderReceived = useCallback((res) => {
  //   switch (res) {
  //     case 'tiep-nhan':
  //       return {
  //         text: 'Ứng tuyển',
  //         color: 'bg-purple-400',
  //       };
  //     case 'de-nghi':
  //       return {
  //         text: 'Đề nghị',
  //         color: 'bg-indigo-400',
  //       };
  //     case 'theo-doi':
  //       return {
  //         text: 'Theo dõi',
  //         color: 'bg-pink-400',
  //       };
  //     default:
  //       return {
  //         text: '',
  //         color: 'bg-gray-400',
  //       };
  //   }
  // }, []);

  if (pathname.split('/')?.find((item) => item === 'search'))
    return <FindCvForJob jobId={jobId} />;
  if (pathname.split('/')?.find((item) => item === 'saved'))
    return <ListSavedCv jobId={jobId} />;
  return (
    <div className="flex flex-col mx-auto container">
      <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl container mx-auto my-2">
        <div className="flex items-center space-x-2">
          <div className="font-medium capitalize">
            Tiêu đề: {objectListJob?.[jobId]?.title}
          </div>
        </div>
        <div className="md:self-end space-y-2 md:space-y-0 flex md:space-x-2 flex-col md:flex-row">
          <div className="flex items-center">
            <div className="text-sm font-medium text-gray-500">Tìm kiếm CV</div>
            <Link to={`/company/campaign/${jobId}/search`}>
              <div className="text-indigo-400 rounded-full p-1">
                <SearchIcon className="w-6 h-6" />
              </div>
            </Link>
          </div>
          <SingleSelect
            name="response"
            control={control}
            placeholder="Phản hồi"
            options={RESUME_JOB_RESPONSE}
          />
        </div>
      </div>
      <div className="pl-10 pb-2">Danh sách ứng viên</div>
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
                    Cv ứng viên
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Thông tin Cv
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Trạng thái
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Thông tin thêm
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Phản hồi
                  </th>

                  {/* <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th> */}
                </tr>
              </thead>
              {loading ? (
                <tbody className="text-center text-base">
                  <tr>
                    <td>
                      <LoadingSmall />
                    </td>
                  </tr>
                </tbody>
              ) : listResumeJob?.length === 0 ? (
                <tbody className="text-center text-base">
                  <tr>
                    <td>Không có kết quả phù hợp</td>
                  </tr>
                </tbody>
              ) : (
                <tbody className="bg-white divide-y divide-gray-200">
                  {listResumeJob?.map((job) => (
                    <tr key={job?.resumeInfo?.id}>
                      <td className="px-6 py-4 whitespace-wrap">
                        <div className="flex space-x-2">
                          <img
                            src={job?.resumeInfo?.header?.photo}
                            alt=""
                            className="w-8 h-8"
                          />
                          <div className="space-y-1">
                            <div className="flex font-medium">
                              {job?.resumeInfo?.header?.name}
                            </div>
                            <div>{job?.resumeInfo?.header?.title}</div>

                            <div>
                              {job?.resumeInfo?.viewed ? (
                                <div>Đã xem</div>
                              ) : null}
                            </div>
                            <div>
                              {job?.resumeInfo?.received === 'theo-doi' ? (
                                <div>Đang theo dõi</div>
                              ) : null}
                            </div>
                            <Link
                              to={`/preview/${job?.resumeInfo.id}`}
                              className="text-indigo-500 hover:text-indigo-700"
                            >
                              Chi tiết
                            </Link>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div>
                            <div className="font-medium">Học vấn</div>
                            <div>
                              {job?.resumeInfo?.sections
                                ?.filter(
                                  (section) =>
                                    section.record === 'EducationSection'
                                )[0]
                                .items?.map((item) => (
                                  <div key={item?._id} className="flex">
                                    <div>{item?.degree}</div>
                                    <span className="mx-1 text-indigo-500 font-bold">
                                      -
                                    </span>
                                    <div>{item?.institution}</div>
                                  </div>
                                ))}
                            </div>
                          </div>
                          <div>
                            <div className="font-medium">Kinh nghiệm</div>
                            <div>
                              {job?.resumeInfo?.sections
                                ?.filter(
                                  (section) =>
                                    section.record === 'ExperienceSection'
                                )[0]
                                .items?.map((item) => (
                                  <div key={item?._id} className="flex">
                                    <div>{item?.position}</div>
                                    <span className="mx-1 text-indigo-500 font-bold">
                                      -
                                    </span>
                                    <div>{item?.workplace}</div>
                                  </div>
                                ))}
                            </div>
                          </div>
                          <div>
                            <div className="font-medium">Kỹ năng chính</div>
                            <div className="flex space-x-2">
                              {job?.resumeInfo?.sections
                                ?.filter(
                                  (section) =>
                                    section.record === 'TechnologySection'
                                )[0]
                                .items?.map((item) =>
                                  item?.tags?.map((tag) => (
                                    <div
                                      className="bg-gray-200 px-1 rounded-sm"
                                      key={tag?.text}
                                    >
                                      {tag?.text}
                                    </div>
                                  ))
                                )}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-wrap item-center space-x-1">
                          <div
                            className={`w-4 h-4 mt-0.5 rounded-full ${
                              renderResponse(job?.response).color
                            }`}
                          ></div>
                          <div>{renderResponse(job?.response).text}</div>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          Cập nhật:{' '}
                          {moment(job?.resumeInfo?.updatedAt).fromNow()}
                        </div>
                        <div>SĐT: {job?.resumeInfo?.header?.phone}</div>
                        <div>Email: {job?.resumeInfo?.header?.email}</div>
                        <div>Địa chỉ: {job?.resumeInfo?.header?.address}</div>
                      </td>
                      <td className="whitespace-nowrap">
                        {job?.received === 'theo-doi' ? (
                          <div>
                            <Button text="Mời ứng tuyển" />
                            <Button text="Bỏ theo dõi" />
                          </div>
                        ) : (
                          <Popover className="relative">
                            <Popover.Button>
                              <PencilIcon className="w-6 h-6 z-10" />
                            </Popover.Button>
                            <Transition
                              enter="transition duration-100 ease-out"
                              enterFrom="transform scale-95 opacity-0"
                              enterTo="transform scale-100 opacity-100"
                              leave="transition duration-75 ease-out"
                              leaveFrom="transform scale-100 opacity-100"
                              leaveTo="transform scale-95 opacity-0"
                            >
                              <Popover.Panel className="absolute z-20 transform -translate-x-full -translate-y-1/2 bg-gray-100 shadow-lg">
                                <div className="flex flex-col text-center">
                                  {[
                                    {
                                      label: 'từ chối',
                                      value: 'tu-choi',
                                    },
                                    {
                                      label: 'đồng ý',
                                      value: 'phu-hop',
                                    },
                                    {
                                      label: 'mời phỏng vấn',
                                      value: 'hen-phong-van',
                                    },
                                  ].map((item) => (
                                    <div
                                      key={item.value}
                                      className="flex items-center space-x-2 px-4 py-3 hover:bg-gray-200 cursor-pointer"
                                      onClick={() =>
                                        editResumeJob({
                                          id: job.id,
                                          updateData: {
                                            response: item.value,
                                            status: item.label,
                                            companyName:
                                              job?.jobInfo?.companyInfo?.name,
                                            user: job?.resumeInfo?.user,
                                            job: job?.jobInfo?.id,
                                            title: job?.jobInfo?.title,
                                          },
                                        })
                                      }
                                    >
                                      <div
                                        className={`w-4 h-4 flex items-center justify-center rounded-full mt-0.5 ${
                                          renderResponse(item.value).color
                                        }`}
                                      ></div>
                                      <div>
                                        {renderResponse(item.value).text}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </Popover.Panel>
                            </Transition>
                          </Popover>
                        )}
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
  loadListResume: (qr) => dispatch(loadListResumeJobStart(qr)),
  editResumeJob: (data) => dispatch(updateResumeJobStart(data)),
});

const mapStateToProps = createStructuredSelector({
  listResumeJob: selectListResumeJob,
  loading: selectLoadingListResumeJob,
  total: selectTotalResumeJob,
  objectListJob: selectObjectListJob,
});

export default connect(mapStateToProps, mapDispatchToProps)(CompanyDetailsJob);
