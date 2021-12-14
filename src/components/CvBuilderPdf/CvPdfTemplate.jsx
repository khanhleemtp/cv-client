import {
  Document,
  Page,
  View,
  Font,
  StyleSheet,
  Text,
} from '@react-pdf/renderer';

import sansNormal from '../../fonts/Sans/OpenSans-Regular.ttf';
import sansMedium from '../../fonts/Sans/OpenSans-Medium.ttf';
import sansBold from '../../fonts/Sans/OpenSans-SemiBold.ttf';
import CvProfile from './CvProfile';
import CvLanguage from './CvLanguage';
import CvSkills from './CvSkills';
import CvEducation from './CvEducation';
import CvSummary from './CvSummary';
import CvExperience from './CvExperience';
import CvText from './Typography/CvText';

const CvPdfTemplate = () => {
  return (
    <Document title="Ld Khánh">
      <Page size="A4" style={styles.main}>
        <CvProfile />
        <View style={styles.colContainer}>
          <View style={styles.colOne}>
            <CvLanguage />
            <CvSkills />
            <CvEducation />
          </View>
          <View style={styles.colTwo}>
            <CvSummary />
            <CvExperience />
          </View>
        </View>
        <View style={styles.app} fixed>
          <CvText type="h4" medium color="primary">
            @Copyright LDCV
          </CvText>
        </View>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages} `
          }
          fixed
        />
        {/* <Image src="/assets/topography.png" style={styles.pageBackground} /> */}
      </Page>
    </Document>
  );
};

Font.register(
  {
    family: 'sans',
    fonts: [
      {
        src: sansNormal,
        fontWeight: 'normal',
      },
      {
        src: sansBold,
        fontWeight: 'bold',
      },
      {
        src: sansMedium,
        fontWeight: 'medium',
      },
    ],
  },
  {}
);

const styles = StyleSheet.create({
  main: {
    fontFamily: 'sans',
    padding: 48,
    // fontWeight: 'medium',
  },
  pageBackground: {
    position: 'absolute',
    minWidth: '100%',
    minHeight: '100%',
    // display: 'block',
    height: '100%',
    width: '100%',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
  app: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  colContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  colOne: {
    display: 'flex',
    flexDirection: 'column',
    width: '55%',
    // flexFlow: 'wrap',
  },
  colTwo: {
    display: 'flex',
    flexDirection: 'column',
    width: '40%',
  },
});

export default CvPdfTemplate;
