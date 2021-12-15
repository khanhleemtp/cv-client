import { StyleSheet, View } from '@react-pdf/renderer';
import CvTag from './Typography/CvTag';
import CvText from './Typography/CvText';
import CvTitle from './Typography/CvTitle';

const CvSkills = ({ data }) => {
  const styles = StyleSheet.create({
    tagContainer: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
  });

  return (
    <View>
      <CvTitle>{data?.name}</CvTitle>
      {data?.items?.map((item) => (
        <View key={item._id}>
          <CvText type="h3" bold color="primary">
            {item?.title}
          </CvText>
          <View style={styles.tagContainer}>
            {item?.tags?.map((tag) => (
              <CvTag key={item?._id}>{tag?.text}</CvTag>
            ))}
          </View>
        </View>
      ))}
      <View></View>
    </View>
  );
};

export default CvSkills;
