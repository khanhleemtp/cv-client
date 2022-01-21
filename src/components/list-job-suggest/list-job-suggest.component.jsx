import { useEffect } from 'react';
import keyBy from 'lodash-es/keyBy';
import uniqBy from 'lodash-es/uniqBy';
import join from 'lodash-es/join';
import { connect } from 'react-redux';
import { loadingListJobStart } from './../../redux/job/job.action';
import { createStructuredSelector } from 'reselect';
import {
  selectTotalJob,
  selectLoadingJob,
  selectListJob,
} from './../../redux/job/job.selectors';
import { useForm, useWatch } from 'react-hook-form';
import PaginatedItems from './../paginate/paginate.component';
import JobCard from './../job-card/job-card.component';
import JobCardLoading from './../job-card/job-card-loading.component';

const ListJobSuggest = ({ resume, loadListJob, total, listJob, loading }) => {
  const methods = useForm({
    defaultValues: {
      page: 0,
    },
  });

  const { control, setValue } = methods;
  const page = useWatch({ control, name: 'page' });
  // encodeURIComponent
  useEffect(() => {
    loadListJob(
      `?sk=${encodeURIComponent(
        join(
          (uniqBy,
          keyBy(resume?.sections, 'record')['TechnologySection'].items.map(
            (item) => item.tags.map((tag) => tag.text)
          ))[0],
          ','
        )
      )}&ti=${
        resume?.header?.title
      }&isPublic=true&to[gte]=${new Date().toISOString()}&page=${page}&limit=8`
    );
    return () => {};
  }, [loadListJob, resume, page]);

  const renderCurrent = () => {
    if ((page + 1) * 8 > total) return total;
    else return (page + 1) * 8;
  };

  const handleChangePage = (pageValue) => {
    setValue('page', pageValue);
  };

  return (
    <div>
      <div className="text-center p-2 text-lg font-medium">
        Có {total} việc làm phù hợp
      </div>
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
      {loading ? (
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
  );
};

const mapDispatchToProps = (dispatch) => ({
  loadListJob: (qr) => dispatch(loadingListJobStart(qr)),
});

const mapStateToProps = createStructuredSelector({
  total: selectTotalJob,
  listJob: selectListJob,
  loading: selectLoadingJob,
});

export default connect(mapStateToProps, mapDispatchToProps)(ListJobSuggest);
