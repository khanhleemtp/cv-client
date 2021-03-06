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
        {data?.items?.map((item, index) => (
          <View key={index}>
            <CvText type="h3" bold>
              {item?.degree}
            </CvText>
            <CvText type="h3" bold color="primary">
              {item?.institution}
            </CvText>
            <View style={styles.locationCpa}>
              <View style={styles.calendarContainer}>
                <CvText
                  type="h4"
                  icon="calendar"
                  isEnabled={item?.showDateRange}
                >
                  {item?.dateRange?.from &&
                    moment(item?.dateRange?.from).format('DD/MM/YYYY')}
                  {' - '}
                  {item?.dateRange?.to &&
                    moment(item?.dateRange?.to).format('DD/MM/YYYY')}
                  {item?.dateRange?.isOngoing && 'Hiện tại'}
                </CvText>

                <CvText
                  type="h4"
                  icon="location"
                  isEnabled={item?.showLocation}
                >
                  {item?.location}
                </CvText>
              </View>
              {item?.showGpa && (
                <View style={styles.cpaContainer}>
                  <CvText type="h4">{item?.gpaText}</CvText>
                  <CvText type="h4">
                    {item?.gpa} / {item?.maxGpa}
                  </CvText>
                </View>
              )}
            </View>
            {item.showBullets
              ? item?.bullets?.map((bullet, index) => (
                  <View style={styles.bulletContainer} key={index}>
                    <View style={styles.bullet}></View>
                    <CvText type="h4">{bullet?.text}</CvText>
                  </View>
                ))
              : null}
          </View>
        ))}
      </View>
    </View>
  );
};

export default CvEducation;
