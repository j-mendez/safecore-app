import 'react-native-gesture-handler';
import React, {Fragment, useLayoutEffect, useRef} from 'react';
import {SafeAreaView, useColorScheme, Button} from 'react-native';
import {Sheet, Feed} from '../components';
import {socketClient, useSocket, useHandle} from '../hooks';
import {backgroundColor} from '../styles/background';
import type {HomeProps} from '../types/navigation';
import {appStorage} from '../utils/storage';

type BottomSheetRef = React.ElementRef<typeof Sheet>;

const HomeScreen: React.FC<HomeProps> = ({navigation}) => {
  const sheetRef = useRef<BottomSheetRef>(null);
  const [handle, state] = useHandle();
  const backgroundStyle = {
    backgroundColor: backgroundColor(useColorScheme() === 'dark'),
    flex: 1,
  };

  useSocket(handle);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => navigation.navigate('Profile', {name: 'Me'})}
          title="Profile"
          accessibilityLabel="navigate to My profile"
        />
      ),
    });
  }, [navigation]);

  const {channels, activeChannel, channelUsers} = state;

  return (
    <Fragment>
      <SafeAreaView style={backgroundStyle}>
        <Feed
          channels={channels}
          onPress={(channel: any) => {
            const uname = appStorage.getItem('user');

            console.log(uname);
            socketClient.client.send(
              JSON.stringify({
                name: 'Connect',
                channel,
                user: {name: appStorage.memoryStorage.data.user},
              }),
            );
            sheetRef?.current?.open();
          }}
        />
        <Button
          title="Create Room"
          accessibilityLabel="Create a Room"
          onPress={() => sheetRef?.current?.open()}
        />
      </SafeAreaView>
      <Sheet
        ref={sheetRef}
        activeChannel={activeChannel}
        channelUsers={channelUsers}
      />
    </Fragment>
  );
};

export {HomeScreen};
