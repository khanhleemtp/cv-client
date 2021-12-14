import { StyleSheet, View } from '@react-pdf/renderer';
import CvTag from './Typography/CvTag';
import CvText from './Typography/CvText';
import CvTitle from './Typography/CvTitle';

const CvSkills = () => {
  const styles = StyleSheet.create({
    tagContainer: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
  });

  return (
    <View>
      <CvTitle>Kỹ năng chính</CvTitle>
      <View>
        <CvText type="h3" bold color="primary">
          Front-end
        </CvText>
        <View style={styles.tagContainer}>
          <CvTag>Javascript</CvTag>
          <CvTag>ReactJs</CvTag>
          <CvTag>NodeJs</CvTag>
          <CvTag>MongoDB</CvTag>
        </View>
      </View>
      <View></View>
    </View>
  );
};

export default CvSkills;
