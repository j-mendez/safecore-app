import 'react-native-gesture-handler';
import React, {Fragment, useState, useRef} from 'react';
import {SafeAreaView, useColorScheme, Button} from 'react-native';
import {Card, Sheet, Feed} from '../components';
import {useSocket} from '../hooks';
import {backgroundColor} from '../styles/background';
import type {HomeProps} from '../types/navigation';
import type {User} from '@app/types';

type BottomSheetRef = React.ElementRef<typeof Sheet>;

const HomeScreen: React.FC<HomeProps> = ({navigation}) => {
  const sheetRef = useRef<BottomSheetRef>(null);
  const [currentMessage, setCurrent] = useState<User>();
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: backgroundColor(isDarkMode),
    flex: 1,
  };

  useSocket(setCurrent);

  React.useLayoutEffect(() => {
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

  console.info(currentMessage);

  return (
    <Fragment>
      <SafeAreaView style={backgroundStyle}>
        <Feed
          renderItem={({item}: any): any => (
            <Card title={item.title} onPress={() => sheetRef?.current?.open()}>
              {item.description}
            </Card>
          )}
        />
        <Button
          title="Create Room"
          accessibilityLabel="Create a Room"
          onPress={() => navigation.navigate('Room', {name: 'Me'})}
        />
      </SafeAreaView>
      <Sheet ref={sheetRef} />
    </Fragment>
  );
};

export {HomeScreen};
