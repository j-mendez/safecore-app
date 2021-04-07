import React, {useState} from 'react';
import {
  Alert,
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
import {appStorage} from '../utils/storage';

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

export type Props = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen: React.FC<Props> = ({navigation}) => {
  const [name, onChangeText] = useState<string>('');
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: backgroundColor(isDarkMode),
    flex: 1,
  };

  const login = async () => {
    if (name) {
      await appStorage.setItem({key: 'UserName', value: name});
      navigation.navigate('Home', {name});
    } else {
      Alert.alert('please enter a name');
    }
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
          value={name}
          placeholder={'User Name'}
        />
      </ScrollView>
      <Row>
        <Button
          title="Login"
          accessibilityLabel="login to application"
          onPress={login}
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
