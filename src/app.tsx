import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import {MyStack} from './navigation';
import {backgroundColor} from './styles/background';
import {RecoilRoot} from 'recoil';

export interface Props {}

const App: React.FC<Props> = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: backgroundColor(isDarkMode),
    flex: 1,
  };

  return (
    <RecoilRoot>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <MyStack />
      </SafeAreaView>
    </RecoilRoot>
  );
};

export default App;
