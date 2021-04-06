import React, {
  useCallback,
  forwardRef,
  useMemo,
  useImperativeHandle,
  useRef,
  RefForwardingComponent,
} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import {useWindowDimensions} from 'react-native';

type SheetProps = {
  activeChannel: any;
};

type SheetHandle = {
  open: () => void;
};

const SheetComponent: RefForwardingComponent<SheetHandle, SheetProps> = (
  props: any,
  ref: any,
) => {
  const bottomSheetModalRef = useRef<BottomSheet>(null);
  const windowHeight = useWindowDimensions().height;
  const snapPoints = useMemo(() => [0, '20%', windowHeight - 125], [
    windowHeight,
  ]);

  const {activeChannel} = props;

  const renderContent = () => (
    <View style={[styles.sheet, {height: windowHeight}]}>
      <Text>{activeChannel?.name || 'Club Room'}</Text>
    </View>
  );

  useImperativeHandle(ref, () => ({
    open() {
      bottomSheetModalRef.current?.snapTo(2);
    },
  }));

  const onOpenEnd = useCallback(() => {
    console.log('handleSheetChanges');
  }, []);

  const onOpenStart = useCallback(() => {
    console.log('handleSheetChanges');
  }, []);

  return (
    <BottomSheet
      ref={bottomSheetModalRef}
      snapPoints={snapPoints}
      renderContent={renderContent}
      onOpenEnd={onOpenEnd}
      onOpenStart={onOpenStart}
    />
  );
};

const styles = StyleSheet.create({
  sheet: {
    backgroundColor: '#fff',
    minHeight: 450,
    borderTopWidth: 0.5,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: 'rgb(30,30,30)',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 12,
  },
});

const Sheet = forwardRef(SheetComponent);

export {Sheet};
