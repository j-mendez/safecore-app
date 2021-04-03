import React from 'react';
import {View, FlatList, StyleSheet, Text, StatusBar} from 'react-native';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Bitcoin Cigar Lounge, Q & A',
    description: 'btc talk and cigars',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Medtech Digital Health',
    description: 'relax',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Traphouse Ent',
    description: 'vibe and chill',
  },
];

type ItemCellProps = {
  title?: string;
};

type ItemProps = {
  item: ItemCellProps;
};

type Props = {
  renderItem?: (data?: any) => any;
};

export const Feed: React.FC<Props> = ({renderItem}) => {
  return (
    <FlatList
      data={DATA}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      ItemSeparatorComponent={({highlighted}) => (
        <View style={[styles.separator, highlighted && styles.highlight]} />
      )}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight || 0,
    paddingHorizontal: 10,
  },
  separator: {
    marginTop: 10,
  },
  highlight: {
    marginLeft: 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
