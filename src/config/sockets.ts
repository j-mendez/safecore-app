import {Platform} from 'react-native';

export const SOCKET_URL = `ws${
  process.env.NODE_ENV === 'production' ? 's' : ''
}://${Platform.OS === 'android' ? '10.0.2.2' : 'localhost'}:7770`;
