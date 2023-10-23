import { atom } from 'recoil';

export const XScrollState = atom<number>({
  key: 'XScrollState',
  default: 0,
});
