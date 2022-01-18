import {
  AiOutlineRobot,
  AiOutlinePushpin,
  AiOutlineSearch,
  AiOutlineHeart,
  // AiOutlineReconciliation,
  // AiOutlineRise,
  // AiOutlineMedicineBox,
  // AiOutlineFileMarkdown,
} from 'react-icons/ai';

export const navigation = [
  {
    name: 'Việc làm',
    to: '/',
    child: [
      {
        name: 'Tìm việc làm',
        to: '/job-page',
        icon: AiOutlineSearch,
      },
      {
        name: 'Việc làm đã ứng tuyển',
        to: '/apply',
        icon: AiOutlineHeart,
      },
      {
        name: 'Việc làm đã lưu',
        to: '/saved-job',
        icon: AiOutlinePushpin,
      },
      {
        name: 'Việc làm phù hợp',
        to: '/',
        icon: AiOutlineRobot,
      },
    ],
  },
  {
    name: 'Quản lý CV',
    to: '/list-cv',
  },
  {
    name: 'Danh sách công ty',
    to: '/company-page',
  },
];

export const userNavigation = [
  { name: 'Thông tin', to: '/profile' },
  { name: 'Đăng xuất', to: '/signout' },
];
