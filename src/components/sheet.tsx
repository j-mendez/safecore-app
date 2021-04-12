import React, {
  useCallback,
  useEffect,
  forwardRef,
  useMemo,
  useImperativeHandle,
  useRef,
  RefForwardingComponent,
} from 'react';
import BottomSheet from 'reanimated-bottom-sheet';
import {useWindowDimensions} from 'react-native';
import {ActiveChannel, CreateChannel} from './channel';
import {socketClient} from '../hooks/use-socket';
import Animated from 'react-native-reanimated';

type Users = {
  name: string;
};
type SheetProps = {
  activeChannel: any;
  channelUsers: Users[];
};

type SheetHandle = {
  open: () => void;
};

const SheetComponent: RefForwardingComponent<SheetHandle, SheetProps> = (
  props: any,
  ref: any,
) => {
  const contentPosition = useMemo(() => new Animated.Value(0), []);
  const bottomSheetModalRef = useRef<BottomSheet>(null);
  const windowHeight = useWindowDimensions().height;
  const snapPoints = [0, '20%', windowHeight];
  const {activeChannel, channelUsers} = props;

  useEffect(() => {
    return () => {
      console.log('disconnecting');
      socketClient.client.send(
        JSON.stringify({
          name: 'Disconnect',
        }),
      );
    };
  }, []);

  const renderContent = () => {
    if (!activeChannel) {
      return (
        <CreateChannel
          windowHeight={windowHeight}
          bottomSheetModalRef={bottomSheetModalRef}
        />
      );
    }
    return (
      <ActiveChannel
        bottomSheetModalRef={bottomSheetModalRef}
        activeChannel={activeChannel}
        channelUsers={channelUsers}
        windowHeight={windowHeight}
      />
    );
  };

  useImperativeHandle(ref, () => ({
    open() {
      if (bottomSheetModalRef?.current?.snapTo) {
        bottomSheetModalRef.current.snapTo(2);
      }
    },
  }));

  const onOpenEnd = useCallback(() => {
    console.log([contentPosition, 'open-end']);
  }, [contentPosition]);

  const onOpenStart = useCallback(() => {
    console.log('open-start');
  }, []);

  const onCloseEnd = useCallback(() => {
    console.log('onCloseEnd');
    socketClient.client.send(
      JSON.stringify({
        name: 'Disconnect',
      }),
    );
  }, []);

  return (
    <BottomSheet
      contentPosition={contentPosition}
      ref={bottomSheetModalRef}
      snapPoints={snapPoints}
      renderContent={renderContent}
      onOpenEnd={onOpenEnd}
      onOpenStart={onOpenStart}
      onCloseEnd={onCloseEnd}
    />
  );
};

const Sheet = forwardRef(SheetComponent);

export {Sheet};
