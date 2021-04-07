import MMKVStorage from 'react-native-mmkv-storage';

class AppStorage {
  constructor() {
    this.MMKV = new MMKVStorage.Loader().withEncryption().initialize();
  }
  MMKV: MMKVStorage;
  setItem = async ({key, value}: {key: string; value: string}) => {
    await this.MMKV.setStringAsync(key, value);
  };
  getItem = async (key: string) => {
    return await this.MMKV.getStringAsync(key);
  };
}

const appStorage = new AppStorage();

export {appStorage, AppStorage};
