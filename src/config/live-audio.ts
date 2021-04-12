import type {Options} from 'react-native-live-audio-stream';

export const options = {
  sampleRate: 32000,
  channels: 1,
  bitsPerSample: 16,
  audioSource: 6,
  bufferSize: 4096,
} as Options;
