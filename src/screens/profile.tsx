import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  View,
  Text,
  Button,
} from 'react-native';

import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import type {RootStackParamList} from '../types/navigation';
import {backgroundColor} from '../styles/background';

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Profile'
>;

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Profile'>;

type Props = {
  navigation: ProfileScreenNavigationProp;
  route: ProfileScreenRouteProp;
};

const ProfileScreen: React.FC<Props> = ({navigation, route}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: backgroundColor(isDarkMode),
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={!isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: backgroundColor(isDarkMode),
          }}>
          <Text>This is {route.params.name}'s profile</Text>
          <Button
            title="Go Back"
            accessibilityLabel="navigate back home"
            onPress={() => navigation.pop()}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export {ProfileScreen};
