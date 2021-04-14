import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

type Props = {};

export const Profile: React.FC<Props> = ({item}) => {
  const {name} = item;

  return (
    <View style={styles.container}>
      <Text>User: {name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
});
