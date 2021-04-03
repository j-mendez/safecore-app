import 'react-native-gesture-handler';
import React, {Fragment, useRef} from 'react';
import {SafeAreaView, useColorScheme, Button} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Card, Sheet, Feed} from '../components';
import {backgroundColor} from '../styles/background';
import type {RootStackParamList} from '../types/navigation';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export type Props = {
  navigation: HomeScreenNavigationProp;
};

type BottomSheetRef = React.ElementRef<typeof Sheet>;

const HomeScreen: React.FC<Props> = ({navigation}) => {
  const sheetRef = useRef<BottomSheetRef>(null);
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: backgroundColor(isDarkMode),
    flex: 1,
  };

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
