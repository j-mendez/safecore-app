import 'react-native';
import 'react-native-gesture-handler/jestSetup';
import React from 'react';
import {Card} from '../../src/components';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<Card title={'hi'} />);
});