import { useCallback } from 'react';
import { connect } from 'react-redux';
import {
  selectIdsInResumeJob,
  selectJobInResumeJob,
} from './../../../redux/resumeJob/resumeJob.selectors';
import Button from '../../button/button.component';
import { Link } from 'react-router-dom';
import { loadListCvStart } from './../../../redux/cv/cv.action';
import {
  selectListCvData,
  selectLoadingApi,
  selectTotalCv,
} from './../../../redux/cv/cv.selectors';
import { updateResumeJobStart } from './../../../redux/resumeJob/resumeJob.action';
import { saveCvInJob } from '../../../redux/job/job.action';

const ListSavedCv = ({ jobInfo, idsCv, saveCv }) => {
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
          status: 'chua-phan-hoi',
        };
    }
  }, []);

  return (
    <form className="space-y-4">
      <div className="capitalize font-medium">Tiêu đề: {jobInfo?.title}</div>

      <div className="-my-2 overflow-x">
        <div className="py-2 align-middle inline-block min-w-full">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="w-full">
              <tbody className="bg-white divide-y divide-gray-200">
                {jobInfo?.listSavedCv?.map((cv) => (
                  <tr key={cv.id}>
                    <td className="px-6 py-4 whitespace-wrap">
                      <div className="flex space-x-2">
                        <img
                          src={cv?.header?.photo}
                          alt=""
                          className="w-8 h-8"
                        />
                        <div className="space-y-1">
                          <div className="flex font-medium">
                            {cv?.header?.name}
                          </div>
                          <div>{cv?.header?.title}</div>

                          <div>{cv?.viewed ? <div>Đã xem</div> : null}</div>
                          <div>
                            {cv?.received === 'theo-doi' ? (
                              <div>Đang theo dõi</div>
                            ) : null}
                          </div>
                          <Link
                            to={`/preview/${cv?.id}`}
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
                            {cv?.sections
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
                            {cv?.sections
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
                            {cv?.sections
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
                    <td className="px-6 py-4 whitespace-nowrap space-y-1">
                      {idsCv[cv.id]?.response && (
                        <div className="flex flex-wrap item-center space-x-1">
                          <div
                            className={`w-4 h-4 mt-0.5 rounded-full ${
                              renderResponse(idsCv[cv.id]?.response).color
                            }`}
                          ></div>
                          <div>
                            {renderResponse(idsCv[cv.id]?.response).text}
                          </div>
                        </div>
                      )}
                      <div className="flex flex-col space-y-2">
                        <Button
                          className={
                            jobInfo?.savedCv?.find((job) => job === cv?.id)
                              ? 'bg-gray-400 hover:bg-gray-500'
                              : ''
                          }
                          text={
                            jobInfo?.savedCv?.find((job) => job === cv?.id)
                              ? 'Bỏ lưu'
                              : 'Lưu ngay'
                          }
                          size="small"
                          onClick={saveCv({
                            jobId: jobInfo?.id,
                            cvId: cv?.id,
                          })}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </form>
  );
};

const mapStateToProps = (state, ownProps) => ({
  jobInfo: selectJobInResumeJob(ownProps.jobId)(state),
  listCv: selectListCvData(state),
  loading: selectLoadingApi(state),
  total: selectTotalCv(state),
  idsCv: selectIdsInResumeJob(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadListCv: (qr) => dispatch(loadListCvStart(qr)),
  editResumeJob: (data) => dispatch(updateResumeJobStart(data)),
  saveCv: (data) => () => dispatch(saveCvInJob(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListSavedCv);
