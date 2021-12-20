import { View } from '@react-pdf/renderer';
import CvText from './Typography/CvText';
import CvTitle from './Typography/CvTitle';

const CvSummary = ({ data }) => {
  return (
    <View>
      <CvTitle>{data?.name}</CvTitle>
      {data?.items?.map((item, index) => (
        <CvText type="h4" medium key={index}>
          {item?.text}
        </CvText>
      ))}
    </View>
  );
};

export default CvSummary;
