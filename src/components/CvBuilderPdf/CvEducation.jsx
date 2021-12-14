import { StyleSheet, View } from '@react-pdf/renderer';
import CvText from './Typography/CvText';
import CvTitle from './Typography/CvTitle';

const CvEducation = () => {
  const styles = StyleSheet.create({
    cpaConatainer: {
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      width: 80,
    },
    calendarContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    bulletContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    bullet: {
      //   alignSelf: 'flex-start',
      width: 4,
      height: 4,
      borderRadius: 2,
      backgroundColor: 'black',
      marginHorizontal: 4,
    },
  });

  return (
    <View>
      <CvTitle>Học Vấn</CvTitle>
      <View>
        <CvText type="h3" bold>
          IT-3
        </CvText>
        <CvText type="h3" bold>
          Đại học Bách Khoa Hà Nội
        </CvText>
        <View style={styles.cpaConatainer}>
          <CvText type="h4">CPA</CvText>
          <View>
            <CvText type="h4">3 / 5</CvText>
          </View>
        </View>
        <View style={styles.calendarContainer}>
          <CvText type="h4" icon="calendar">
            3/5/2021 - Hiện tại
          </CvText>
          <CvText type="h4" icon="location">
            Hà Nội
          </CvText>
        </View>
        <View style={styles.bulletContainer}>
          <View style={styles.bullet}></View>
          <CvText type="h4">Hey abcccccccccc</CvText>
        </View>
        <View style={styles.bulletContainer}>
          <View style={styles.bullet}></View>
          <CvText type="h4">Hey abcccccccccc</CvText>
        </View>
      </View>
    </View>
  );
};

export default CvEducation;
