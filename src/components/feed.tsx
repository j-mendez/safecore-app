import React from 'react';
import {View, FlatList, StyleSheet, StatusBar} from 'react-native';
import {Card} from './card';
import {Empty} from './empty';

type ItemCellProps = {
  title?: string;
};

type ItemProps = {
  item: ItemCellProps;
};

type Props = {
  renderItem?: (data?: any) => any;
  channels?: any[];
  onPress?: (data?: any) => any;
};

const keyExtractor = (item: any, index: number) => item.channel_id || index;

export const Feed: React.FC<Props> = ({
  renderItem: RenderItem,
  onPress,
  channels,
}) => {
  const Item = RenderItem ? RenderItem : Card;
  return (
    <FlatList
      data={channels || []}
      renderItem={data => (
        <Item
          {...data}
          onPress={
            onPress
              ? () => {
                  onPress(data.item);
                }
              : undefined
          }
        />
      )}
      ListEmptyComponent={Empty}
      keyExtractor={keyExtractor}
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
