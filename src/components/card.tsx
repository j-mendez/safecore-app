import React from 'react';
import {Text, useColorScheme, StyleSheet, View} from 'react-native';
import {backgroundColor} from '../styles/background';

type Props = {
  title: string;
};

export const Card: React.FC<Props> = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
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
