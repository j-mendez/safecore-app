import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  useColorScheme,
  View,
  Button,
  TouchableOpacity,
  Text,
} from 'react-native';
import {Header} from 'react-native/Libraries/NewAppScreen';
import {StackNavigationProp} from '@react-navigation/stack';
import {Card} from '../components';
import {backgroundColor} from '../styles/background';
import type {RootStackParamList} from '../types/navigation';

type RegisterScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

export type Props = {
  navigation: RegisterScreenNavigationProp;
};

const RegisterScreen: React.FC<Props> = ({navigation}) => {
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
        <Text>Register</Text>
        <View
          style={{
            backgroundColor: backgroundColor(isDarkMode),
          }}>
          <Button
            title="Sign Up"
            accessibilityLabel="login to application"
            onPress={() => navigation.navigate('Home', {name: 'Jane'})}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export {RegisterScreen};
