import React, {useState} from 'react';
import {
  Alert,
  Button,
  Text,
  TextInput,
  SafeAreaView,
  ScrollView,
  useColorScheme,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Row} from '../components';
import {backgroundColor} from '../styles/background';
import {styles} from '../styles/containers';
import type {RootStackParamList} from '../types/navigation';
import {appStorage} from '../utils/storage';
import {useUser} from '../hooks/use-user';

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

export type Props = {
  navigation?: LoginScreenNavigationProp;
};

const LoginScreen: React.FC<Props> = () => {
  const [name, onChangeText] = useState<string>('');
  const isDarkMode = useColorScheme() === 'dark';
  const [_, {grabUser}] = useUser();
  const backgroundStyle = {
    backgroundColor: backgroundColor(isDarkMode),
    flex: 1,
    padding: 12,
  };

  const login = async () => {
    if (name) {
      console.log(_);
      await appStorage.setItem({key: 'UserName', value: name});
      await grabUser();
    } else {
      Alert.alert('please enter a name');
    }
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Text>Enter your name</Text>
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
          color="#000"
        />
      </Row>
    </SafeAreaView>
  );
};

export {LoginScreen};
