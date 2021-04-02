import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  useColorScheme,
  View,
  Button,
  TouchableOpacity,
} from 'react-native';
import {Header} from 'react-native/Libraries/NewAppScreen';
import {StackNavigationProp} from '@react-navigation/stack';
import {Card} from '../components';
import {backgroundColor} from '../styles/background';
import type {RootStackParamList} from '../types/navigation';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export type Props = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen: React.FC<Props> = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: backgroundColor(isDarkMode),
    flex: 1,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <TouchableOpacity
          onPress={() => navigation.navigate('Room', {name: 'Some Secret'})}>
          <Card title={'Encrypted Room'}>0 Users</Card>
        </TouchableOpacity>
        <View
          style={{
            backgroundColor: backgroundColor(isDarkMode),
          }}>
          <Button
            title="Go to Jane's profile"
            accessibilityLabel="navigate to Jane's profiles"
            onPress={() => navigation.navigate('Profile', {name: 'Jane'})}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export {HomeScreen};
