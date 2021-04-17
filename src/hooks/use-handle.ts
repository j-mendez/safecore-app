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

      switch (type) {
        case 'channels':
          setChannels(data);
          break;
        case 'channel-users':
          setChannelUsers(data?.users ?? []);
          break;
        case 'active-channel':
        case 'create-channel':
          setActiveChannel(data);
          break;
        default:
          break;
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
