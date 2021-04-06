import {useEffect} from 'react';
// import type {User} from '@app/types';

const socketClient = {
  client: {send: (a: any) => a},
};

const useSocket = (cb: (a: any) => void): void => {
  useEffect(() => {
    const client = new WebSocket(
      `ws${process.env.NODE_ENV === 'production' ? 's' : ''}://127.0.0.1:7770`,
    );
    const timestamp = new Date().getTime();
    const payload = {
      timestamp,
    };

    client.onopen = () => {
      client.send(
        JSON.stringify({
          name: 'Channels',
          payload,
        }),
      );
    };

    client.onmessage = (message: {data?: string}) => {
      const data = message?.data;
      console.log(message);
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
