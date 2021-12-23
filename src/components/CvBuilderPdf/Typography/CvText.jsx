import { useMemo } from 'react';
import { Text, StyleSheet, View, Image } from '@react-pdf/renderer';

const CvText = ({
  icon,
  type,
  color,
  children,
  uppercase,
  bold,
  medium,
  isEnabled = true,
}) => {
  const styles = StyleSheet.create({
    uppercase: {
      textTransform: 'uppercase',
    },
    text: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      lineHeight: 1.6,
    },
    h1: {
      fontSize: 12 * 1.5,
    },
    h2: {
      fontSize: 12 * 1.25,
    },
    h3: {
      fontSize: 12 * 1.125,
    },
    h4: {
      fontSize: 12 * 0.875,
    },
    h5: {
      fontSize: 12 * 0.75,
    },
    p: {
      fontSize: 12,
    },
    primary: {
      color: '#3B82F6',
    },
    secondary: {
      color: '#71717A',
    },
    iconWrapper: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      fontSize: 12 * 0.875,
    },
    icon: {
      width: 12,
      height: 12,
      marginRight: 2,
      paddingBottom: 1,
    },
    bold: {
      fontWeight: 'bold',
    },
    medium: {
      fontWeight: 'medium',
    },
    tag: {
      border: 2,
      borderColor: '#71717A',
      borderRadius: 6,
      fontSize: 12 * 0.875,
      color: '#71717A',
      padding: 4,
      maxWidth: 120,
      textOverflow: 'ellipsis',
      textAlign: 'center',
    },
  });

  const iconSrc = useMemo(() => {
    switch (icon) {
      case 'phone':
        return '/assets/icons/phone-blue.png';
      case 'mail':
        return '/assets/icons/mail-blue.png';
      case 'location':
        return '/assets/icons/location-blue.png';
      case 'link':
        return '/assets/icons/link-blue.png';
      case 'calendar':
        return '/assets/icons/calendar-blue.png';
      default:
        return null;
    }
  }, [icon]);

  const colorStyles = useMemo(() => {
    switch (color) {
      case 'primary':
        return styles?.primary;
      case 'secondaty':
        return styles?.secondary;
      default:
        return styles?.secondary;
    }
  }, [color, styles]);

  const typeStyles = useMemo(() => {
    switch (type) {
      case 'h1':
        return styles?.h1;
      case 'h2':
        return styles?.h2;
      case 'h3':
        return styles?.h3;
      case 'h4':
        return styles?.h4;
      case 'h5':
        return styles?.h5;
      default:
        return styles?.p;
    }
  }, [styles, type]);

  return (
    isEnabled && (
      <View>
        <View
          style={[
            styles.text,
            colorStyles,
            typeStyles,
            uppercase && styles.uppercase,
            bold && styles.bold,
            medium && medium,
          ]}
        >
          {icon && <Image src={iconSrc} style={styles.icon} />}
          <Text>{children}</Text>
        </View>
      </View>
    )
  );
};

export default CvText;
