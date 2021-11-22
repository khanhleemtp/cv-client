import {
  AiOutlineRobot,
  AiOutlinePushpin,
  AiOutlineSearch,
  AiOutlineFileMarkdown,
  AiOutlineHeart,
  AiOutlineMedicineBox,
  AiOutlineReconciliation,
  AiOutlineRise,
} from 'react-icons/ai';

export const navigation = [
  {
    name: 'Việc làm',
    to: '/',
    child: [
      {
        name: 'Tìm việc làm',
        to: '/job',
        icon: AiOutlineSearch,
      },
      {
        name: 'Việc làm đã ứng tuyển',
        to: '/',
        icon: AiOutlineHeart,
      },
      {
        name: 'Việc làm đã lưu',
        to: '/',
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
    to: '/builder',
    child: [
      {
        name: 'Builder',
        to: '/builder',
        icon: AiOutlineMedicineBox,
      },
      {
        name: 'Mẫu CV',
        to: '/preview',
        icon: AiOutlineFileMarkdown,
      },
    ],
  },
  {
    name: 'Công ty',
    to: 'company',
    child: [
      {
        name: 'Danh sách công ty',
        to: '/builder',
        icon: AiOutlineReconciliation,
      },
      {
        name: 'Top công ty',
        to: '/',
        icon: AiOutlineRise,
      },
    ],
  },
];

export const userNavigation = [
  { name: 'Thông tin', to: '/profile' },
  { name: 'Cài đặt', to: '/' },
  { name: 'Đăng xuất', to: '/signout' },
];