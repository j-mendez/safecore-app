import React from 'react';
import {Alert, Button, Text, StyleSheet} from 'react-native';
import {Row} from '../row';
import {userState, micState} from '../../state/user';
import {useRecoilValue, useRecoilState} from 'recoil';
import {ChannelWrapper} from './wrapper';

export const ActiveChannel = ({
  activeChannel,
  channelUsers,
  windowHeight,
}: any) => {
  const me = useRecoilValue(userState);
  const [activeMic, setActiveMic] = useRecoilState(micState);

  const toggleMic = () => {
    setActiveMic(active => !active);
  };

  const leaveChannel = () => {
    Alert.alert('leave channel');
  };

  return (
    <ChannelWrapper windowHeight={windowHeight}>
      <Text style={styles.title}>{activeChannel?.name}</Text>
      <Text>Me: {me}</Text>
      {channelUsers
        .filter((user: any) => user.name !== me)
        .map((user: any, i: number) => {
          return <Text key={i}>User: {user.name}</Text>;
        })}
      <Row>
        <Button title={'Leave Channel'} onPress={leaveChannel} />
        <Button title={!activeMic ? 'Speak' : 'Mute'} onPress={toggleMic} />
      </Row>
    </ChannelWrapper>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: '500',
  },
  description: {},
  inner: {
    padding: 12,
  },
});
