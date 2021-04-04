import React, {useState} from 'react';
import {
  Button,
  TextInput,
  SafeAreaView,
  ScrollView,
  useColorScheme,
} from 'react-native';
import {Header} from 'react-native/Libraries/NewAppScreen';
import {StackNavigationProp} from '@react-navigation/stack';
import {Row} from '../components';
import {backgroundColor} from '../styles/background';
import {styles} from '../styles/containers';
import type {RootStackParamList} from '../types/navigation';

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

export type Props = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen: React.FC<Props> = ({navigation}) => {
  const [text, onChangeText] = useState<string>('');
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
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          placeholder={'User Name'}
        />
      </ScrollView>
      <Row>
        <Button
          title="Login"
          accessibilityLabel="login to application"
          onPress={() => navigation.navigate('Home', {name: 'Jane'})}
          color="#f194ff"
        />
        <Button
          title="Register"
          accessibilityLabel="Register account and login"
          onPress={() => navigation.navigate('Register', {name: 'Jane'})}
        />
      </Row>
    </SafeAreaView>
  );
};

export {LoginScreen};
