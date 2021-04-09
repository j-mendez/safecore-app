import React, {useState} from 'react';
import {Button, View, Text, TextInput, StyleSheet} from 'react-native';
import {socketClient} from '../../hooks';
import {userState} from '../../state/user';
import {useRecoilValue} from 'recoil';

export const CreateChannel = ({windowHeight}: any) => {
  const [inputValue, setInputValue] = useState<string>('');
  const me = useRecoilValue(userState);

  const createChannel = () => {
    socketClient.client.send(
      JSON.stringify({
        name: 'CreateChannel',
        channel: inputValue,
        user: {name: me},
      }),
    );
  };
  return (
    <View style={[styles.sheet, {height: windowHeight}]}>
      <Text>Creat Channel</Text>
      <TextInput
        style={styles.input}
        onChangeText={setInputValue}
        value={inputValue}
        placeholder={'Channel Name'}
      />
      <Button
        title="Create Channel"
        accessibilityLabel="create a new channel"
        onPress={createChannel}
        disabled={!inputValue}
        color="#000"
      />
    </View>
  );
};

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
  input: {
    borderWidth: 1,
    borderColor: 'rgb(30,30,30)',
  },
});
