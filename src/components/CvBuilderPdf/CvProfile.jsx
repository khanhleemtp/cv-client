import { StyleSheet, View, Image } from '@react-pdf/renderer';
import CvText from './Typography/CvText';

const CvProfile = ({ header }) => {
  const styles = StyleSheet.create({
    profileContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    textContainer: {
      flexGrow: 1,
    },
    imageContainer: {
      width: 90,
      height: 90,
      borderRadius: 45,
    },
  });

  return (
    <View style={styles.profileContainer}>
      <View style={[styles.textContainer]}>
        <CvText type="h1" bold>
          {header?.name}
        </CvText>
        <CvText type="h2" bold color="primary">
          {header?.title}
        </CvText>
        <CvText type="h4" color="secondary" icon="phone">
          {header?.phone}
        </CvText>
        <CvText type="h4" color="secondary" icon="mail">
          {header?.email}
        </CvText>
        <CvText type="h4" color="secondary" icon="link">
          {header?.link}
        </CvText>
        <CvText type="h4" color="secondary" icon="location">
          {header?.address}
        </CvText>
      </View>
      <View>
        {header?.photo && (
          <Image
            style={styles.imageContainer}
            src={{
              uri: `${header?.photo}`,
              method: 'GET',
              headers: { 'Cache-Control': 'no-cache' },
              body: '',
            }}
          />
        )}
      </View>
    </View>
  );
};

export default CvProfile;
