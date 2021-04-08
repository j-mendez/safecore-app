import React, {Fragment} from 'react';
import {Button, ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {LoginScreen, HomeScreen, ProfileScreen} from '../screens';
import type {RootStackParamList} from '../types/navigation';
import {useUser} from '../hooks/use-user';

const Stack = createStackNavigator<RootStackParamList>();

export const MyStack: React.FC = () => {
  const [user, {logout}] = useUser();

  if (user === false) {
    return <ActivityIndicator />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Fragment>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                title: '',
                headerLeft: () => <Button title="logout" onPress={logout} />,
                gestureEnabled: false,
              }}
            />
            <Stack.Screen name="Profile" component={ProfileScreen} />
          </Fragment>
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
