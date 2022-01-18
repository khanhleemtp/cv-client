import { useEffect } from 'react';
import {
  LocationMarkerIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UsersIcon,
  TruckIcon,
  CubeIcon,
  CalendarIcon,
} from '@heroicons/react/solid';
import moment from 'moment';
import { Link } from 'react-router-dom';
import EditorPreview from './../../editor-preview/editor-preview.component';
import { createStructuredSelector } from 'reselect';

import { connect } from 'react-redux';
import LoadingSmall from './../../loading-small/loading-small.component';
import { loadingJobStart } from '../../../redux/job/job.action';
import {
  selectCompanyInJob,
  selectJob,
  selectSingleLoadingJob,
} from './../../../redux/job/job.selectors';
import ListJobCompany from './../../company-page/company-details/list-job-company.component';
import ButtonSaveJob from './button-save-job.component';
import { selectCurrentUser } from '../../../redux/user/user.selectors';
import ButtonChoiceCv from './button-choice-cv.component';
import CommonJobInfo from './common-job-info.component';
import SectionJob from './section-job.component';

const JobDetails = ({
  loadJob,
  company,
  job,
  user,
  loading,
  choiceCv,
  ...props
}) => {
  let jobId = props?.match.params.jobId;

  useEffect(() => {
    loadJob(jobId);
    return () => {};
  }, [jobId, loadJob]);

  return loading ? (
    <LoadingSmall />
  ) : (
    <div className="container mx-auto max-w-6xl my-16">
      {/* Cover */}
      <div className="bg-white relative flex items-end p-4">
        <div className="items-center relative w-full flex flex-wrap md:flex-nowrap space-y-1 md:space-y-4 md:space-x-2">
          <div className="p-1 rounded-lg bg-white shadow-lg ring-1">
            <img
              src={company?.logo}
              alt="cover"
              className="object-contain h-32 w-32"
            />
          </div>
          <div className="bg-white text-gray-600 p-4 md:space-y-4 flex-grow">
            <div className="font-medium text-lg md:text-2xl text-indigo-500 capitalize">
              {job?.title}
            </div>
            <div className="font-medium text-lg md:text-2xl truncate capitalize">
              <Link to={`/company-page/${company?.id}`}>{company?.name}</Link>{' '}
            </div>
            <div className="flex flex-col md:flex-row space-x-0 md:space-x-4">
              <div className="flex items-center space-x-2">
                <ClockIcon className="w-6 h-6" />
                <div>Hạn nộp cv: {moment(job?.to).format('DD/MM/YYYY')}</div>
              </div>
              <div></div>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <ButtonChoiceCv user={user} job={job} />
            <ButtonSaveJob job={job} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-6 my-2 gap-2">
        <div className="col-span-6 md:col-span-4 bg-white p-6 space-y-4">
          <div className="divide-x-4 flex divide-indigo-400">
            <div className=""></div>
            <div className="pl-3 text-xl">Thông tin chung</div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <CommonJobInfo
              title="Mức lương"
              info={`${job?.salary} triệu`}
              icon={<CurrencyDollarIcon />}
            />
            <CommonJobInfo
              title="Số lượng"
              info={`${job?.numOfPerson} ngườI`}
              icon={<UsersIcon />}
            />
            <CommonJobInfo
              title="Hình thức làm việc"
              info={`${job?.type}`}
              icon={<TruckIcon />}
            />
            <CommonJobInfo
              title="Vị trí"
              info={`${job?.position}`}
              icon={<CubeIcon />}
            />
            <CommonJobInfo
              title="Kinh nghiệm"
              info={`${job?.experience}`}
              icon={<CalendarIcon />}
            />
          </div>
        </div>

        <div className="col-span-6 md:col-span-2 bg-white p-6">
          <div className="divide-x-4 flex divide-indigo-400">
            <div className=""></div>
            <div className="pl-3 text-xl">Địa chỉ</div>
          </div>
          <div className="flex items-center space-x-2 mt-2">
            <LocationMarkerIcon className="w-8 h-8" />
            <div>{company?.address}</div>
          </div>
          <div className="divide-x-4 flex divide-indigo-400 my-2">
            <div className=""></div>
            <div className="pl-3 text-xl">Khu vực</div>
          </div>
          <div className="flex space-x-2 my-2 cursor-pointer">
            {job?.area?.map((add) => (
              <div className="p-2 bg-gray-200 rounded-full truncate" key={add}>
                <div>{add}</div>
              </div>
            ))}
          </div>
        </div>

        <SectionJob title="Mô tả công việc">
          <EditorPreview element={job?.descriptions} />
        </SectionJob>
        <SectionJob title="Yêu cầu ứng viên">
          <EditorPreview element={job?.requirements} />
        </SectionJob>
        <SectionJob title="Quyền lợi">
          <EditorPreview element={job?.benefits} />
        </SectionJob>
        <SectionJob title="Thông tin công ty">
          <EditorPreview element={company?.descriptions} />
        </SectionJob>
        <SectionJob title="Tin tuyển dụng">
          {company && <ListJobCompany company={company} />}
        </SectionJob>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  loadJob: (id) => dispatch(loadingJobStart(id)),
});

const mapStateToProps = createStructuredSelector({
  job: selectJob,
  loading: selectSingleLoadingJob,
  company: selectCompanyInJob,
  user: selectCurrentUser,
});

export default connect(mapStateToProps, mapDispatchToProps)(JobDetails);
