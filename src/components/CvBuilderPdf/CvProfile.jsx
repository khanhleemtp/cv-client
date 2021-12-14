import { StyleSheet, View, Image } from '@react-pdf/renderer';
import CvText from './Typography/CvText';

const CvProfile = ({ children }) => {
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
          Lê Đình Khánh
        </CvText>
        <CvText type="h2" bold color="primary">
          Fullstack Developer
        </CvText>
        <CvText type="h4" color="secondary" icon="phone">
          0914078960
        </CvText>
        <CvText type="h4" color="secondary" icon="mail">
          khanhleemtp@gmail.com
        </CvText>
        <CvText type="h4" color="secondary" icon="link">
          https://www.facebook.com/khanh.lee.3958/
        </CvText>
        <CvText type="h4" color="secondary" icon="location">
          Ngõ 402, Ngách 7, Số nhà 26, Mỹ Đình 2, Hà Nội
        </CvText>
      </View>
      <View>
        <Image
          style={styles.imageContainer}
          src={{
            uri: 'https://ld-cv-file.s3.ap-southeast-1.amazonaws.com/2021-12-13T07%3A41%3A36.953Z-profile-image',
            method: 'GET',
            headers: { 'Cache-Control': 'no-cache' },
            body: '',
          }}
        />
      </View>
    </View>
  );
};

export default CvProfile;
