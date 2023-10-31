import { useRecoilValue } from 'recoil';
import { selectedOrderAtom } from '@/recoil/selectedOrderAtom';

export const useSelectedOrder = () => {
  return useRecoilValue(selectedOrderAtom);
};
