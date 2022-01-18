import { useEffect } from 'react';
import { createStructuredSelector } from 'reselect';
import {
  selectLoadingJob,
  selectListJob,
  selectTotalJob,
} from './../../../redux/job/job.selectors';
import { loadingListJobStart } from './../../../redux/job/job.action';
import { connect } from 'react-redux';
import JobCard from './../../job-card/job-card.component';
import { useForm, useWatch } from 'react-hook-form';
import PaginatedItems from '../../paginate/paginate.component';
import JobCardLoading from './../../job-card/job-card-loading.component';

const ListJobCompany = ({
  loadListJob,
  listJob,
  company,
  isLoadingJob,
  total,
}) => {
  const { setValue, control } = useForm({
    defaultValues: {
      page: 0,
    },
  });

  const handleChangePage = (page) => setValue('page', page);
  const page = useWatch({ control, name: 'page' });

  useEffect(() => {
    loadListJob(
      `?company=${
        company?._id
      }&isPublic=true&to[gte]=${new Date().toISOString()}&page=${
        page + 1
      }&limit=4`
    );
  }, [loadListJob, company, page]);

  const renderCurrent = () => {
    if ((page + 1) * 4 > total) return total;
    else return (page + 1) * 4;
  };

  return isLoadingJob ? (
    <div className="space-y-4">
      {' '}
      {[1, 2, 3, 4].map((job) => (
        <JobCardLoading key={job} />
      ))}
    </div>
  ) : listJob?.length === 0 ? (
    <div>Hiện tại công ty chưa có công việc nào</div>
  ) : (
    <div className="space-y-4">
      {listJob?.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
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
  );
};

const mapStateToProps = createStructuredSelector({
  isLoadingJob: selectLoadingJob,
  listJob: selectListJob,
  total: selectTotalJob,
});

const mapDispatchToProps = (dispatch) => ({
  loadListJob: (query) => dispatch(loadingListJobStart(query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListJobCompany);
