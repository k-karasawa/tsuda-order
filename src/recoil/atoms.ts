import { atom } from 'recoil';

export const XScrollState = atom<number>({
  key: 'XScrollState',
  default: 0,
});

export const userState = atom({
  key: 'userState',
  default: { name: '', role: '', isLoggedIn: false },
});
