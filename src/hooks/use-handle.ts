// import type {User} from '@app/types';
import {useCallback} from 'react';
import {atom, useRecoilState} from 'recoil';

const channelState = atom({
  key: 'channelState',
  default: [],
});

const activeChannelState = atom({
  key: 'activeChannelState',
  default: '',
});

type Message = {
  data: any;
  type: string;
};

const useHandle = (): any => {
  const [channels, setChannels] = useRecoilState(channelState);
  const [activeChannel, setActiveChannel] = useRecoilState(activeChannelState);

  const handle = useCallback(
    (message: Message) => {
      const {data, type} = message;
      if (type === 'channels') {
        setChannels(data);
      }
    },
    [setChannels],
  );

  console.log(channels);
  return [handle, {channels, activeChannel, setActiveChannel}];
};

export {useHandle};
