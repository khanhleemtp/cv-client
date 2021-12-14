import { StyleSheet, View } from '@react-pdf/renderer';
import CvText from './Typography/CvText';
import CvTitle from './Typography/CvTitle';

const CvEducation = () => {
  const styles = StyleSheet.create({
    locationCpa: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      // width: '100%',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
    },
    cpaContainer: {
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      width: '20%',
      borderLeft: 1,
      borderColor: '#71717A',
    },
    calendarContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      flexWrap: 'wrap',
      flexShrink: 1,
      width: '60%',
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
    <View
      style={{
        width: '100%',
      }}
    >
      <CvTitle>Học Vấn</CvTitle>
      <View>
        <CvText type="h3" bold>
          IT-3
        </CvText>
        <CvText type="h3" bold color="primary">
          Đại học Bách Khoa Hà Nội
        </CvText>
        <View style={styles.locationCpa}>
          <View style={styles.calendarContainer}>
            <CvText type="h4" icon="calendar">
              3/5/2021 - Hiện tại
            </CvText>

            <CvText type="h4" icon="location">
              Hà Nội thứ 7 phải lên đồ
            </CvText>
          </View>
          <View style={styles.cpaContainer}>
            <CvText type="h4">CPA</CvText>
            <CvText type="h4">3 / 5</CvText>
          </View>
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
