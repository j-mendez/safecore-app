import React, {useState, useEffect} from 'react';
import {Button, Text, StyleSheet} from 'react-native';
import {Row} from '../row';
import {userState, micState} from '../../state/user';
import {useRecoilValue, useRecoilState} from 'recoil';
import {ChannelWrapper} from './wrapper';
import LiveAudioStream from 'react-native-live-audio-stream';
import {socketClient} from '../../hooks/use-socket';
import {options} from '../../config/live-audio';
import TrackPlayer, {
  useTrackPlayerEvents,
  TrackPlayerEvents,
  STATE_PLAYING,
  STATE_PAUSED,
  STATE_BUFFERING,
} from 'react-native-track-player';

// Subscribing to the following events inside MyComponent
const events = [
  TrackPlayerEvents.PLAYBACK_STATE,
  TrackPlayerEvents.PLAYBACK_ERROR,
];

export const ActiveChannel = ({
  activeChannel,
  channelUsers,
  windowHeight,
  bottomSheetModalRef,
  channelAudioUrl,
}: any) => {
  const me = useRecoilValue(userState);
  const [activeMic, setActiveMic] = useRecoilState(micState);
  const [playerState, setPlayerState] = useState(null);

  useTrackPlayerEvents(events, async event => {
    if (event.type === TrackPlayerEvents.PLAYBACK_ERROR) {
      console.warn('An error occured while playing the current track.');
    }
    if (event.type === TrackPlayerEvents.PLAYBACK_STATE) {
      setPlayerState(event.state);
    }
  });

  useEffect(() => {
    LiveAudioStream.init(options);
    LiveAudioStream.on('data', (data: any) => {
      socketClient.client.send(
        JSON.stringify({
          name: 'Speak',
          data: data.toString(),
        }),
      );
    });
  }, []);

  const toggleMic = () => {
    setActiveMic(active => {
      LiveAudioStream[!active ? 'start' : 'stop']();
      return !active;
    });
  };

  const leaveChannel = () => {
    bottomSheetModalRef.current.snapTo(0);
    TrackPlayer.pause();
  };

  const isPlaying = playerState === STATE_PLAYING;

  return (
    <ChannelWrapper windowHeight={windowHeight}>
      <Text style={styles.title}>{activeChannel?.name}</Text>
      {activeChannel?.description ? (
        <Text style={styles.description}>{activeChannel.description}</Text>
      ) : null}

      <Text>Me: {me}</Text>
      <Text selectable>Audio Channel: {channelAudioUrl}</Text>
      <Text>The TrackPlayer is {isPlaying ? 'playing' : 'not playing'}</Text>
      {channelUsers &&
        channelUsers
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
  description: {
    fontSize: 14,
    fontWeight: '200',
    fontStyle: 'italic',
  },
  inner: {
    padding: 12,
  },
});
