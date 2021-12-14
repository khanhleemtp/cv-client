import { StyleSheet, View } from '@react-pdf/renderer';
import CvTitle from './Typography/CvTitle';
import CvSlider from './Typography/CvSlider';

const CvLanguage = () => {
  const styles = StyleSheet.create({
    sliderContainer: {
      marginBottom: 16,
    },
  });

  return (
    <View>
      <CvTitle>Kỹ năng khác</CvTitle>
      <View style={styles.sliderContainer}>
        <CvSlider />
      </View>
      <View style={styles.sliderContainer}>
        <CvSlider />
      </View>
      <View style={styles.sliderContainer}>
        <CvSlider />
      </View>
    </View>
  );
};

export default CvLanguage;
