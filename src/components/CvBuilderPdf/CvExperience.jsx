import { StyleSheet, View } from '@react-pdf/renderer';
import CvText from './Typography/CvText';
import CvTitle from './Typography/CvTitle';
import moment from 'moment';

const CvExperience = ({ data }) => {
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
      <CvTitle>{data?.name}</CvTitle>
      {data?.items?.map((item, index) => (
        <View key={index}>
          <CvText type="h3" bold>
            {item?.position}
          </CvText>
          <CvText type="h3" bold color="primary">
            {item?.workplace}
          </CvText>
          <View style={styles.calendarContainer}>
            <CvText type="h4" icon="calendar" isEnabled={item.showDateRange}>
              {item?.dateRange?.from &&
                moment(item?.dateRange?.from).format('MM/YYYY')}
              {' - '}
              {item?.dateRange?.to &&
                moment(item?.dateRange?.to).format('MM/YYYY')}
              {item?.dateRange?.isOngoing && 'Hiện tại'}
            </CvText>
            <CvText type="h4" icon="location" isEnabled={item.showLocation}>
              {item?.location}
            </CvText>
          </View>
          <CvText type="h4" medium icon={item.showDescription}>
            {item?.description}
          </CvText>

          {item?.showBullets
            ? item?.bullets?.map((bullet, index) => (
                <View key={index}>
                  <View style={styles.bulletContainer}>
                    <View style={styles.bullet}></View>
                    <CvText type="h4">{bullet?.text}</CvText>
                  </View>
                </View>
              ))
            : null}
        </View>
      ))}
    </View>
  );
};

export default CvExperience;
