import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export const ActiveChannel = ({
  activeChannel,
  me,
  channelUsers,
  windowHeight,
}: any) => (
  <View style={[styles.sheet, {height: windowHeight}]}>
    <Text>{activeChannel?.name}</Text>
    <Text>Me: {me}</Text>
    {channelUsers
      .filter((user: any) => user.name !== me)
      .map((user: any, i: number) => {
        return <Text key={i}>User: {user.name}</Text>;
      })}
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
