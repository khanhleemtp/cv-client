import { StyleSheet, View } from '@react-pdf/renderer';
import CvText from './CvText';

const CvSilder = () => {
  const styles = StyleSheet.create({
    silderContainer: {
      backgroundColor: '#E7E5E4',
      width: '100%',
      height: 8,
      borderRadius: 4,
      lineHeight: 1.5,
    },
    silderValue: {
      position: 'relative',
      backgroundColor: '#3B82F6',
      width: `${100 / 2}%`,
      height: 8,
      borderRadius: 4,
    },
    bounce: {
      position: 'absolute',
      borderRadius: 6,
      width: 12,
      height: 12,
      backgroundColor: 'black',
      right: 0,
      top: -2,
    },
    sliderText: {
      marginVertical: 3,
    },
  });

  return (
    <View>
      <View style={styles.sliderText}>
        <CvText type="h3" bold>
          PACK OFFICE: Word, Excel, PowerPoint
        </CvText>
      </View>
      <View style={styles.silderContainer}>
        <View style={styles.silderValue}>
          <View style={styles.bounce}></View>
        </View>
      </View>
    </View>
  );
};

export default CvSilder;
