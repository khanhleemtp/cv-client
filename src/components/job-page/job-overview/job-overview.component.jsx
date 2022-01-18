import { useForm, FormProvider, useWatch } from 'react-hook-form';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { loadingListJobStart } from './../../../redux/job/job.action';
import JobCard from './../../job-card/job-card.component';
import JobSearchBox from './../../job-search-box/job-search-box.component';
import {
  selectLoadingJob,
  selectTotalJob,
  selectListJob,
} from './../../../redux/job/job.selectors';

import JobCardLoading from './../../job-card/job-card-loading.component';
import PaginatedItems from '../../paginate/paginate.component';
import { join } from 'lodash-es';

const JobOverview = ({ total, isLoading, listJob, loadListJob, company }) => {
  const methods = useForm({
    defaultValues: {
      page: 0,
      skills: [],
      area: '',
      position: '',
      type: '',
      experience: '',
      salary: '',
      title: '',
    },
  });

  const { control, getValues, setValue } = methods;
  const page = useWatch({ control, name: 'page' });

  const renderCurrent = () => {
    if ((page + 1) * 9 > total) return total;
    else return (page + 1) * 9;
  };

  const handleChangePage = (pageValue) => {
    setValue('page', pageValue);
    const { skills, area, title, position, type, experience, salary } =
      getValues();
    let query = `?page=${pageValue + 1}&limit=9`;
    if (skills.length > 0)
      query = query.concat(
        `&skills=${encodeURIComponent(`${join(skills, ',')}`)}`
      );
    if (area) query = query.concat(`&area=${area}`);
    if (title) query = query.concat(`&slug=${title}`);

    if (position) query = query.concat(`&position=${position}`);
    if (type) query = query.concat(`&type=${type}`);
    if (experience) query = query.concat(`&experience=${experience}`);
    if (salary) query = query.concat(`&salary=${salary}`);

    loadListJob(query);
  };

  return (
    <FormProvider {...methods}>
      <div className="container mx-auto max-w-6xl p-4">
        <div className="my-4">
          <JobSearchBox />
        </div>
        <div>Có {total} việc làm phù hợp</div>
        <div className="flex items-center justify-end">
          <PaginatedItems
            itemsPerPage={9}
            pageCount={Math.ceil(total / 9)}
            cb={handleChangePage}
            page={page}
          />
          <div className="mx-2 w-12 h-full">
            {renderCurrent()}/{total}
          </div>
        </div>
        {isLoading ? (
          <div className="grid md:grid-cols-2 mx-auto container max-w-6xl gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
              <JobCardLoading key={item} />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 mx-auto container max-w-6xl gap-4">
            {listJob?.map((job) => (
              <JobCard job={job} />
            ))}
          </div>
        )}
      </div>
    </FormProvider>
  );
};

const mapDispatchToProps = (dispatch) => ({
  loadListJob: (query) => dispatch(loadingListJobStart(query)),
});

const mapStateToProps = createStructuredSelector({
  isLoading: selectLoadingJob,
  total: selectTotalJob,
  listJob: selectListJob,
});

export default connect(mapStateToProps, mapDispatchToProps)(JobOverview);
