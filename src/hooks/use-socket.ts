import {useEffect} from 'react';
import type {User} from '@app/types';

const useSocket = (cb: (a: any) => void): void => {
  useEffect(() => {
    const client = new WebSocket('wss://127.0.0.1:64738');

    client.onopen = () => {
      client.send('channel');
    };

    client.onmessage = (message: {data: string | User}) => {
      console.log(message);
    };

    return () => {
      client.close();
    };
  }, [cb]);
};

export {useSocket};
