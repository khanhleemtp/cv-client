import { StyleSheet, View } from '@react-pdf/renderer';
import CvTitle from './Typography/CvTitle';
import CvSlider from './Typography/CvSlider';

const CvLanguage = ({ data }) => {
  const styles = StyleSheet.create({
    sliderContainer: {
      marginBottom: 16,
    },
  });

  return (
    <View>
      <CvTitle>{data?.name}</CvTitle>
      {data?.items?.map((item) => (
        <View style={styles.sliderContainer} key={item._id}>
          <CvSlider level={item?.level} name={item?.name} />
        </View>
      ))}
    </View>
  );
};

export default CvLanguage;
