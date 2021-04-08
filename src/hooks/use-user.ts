import {useEffect} from 'react';
import {atom, useRecoilState} from 'recoil';
import {appStorage} from '../utils/storage';

const userState = atom({
  key: 'userState',
  default: false,
});

const useUser = (): any => {
  const [user, setUser] = useRecoilState(userState);

  const grabUser = async () => {
    try {
      const uname = await appStorage.getItemAsync('UserName');
      setUser(uname);
    } catch (e) {
      console.error(e);
      setUser('');
    }
  };

  useEffect(() => {
    grabUser();
  });

  const logout = async () => {
    await appStorage.setItem({key: 'UserName', value: ''});
    setUser(null);
  };

  return [user, {logout, grabUser}];
};

export {useUser};
