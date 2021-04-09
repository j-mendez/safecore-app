import 'react-native';
import 'react-native-gesture-handler/jestSetup';
import React from 'react';
import {Card} from '../../src/components/card';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<Card item={{name: 'Lobby'}} />);
});
