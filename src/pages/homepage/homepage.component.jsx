import { useEffect } from 'react';
import NavContainer from './../../components/nav-container/nav-container.component';
import JobCard from '../../components/job-card/job-card.component';
import { loadingListJobStart } from '../../redux/job/job.action';
import { loadListCompanyStart } from './../../redux/company/company.action';
import {
  selectListCompany,
  selectLoadingCompany,
} from './../../redux/company/company.selectors';
import { selectListJob } from '../../redux/job/job.selectors';
import { connect } from 'react-redux';
import { selectLoadingJob } from './../../redux/job/job.selectors';
import { createStructuredSelector } from 'reselect';
import JobCardLoading from './../../components/job-card/job-card-loading.component';
import CompanyCardLoading from './../../components/company-card/company-card-loading.component';
import Footer from '../../components/footer/footer.component';
import CompanyCardSearch from './../../components/company-card/company-card-search.component';

const Homepage = ({
  loadListCompany,
  loadListJob,
  loadingListJob,
  loadingListCompany,
  listJob,
  listCompany,
}) => {
  useEffect(() => {
    loadListCompany(`?limit=10&status=accept`);
    loadListJob(`?limit=10&isPublic=true&to[gte]=${new Date().toISOString()}`);

    return () => {};
  }, [loadListCompany, loadListJob]);

  return (
    <NavContainer>
      <h2>Homepage</h2>
      <div className="container mx-auto max-w-5xl p-4">
        <div className="font-medium text-xl my-4 divide-indigo-400 divide-x-4">
          <div></div>
          <div className="pl-3">Việc làm mới nhất</div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-3">
          {loadingListJob
            ? [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((job) => (
                <JobCardLoading key={job} />
              ))
            : listJob?.map((job, index) => <JobCard key={index} job={job} />)}
        </div>
        <div className="font-medium text-xl my-4 divide-indigo-400 divide-x-4">
          <div></div>
          <div className="pl-3">Nhà tuyển dụng </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-3">
          {loadingListCompany
            ? [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((job) => (
                <CompanyCardLoading key={job} />
              ))
            : listCompany?.map((company, index) => (
                <CompanyCardSearch key={index} company={company} />
              ))}
        </div>
      </div>
      <Footer />
    </NavContainer>
  );
};

const mapDispatchToProps = (dispatch) => ({
  loadListJob: (query) => dispatch(loadingListJobStart(query)),
  loadListCompany: (query) => dispatch(loadListCompanyStart(query)),
});

const mapStateToProps = createStructuredSelector({
  loadingListJob: selectLoadingJob,
  loadingListCompany: selectLoadingCompany,
  listCompany: selectListCompany,
  listJob: selectListJob,
});

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
