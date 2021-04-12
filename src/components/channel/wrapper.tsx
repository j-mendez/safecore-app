import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useHeaderHeight} from '@react-navigation/stack';
import {getStatusBarHeight, getBottomSpace} from 'react-native-iphone-x-helper';

export const ChannelWrapper = ({windowHeight, children}: any) => {
  const maxSnapPoint =
    useHeaderHeight() + getStatusBarHeight() + getBottomSpace() + 17;

  return (
    <View
      style={[
        styles.sheet,
        {height: windowHeight - maxSnapPoint, top: maxSnapPoint},
      ]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  sheet: {
    backgroundColor: '#fff',
    borderTopWidth: 0.5,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: 'rgb(30,30,30)',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
  },
});
