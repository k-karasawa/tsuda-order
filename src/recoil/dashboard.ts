import { atom } from 'recoil';

export const orderDataState = atom<any[]>({
  key: 'orderDataState',
  default: [],
});

export const selectedProgressState = atom<string | null>({
  key: 'selectedProgressState',
  default: null,
});

export const tableDataState = atom<any[]>({
  key: 'tableDataState',
  default: [],
});

export const selectedRequestState = atom<string | null>({
  key: 'selectedRequestState',
  default: null,
});
