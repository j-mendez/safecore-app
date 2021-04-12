/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/app';
import {name as appName} from './app.json';
import TrackPlayer from 'react-native-track-player';

TrackPlayer.setupPlayer().then(() => {
  // The player is ready to be used
});
AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() => require('./service'));
