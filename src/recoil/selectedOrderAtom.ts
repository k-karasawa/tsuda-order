import { atom } from 'recoil';
import { OrderListDataType } from '../types/types';

export const selectedOrderAtom = atom<OrderListDataType | undefined>({
  key: 'selectedOrderAtom',
  default: undefined,
});
