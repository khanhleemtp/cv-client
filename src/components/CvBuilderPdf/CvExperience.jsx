import { StyleSheet, View } from '@react-pdf/renderer';
import CvText from './Typography/CvText';
import CvTitle from './Typography/CvTitle';

const CvExperience = () => {
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
      flexWrap: 'wrap',
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
      <CvTitle>Kinh nghiệm</CvTitle>
      <View>
        <CvText type="h3" bold>
          Front-end Developer
        </CvText>
        <CvText type="h3" bold color="primary">
          MDC
        </CvText>
        <View style={styles.calendarContainer}>
          <CvText type="h4" icon="calendar">
            3/5/2021 - Hiện tại
          </CvText>
          <CvText type="h4" icon="location">
            Hà Nội Thứ 7 Phải lên đồ
          </CvText>
        </View>
        <CvText type="h4" medium>
          Xây dựng bảng quản lý phiên
        </CvText>
        <View>
          <View style={styles.bulletContainer}>
            <View style={styles.bullet}></View>
            <CvText type="h4">Hey abcccccccccc</CvText>
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
    </View>
  );
};

export default CvExperience;
