import { StyleSheet, View } from '@react-pdf/renderer';
import moment from 'moment';
import CvText from './Typography/CvText';
import CvTitle from './Typography/CvTitle';

const CvEducation = ({ data }) => {
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
      <CvTitle>{data?.name}</CvTitle>
      <View>
        {data?.items?.map((item) => (
          <View key={item._id}>
            <CvText type="h3" bold>
              {item?.degree}
            </CvText>
            <CvText type="h3" bold color="primary">
              {item?.institution}
            </CvText>
            <View style={styles.locationCpa}>
              <View style={styles.calendarContainer}>
                <CvText type="h4" icon="calendar">
                  {item?.dateRange?.from &&
                    moment(item?.dateRange?.from).format('MM/YYYY')}
                  {' - '}
                  {item?.dateRange?.to &&
                    moment(item?.dateRange?.to).format('MM/YYYY')}
                  {item?.dateRange?.isOngoing && 'Hiện tại'}
                </CvText>

                <CvText type="h4" icon="location">
                  {item?.location}
                </CvText>
              </View>
              <View style={styles.cpaContainer}>
                <CvText type="h4">{item?.gpaText}</CvText>
                <CvText type="h4">
                  {item?.gpa} / {item?.maxGpa}
                </CvText>
              </View>
            </View>
            {item?.bullets?.map((bullet) => (
              <View style={styles.bulletContainer} key={bullet?._id}>
                <View style={styles.bullet}></View>
                <CvText type="h4">{bullet?.text}</CvText>
              </View>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

export default CvEducation;
