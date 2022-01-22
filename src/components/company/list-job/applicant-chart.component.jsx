import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { createStructuredSelector } from 'reselect';
import { selectInfoChart } from '../../../redux/resumeJob/resumeJob.selectors';
import { connect } from 'react-redux';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Báo cáo ứng tuyển',
    },
  },
  scales: {
    y: {
      min: 0,
      ticks: {
        stepSize: 1,
      },
    },
  },
};

// export const data = {
//   labels,
//   datasets: [
//     {
//       label: 'Ứng tuyển',
//       data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
//       borderColor: 'rgb(255, 99, 132)',
//       backgroundColor: 'rgba(255, 99, 132, 0.5)',
//     },
//     {
//       label: 'Nhận việc',
//       data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
//       borderColor: 'rgb(53, 162, 235)',
//       backgroundColor: 'rgba(53, 162, 235, 0.5)',
//     },
//     {
//       label: 'Hẹn phỏng vấn',
//       data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
//       borderColor: 'rgb(0, 0, 0)',
//       backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     },
//   ],
// };

const ApplicantChart = ({ infoChart }) => {
  console.log(
    'tu-choi',
    infoChart?.map((item) => {
      let count = Object.values(item)[0]?.['tu-choi']?.count;
      count = count ? count : 0;
      return count;
    })
  );

  const renderCount = (status) => {
    return infoChart?.map((item) => {
      let count = Object.values(item)[0]?.[status]?.count;
      count = count ? count : 0;
      return count;
    });
  };

  const data = {
    labels: infoChart?.map((item) => Object.keys(item)),
    datasets: [
      {
        label: 'Phù hợp',
        data: renderCount('phu-hop'),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Từ chối',
        data: renderCount('tu-choi'),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Chưa phản hồi',
        data: renderCount('chua-phan-hoi'),
        borderColor: 'rgb(0, 0, 0)',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
    ],
  };

  return data?.labels?.length === 0 ? (
    <div className="bg-line-chart h-32 md:h-64 w-full bg-contain bg-no-repeat"></div>
  ) : (
    <Line options={options} data={data} />
  );
};

const mapStateToProps = createStructuredSelector({
  infoChart: selectInfoChart,
});

export default connect(mapStateToProps)(ApplicantChart);
