import { View } from '@react-pdf/renderer';
import CvText from './Typography/CvText';
import CvTitle from './Typography/CvTitle';

const CvSummary = () => {
  return (
    <View>
      <CvTitle>Thông tin thêm</CvTitle>
      <CvText type="h3">Hey abc</CvText>
    </View>
  );
};

export default CvSummary;
