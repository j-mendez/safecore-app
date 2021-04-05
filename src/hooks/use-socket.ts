import {useEffect} from 'react';
// import type {User} from '@app/types';

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
      if (data) {
        const parsedData = typeof data === 'string' ? JSON.parse(data) : data;
        typeof cb === 'function' && cb(parsedData);
      }
    };

    return () => {
      client.close();
    };
  }, [cb]);
};

export {useSocket};
