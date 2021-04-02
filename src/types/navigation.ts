export type RootStackParamList = {
  Home: undefined;
  Profile: {name: string};
  Feed: {sort: 'latest' | 'top'} | undefined;
  Room: {name: string};
};
