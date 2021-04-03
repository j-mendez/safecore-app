import React, {Fragment} from 'react';
import {
  Text,
  TouchableOpacity,
  useColorScheme,
  StyleSheet,
  View,
} from 'react-native';
import {backgroundColor} from '../styles/background';

type Props = {
  title: string;
  onPress?: () => void;
};

export const Card: React.FC<Props> = ({children, title, onPress}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const Cell: React.FC = () => {
    return (
      <Fragment>
        <Text
          style={[
            styles.sectionTitle,
            {
              color: backgroundColor(isDarkMode, true),
            },
          ]}>
          {title}
        </Text>
        <Text
          style={[
            styles.innerContainer,
            {
              color: backgroundColor(isDarkMode, true),
            },
          ]}>
          {children}
        </Text>
      </Fragment>
    );
  };

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} style={styles.sectionContainer}>
        <Cell />
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.sectionContainer}>
      <Cell />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    padding: 12,
    backgroundColor: '#ccc',
    borderRadius: 3,
  },
  innerContainer: {},
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  highlight: {
    fontWeight: '700',
  },
});
