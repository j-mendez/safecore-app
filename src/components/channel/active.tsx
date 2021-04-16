import React, {useEffect} from 'react';
import {Button, Text, View, FlatList, StyleSheet} from 'react-native';
import {Row} from '../row';
import {Profile} from '../profile';
import {userState, micState} from '../../state/user';
import {useRecoilValue, useRecoilState} from 'recoil';
import {ChannelWrapper} from './wrapper';
import LiveAudioStream from 'react-native-live-audio-stream';
import {socketClient} from '../../hooks/use-socket';
import {options} from '../../config/live-audio';
import TrackPlayer, {
  useTrackPlayerEvents,
  TrackPlayerEvents,
} from 'react-native-track-player';

const events = [
  TrackPlayerEvents.PLAYBACK_STATE,
  TrackPlayerEvents.PLAYBACK_ERROR,
];

const keyExtractor = (item: any, index: number) => item.channel_id || index;

export const ActiveChannel = ({
  activeChannel,
  channelUsers = [],
  windowHeight,
  bottomSheetModalRef,
  channelAudioUrl,
}: any) => {
  const me = useRecoilValue(userState);
  const [activeMic, setActiveMic] = useRecoilState(micState);

  useTrackPlayerEvents(events, async event => {
    if (event.type === TrackPlayerEvents.PLAYBACK_ERROR) {
      console.warn('An error occured while playing the current track.');
    }
    if (event.type === TrackPlayerEvents.PLAYBACK_STATE) {
      if (activeChannel?.name) {
        await TrackPlayer.add({
          url: `${channelAudioUrl}`.replace('.mp3', '.m3u8'),
          title: '',
          artist: '',
          id: '',
        });
        await TrackPlayer.play();
      }
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

  return (
    <ChannelWrapper windowHeight={windowHeight}>
      <View style={styles.header}>
        <Text style={styles.title}>{activeChannel?.name}</Text>
        {activeChannel?.description ? (
          <Text style={styles.description}>{activeChannel.description}</Text>
        ) : null}
      </View>
      <FlatList
        data={channelUsers}
        renderItem={props => (
          <Profile
            item={{
              ...props.item,
              speaking:
                props.item.name === me ? activeMic : props.item.speaking,
            }}
          />
        )}
        keyExtractor={keyExtractor}
        numColumns={3}
      />
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
  header: {
    marginBottom: 10,
  },
});
