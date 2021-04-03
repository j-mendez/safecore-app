import {useEffect} from 'react';
import type {User} from '@app/types';

const useSocket = (cb: (a: any) => void): void => {
  useEffect(() => {
    const client = new WebSocket('ws://127.0.0.1:64738');

    client.onopen = () => {
      client.send('ping');
    };

    client.onmessage = (message: {data: string | User}) => {
      if (message?.data) {
        try {
          cb(<User>JSON.parse(message.data as string));
        } catch (e) {
          console.error(e);
        }
      }
    };

    return () => {
      client.close();
    };
  }, [cb]);
};

export {useSocket};
