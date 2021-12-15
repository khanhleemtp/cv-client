import { View } from '@react-pdf/renderer';
import CvText from './Typography/CvText';
import CvTitle from './Typography/CvTitle';

const CvSummary = ({ data }) => {
  return (
    <View>
      <CvTitle>{data?.name}</CvTitle>
      {data?.items?.map((item) => (
        <CvText type="h4" medium key={item._id}>
          {item?.text}
        </CvText>
      ))}
    </View>
  );
};

export default CvSummary;
