import { StyleSheet, View } from '@react-pdf/renderer';
import CvText from './CvText';

const CvTitle = ({ children }) => {
  const styles = StyleSheet.create({
    title: {
      display: 'flex',
      width: '100%',
      borderBottom: 2,
      borderColor: '#E5E7EB',
      marginBottom: 8,
    },
  });

  return (
    <View>
      <View style={[styles.title]}>
        <CvText type="h1" color="primary" uppercase bold>
          {children}
        </CvText>
      </View>
    </View>
  );
};

export default CvTitle;
