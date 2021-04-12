import {atom} from 'recoil';

export const userState = atom({
  key: 'userState',
  default: '',
});

export const micState = atom({
  key: 'micState',
  default: false,
});

export const channelState = atom({
  key: 'channelState',
  default: [],
});

export const activeChannelState = atom({
  key: 'activeChannelState',
  default: '',
});

export const channelUsersState = atom({
  key: 'channelUsersState',
  default: [],
});
