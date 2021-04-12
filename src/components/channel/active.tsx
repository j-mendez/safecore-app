import React, {useEffect} from 'react';
import {Button, Text, StyleSheet} from 'react-native';
import {Row} from '../row';
import {userState, micState} from '../../state/user';
import {useRecoilValue, useRecoilState} from 'recoil';
import {ChannelWrapper} from './wrapper';
import LiveAudioStream from 'react-native-live-audio-stream';
// import {socketClient} from '../../hooks/use-socket';
import {options} from '../../config/live-audio';
import TrackPlayer from 'react-native-track-player';

export const ActiveChannel = ({
  activeChannel,
  channelUsers,
  windowHeight,
  bottomSheetModalRef,
}: any) => {
  const me = useRecoilValue(userState);
  const [activeMic, setActiveMic] = useRecoilState(micState);

  useEffect(() => {
    LiveAudioStream.init(options);

    LiveAudioStream.on('data', (data: any) => {
      console.log(data);
      // base64-encoded audio data chunks
    });

    const start = async () => {
      await TrackPlayer.setupPlayer();

      // Add a track to the queue
      await TrackPlayer.add({
        id: 'trackId',
        url:
          'https://ia802508.us.archive.org/5/items/testmp3testfile/mpthreetest.mp3',
        title: 'Track Title',
        artist: 'Track Artist',
        artwork: null,
      });

      // Start playing it
      await TrackPlayer.play();
    };

    start();
  }, []);

  const toggleMic = () => {
    setActiveMic(active => {
      LiveAudioStream[!active ? 'start' : 'stop']();
      return !active;
    });
  };

  const leaveChannel = () => {
    bottomSheetModalRef.current.snapTo(0);
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
