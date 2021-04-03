import React from 'react';
import {SafeAreaView, useColorScheme, Button} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Card, Feed} from '../components';
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
    <SafeAreaView style={backgroundStyle}>
      <Feed
        renderItem={({item}) => (
          <Card title={item.title}>{item.description}</Card>
        )}
      />
      <Button
        title="Create Room"
        accessibilityLabel="Create a Room"
        onPress={() => navigation.navigate('Room', {name: 'Me'})}
      />
    </SafeAreaView>
  );
};

export {HomeScreen};
