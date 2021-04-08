import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export const CreateChannel = ({me, windowHeight}: any) => (
  <View style={[styles.sheet, {height: windowHeight}]}>
    <Text>Me: {me}</Text>
    <Text>Creat Channel</Text>
  </View>
);

const styles = StyleSheet.create({
  sheet: {
    backgroundColor: '#fff',
    minHeight: 450,
    borderTopWidth: 0.5,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: 'rgb(30,30,30)',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 12,
  },
});
