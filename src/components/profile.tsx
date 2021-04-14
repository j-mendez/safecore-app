import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

type Props = {
  name: string;
  speaking?: boolean;
};

export const Profile: React.FC<Props> = ({item}) => {
  const {name, speaking} = item;

  return (
    <View style={styles.container}>
      <View style={[styles.avatar, speaking && styles.speaking]}>
        <Text style={styles.avatarText}>{name[0]}</Text>
      </View>
      <Text style={styles.name}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgb(222,222,222)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  speaking: {
    borderWidth: 6,
    borderColor: 'rgb(55,55,55)',
  },
  avatarText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 25,
  },
  name: {
    marginTop: 10,
    fontWeight: '500',
    fontSize: 17,
  },
});
