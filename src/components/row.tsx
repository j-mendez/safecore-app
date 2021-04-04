import React from 'react';
import {View} from 'react-native';
import {styles} from '../styles/containers';

type Props = {};

export const Row: React.FC<Props> = ({children}) => {
  return <View style={styles.row}>{children}</View>;
};
