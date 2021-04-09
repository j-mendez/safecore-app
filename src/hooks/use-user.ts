import {useEffect, useCallback} from 'react';
import {atom, useRecoilState} from 'recoil';
import {appStorage} from '../utils/storage';
import {userState} from '../state/user';

const userLoadedState = atom({
  key: 'userLoadedState',
  default: false,
});

const useUser = (): any => {
  const [user, setUser] = useRecoilState(userState);
  const [loaded, setLoaded] = useRecoilState(userLoadedState);

  const grabUser = useCallback(async () => {
    try {
      const uname = await appStorage.getItemAsync('UserName');
      setUser(uname);
    } catch (e) {
      console.error(e);
    } finally {
      setLoaded(true);
    }
  }, [setUser, setLoaded]);

  useEffect(() => {
    grabUser();
  });

  const logout = async () => {
    await appStorage.setItem({key: 'UserName', value: ''});
    setUser('');
  };

  return [user, {logout, loaded, grabUser}];
};

export {useUser};
