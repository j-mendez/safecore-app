export type RootStackParamList = {
  Home: {name: string};
  Profile: {name: string};
  Login: undefined;
  Register: {name: string};
  Feed: {sort: 'latest' | 'top'} | undefined;
  Room: {name: string};
};
