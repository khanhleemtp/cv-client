import { useState, useEffect } from 'react';
import MultiPicker from '../../input-app/multi-picker/multi-picker.component';
import {
  selectJobInResumeJob,
  selectLoadingChart,
} from './../../../redux/resumeJob/resumeJob.selectors';
import { connect } from 'react-redux';
import moment from 'moment';
import ApplicantChart from './applicant-chart.component';
import { loadInfoChartStart } from '../../../redux/resumeJob/resumeJob.action';
import LoadingSmall from './../../loading-small/loading-small.component';

const JobChart = ({ jobInfo, loadInfoChart, jobId, loadingChart }) => {
  const [date, setDate] = useState({
    to: moment().toDate(),
    from: moment().subtract(7, 'd').startOf('day').toDate(),
  });

  useEffect(() => {
    loadInfoChart(
      `?id=${jobId}&from=${moment(date.from).toISOString()}&to=${moment(
        date.to
      ).toISOString()}`
    );
  }, [loadInfoChart, date, jobId]);

  return (
    <div>
      <MultiPicker
        createdAt={jobInfo?.createdAt}
        date={date}
        setDate={setDate}
      />
      {loadingChart ? (
        <LoadingSmall />
      ) : (
        <div className="w-full max-w-4xl container mx-auto">
          <ApplicantChart />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  jobInfo: selectJobInResumeJob(ownProps.jobId)(state),
  loadingChart: selectLoadingChart(state),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  loadInfoChart: (qr) => dispatch(loadInfoChartStart(qr)),
});

export default connect(mapStateToProps, mapDispatchToProps)(JobChart);
