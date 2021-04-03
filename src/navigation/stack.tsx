import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  LoginScreen,
  HomeScreen,
  RegisterScreen,
  RoomScreen,
  ProfileScreen,
} from '../screens';
import type {RootStackParamList} from '../types/navigation';

const Stack = createStackNavigator<RootStackParamList>();

export const MyStack: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: '',
            headerLeft: undefined,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Room" component={RoomScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
