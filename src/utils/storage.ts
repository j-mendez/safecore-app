import MMKVStorage from 'react-native-mmkv-storage';

class MemoryStorage {
  data: any = {};
  setItem = ({key, value}: {key: string; value: string}) => {
    this.data[key] = value;
  };
  getItem = (key: string) => {
    return this.data[key];
  };
}

class AppStorage {
  constructor() {
    this.MMKV = new MMKVStorage.Loader().withEncryption().initialize();
    this.memoryStorage = new MemoryStorage();
  }
  memoryStorage: any;
  MMKV: any;
  setItem = async ({key, value}: {key: string; value: string}) => {
    this.memoryStorage.setItem({key, value});
    return await this.MMKV.setStringAsync(key, value);
  };
  getItem = (key: string) => {
    return this.memoryStorage.getItem(key);
  };
  getItemAsync = async (key: string) => {
    return await this.MMKV.getStringAsync(key);
  };
}

const appStorage = new AppStorage();

export {appStorage, AppStorage};