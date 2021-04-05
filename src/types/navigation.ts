import {StackNavigationProp} from '@react-navigation/stack';

export type RootStackParamList = {
  Home: {name: string};
  Profile: {name: string};
  Login: undefined;
  Register: {name: string};
  Feed: {sort: 'latest' | 'top'} | undefined;
  Room: {name: string};
};

export type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

export type HomeProps = {
  navigation: HomeScreenNavigationProp;
};
