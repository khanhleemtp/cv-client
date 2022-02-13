import { useEffect } from 'react';
import CvCard from '../cv-card/cv-card.component.component';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './../../../redux/user/user.selectors';
import { connect } from 'react-redux';
import { loadInfoCardStart } from './../../../redux/resumeJob/resumeJob.action';
import { selectCompanyEmployer } from './../../../redux/employer/employer.selectors';
import { selectInfoCard } from '../../../redux/resumeJob/resumeJob.selectors';

const News = ({ user, company, loadInfoCard, infoCard }) => {
  useEffect(() => {
    company && loadInfoCard(`?company=${company?._id}`);
    return () => {};
  }, [company, loadInfoCard]);

  return (
    <div className="flex flex-col md:flex-row">
      <div className="bg-white p-4 max-w-2xl flex-grow">
        <div className="font-medium text-lg">Hiệu quả tuyển dụng</div>
        <div className="grid grid-cols-1 md:grid-cols-2 max-w-2xl gap-4 my-4">
          <CvCard
            title="Tin tuyển dụng hiển thị"
            icon="report"
            count={infoCard?.totalJob}
            bg="3"
          />
          <CvCard
            title="CV chưa phản hồi"
            icon="text"
            count={infoCard?.pending}
            bg="0"
          />
          <CvCard
            title="CV từ chối"
            icon="flag"
            count={infoCard?.reject}
            bg="1"
          />
          <CvCard
            title="Cv chấp nhận"
            icon="add"
            count={infoCard?.accept}
            bg="2"
          />
        </div>
      </div>
      <div className="bg-white shadow-sm flex-grow h-40 my-2 md:mx-2 md:my-0 p-4 bg-none md:bg-resume-img bg-right bg-cover bg-no-repeat">
        <div className="font-medium">Xin chào, {user?.name} 😁</div>
        <div>
          <div>Mã NTD: {user?.id} </div>
          <div>Email: {user?.email}</div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser,
  company: selectCompanyEmployer,
  infoCard: selectInfoCard,
});

const mapDispatchToProps = (dispatch) => ({
  loadInfoCard: (qr) => dispatch(loadInfoCardStart(qr)),
});

export default connect(mapStateToProps, mapDispatchToProps)(News);
