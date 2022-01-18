import moment from 'moment';
import { SKILL } from './skill.data';
import { CATEGORIES } from './categories.data';

export const SIZE_COMPANY = [
  { label: '1-9 nhân viên', value: '1-9' },
  {
    label: '25-99 nhân viên',
    value: '25-99',
  },
  {
    label: '100-500 nhân viên',
    value: '100-500',
  },
  {
    label: '500+ nhân viên',
    value: '500+',
  },
];

export const FIELDS_COMPANY = CATEGORIES.map((cate) => ({
  value: cate.alias,
  label: cate.name,
}));

export const STATUS_COMPANY = [
  { value: 'pending', label: 'Đang chờ' },
  { value: 'reject', label: 'Từ chối' },
  { value: 'accept', label: 'Đã chấp nhận' },
];

export const STATUS_COMPANY_SEARCH = [
  { label: 'Tất cả', value: '' },
  { label: 'Chấp nhận', value: 'accept' },
  {
    label: 'Chờ phê duyệt',
    value: 'pending',
  },
  {
    label: 'Từ chối',
    value: 'reject',
  },
];

export const STATUS_JOB_SEARCH = [
  { label: 'Tất cả', value: '' },
  {
    label: 'Đang chạy',
    value: `isPublic=${true}`,
  },
  {
    value: `to[lte]=${moment().toISOString()}`,
    label: 'Hết hạn',
  },
];

export const AREA = [
  {
    value: 'Hà Nội',
    label: 'Hà Nội',
  },
  {
    value: 'Đà Nẵng',
    label: 'Đà Nẵng',
  },
  {
    value: 'Hồ Chí Minh',
    label: 'Hồ Chí Minh',
  },
  {
    value: 'other',
    label: 'Tỉnh thành khác',
  },
];

export const TYPE_COMPANY = [
  { label: 'Product', value: 'product' },
  {
    label: 'Outsource',
    value: 'out-source',
  },
  {
    label: 'Khác',
    value: 'other',
  },
];

export const POSITION_EMPLOYER = [
  { label: 'Trưởng phòng', value: 'Trưởng phòng' },
  {
    label: 'Nhân viên',
    value: 'Nhân viên',
  },
  { label: 'Giám đốc', value: 'Giám đốc' },
  {
    label: 'Vị trí khác',
    value: 'Vị trí khác',
  },
];

export const POSITION_JOB = [
  { label: 'Trưởng phòng', value: 'trưởng phòng' },
  {
    label: 'Nhân viên',
    value: 'nhân viên',
  },
  { label: 'Giám đốc', value: 'giám đốc' },
  {
    label: 'Vị trí khác',
    value: 'vị trí khác',
  },
];

export const TYPE_JOB = [
  { label: 'Full-time', value: 'full-time' },
  {
    label: 'Part-time',
    value: 'part-time',
  },
  { label: 'Remote', value: 'remote' },
  {
    label: 'Thực tập sinh',
    value: 'inter',
  },
];

export const EXPERIENCE_JOB = [
  { label: '1 năm', value: '1' },
  {
    label: '2 năm',
    value: '2',
  },
  { label: '3 năm', value: '3' },
  { label: '4 năm', value: '4' },
  { label: 'Hơn 4 năm', value: '>4' },
];

export const SALARY_JOB = [
  { label: '1-5 triệu', value: '1-5' },
  {
    label: '5-7 triệu',
    value: '5-7',
  },
  {
    label: '7-10 triệu',
    value: '7-10',
  },
  {
    label: '10-13 triệu',
    value: '10-13',
  },
  { label: '13-20 triệu', value: '13-20' },
  { label: '20-40 triệu', value: '20-40' },
  { label: 'Trên 40 triệu', value: '>40' },
];

export const TECHNOLOGY_SKILL = SKILL.map((sk) => ({
  value: sk.name,
  label: sk.name,
}));

export const RESUME_JOB_RECEIVED = [
  { label: 'Đề nghị', value: 'de-nghi' },
  { label: 'Theo dõi', value: 'theo-doi' },
  {
    label: 'Ứng tuyển',
    value: 'tiep-nhan',
  },
];

export const RESUME_JOB_RESPONSE = [
  { label: 'Phù hợp', value: 'phu-hop' },
  {
    label: 'Hẹn phỏng vấn',
    value: 'hen-phong-van',
  },
  {
    label: 'Từ chối',
    value: 'tu-choi',
  },
];
