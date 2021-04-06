import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  View,
  Text,
} from 'react-native';

import {Header} from 'react-native/Libraries/NewAppScreen';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import type {RootStackParamList} from '../types/navigation';
import {backgroundColor} from '../styles/background';

type RoomScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Profile'
>;

type RoomScreenRouteProp = RouteProp<RootStackParamList, 'Profile'>;

type Props = {
  navigation: RoomScreenNavigationProp;
  route: RoomScreenRouteProp;
};

const RoomScreen: React.FC<Props> = ({navigation, route}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: backgroundColor(isDarkMode),
  };

  console.log(navigation);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={!isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: backgroundColor(isDarkMode),
          }}>
          <Text>This is {route.params.name}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export {RoomScreen};
