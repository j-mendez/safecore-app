// import type {User} from '@app/types';
import {useCallback} from 'react';
import {useRecoilState} from 'recoil';
import {
  channelState,
  activeChannelState,
  channelUsersState,
  micState,
} from '../state/user';

type Message = {
  data: any;
  type: string;
};

const useHandle = (): any => {
  const [channels, setChannels] = useRecoilState(channelState);
  const [activeChannel, setActiveChannel] = useRecoilState(activeChannelState);
  const [activeMic, setActiveMic] = useRecoilState(micState);
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
      if (type === 'create-channel') {
        setActiveChannel(data);
      }
    },
    [setChannels, setChannelUsers, setActiveChannel],
  );

  return [
    handle,
    {
      activeChannel,
      activeMic,
      channels,
      channelUsers,
      setActiveChannel,
      setActiveMic,
    },
  ];
};

export {useHandle};
