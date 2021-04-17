import {useEffect} from 'react';
import {SOCKET_URL} from '../config/sockets';
// import type {User} from '@app/types';

const socketClient = {
  client: {send: (a: any) => a},
};

const useSocket = (cb: (a: any) => void): void => {
  useEffect(() => {
    const client = new WebSocket(SOCKET_URL);

    client.onopen = () => {
      client.send(
        JSON.stringify({
          name: 'Channels',
        }),
      );
    };

    client.onmessage = (message: {data?: string}) => {
      const data = message?.data;
      if (data) {
        const parsedData = typeof data === 'string' ? JSON.parse(data) : data;
        typeof cb === 'function' && cb(parsedData);
      }
    };

    socketClient.client = client;
    return () => {
      client.close();
    };
  }, [cb]);
};

export {socketClient, useSocket};
