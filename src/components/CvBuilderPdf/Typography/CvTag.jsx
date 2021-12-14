import { StyleSheet, View } from '@react-pdf/renderer';
import CvText from './CvText';

const CvTag = ({ children }) => {
  const styles = StyleSheet.create({
    tag: {
      display: 'flex',
      border: 2,
      borderRadius: 6,
      maxWidth: 100,
      width: '100%',
      margin: 2,
      height: 24,
      textAlign: 'center',
      borderColor: '#E5E7EB',
      textOverflow: 'ellipsis',
    },
  });

  return (
    <View style={[styles.tag]}>
      <CvText type="h4">{children}</CvText>
    </View>
  );
};

export default CvTag;
