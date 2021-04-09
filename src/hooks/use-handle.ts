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

const channelUsersState = atom({
  key: 'channelUsersState',
  default: [],
});

type Message = {
  data: any;
  type: string;
};

const useHandle = (): any => {
  const [channels, setChannels] = useRecoilState(channelState);
  const [activeChannel, setActiveChannel] = useRecoilState(activeChannelState);
  const [channelUsers, setChannelUsers] = useRecoilState(channelUsersState);

  const handle = useCallback(
    (message: Message) => {
      const {data, type} = message;
      if (type === 'channels') {
        setChannels(data);
      }
      if (type === 'channel-users') {
        setChannelUsers(data);
      }
      if (type === 'active-channel') {
        setActiveChannel(data);
      }
    },
    [setChannels, setChannelUsers, setActiveChannel],
  );

  return [handle, {channels, activeChannel, setActiveChannel, channelUsers}];
};

export {useHandle};
