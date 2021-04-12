import React, {useState} from 'react';
import {Button, Text, TextInput, StyleSheet} from 'react-native';
import {socketClient} from '../../hooks';
import {userState} from '../../state/user';
import {useRecoilValue} from 'recoil';
import {ChannelWrapper} from './wrapper';

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
    <ChannelWrapper windowHeight={windowHeight}>
      <Text>Create Channel</Text>
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
    </ChannelWrapper>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: 'rgb(30,30,30)',
  },
});
