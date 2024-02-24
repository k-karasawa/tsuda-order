import React, { createContext, useContext, useState, ReactNode } from 'react';
import { OrderListDataType } from '@/types/types';

interface FilteredDataContextType {
  filteredData: OrderListDataType[];
  setFilteredData: React.Dispatch<React.SetStateAction<OrderListDataType[]>>;
  graphXAxisData: string[]; // 追加
  setGraphXAxisData: React.Dispatch<React.SetStateAction<string[]>>; // 追加
}

const FilteredDataContext = createContext<FilteredDataContextType | null>(null);

interface FilteredDataProviderProps {
  children: ReactNode;
}

export const FilteredDataProvider: React.FC<FilteredDataProviderProps> = ({ children }) => {
  const [filteredData, setFilteredData] = useState<OrderListDataType[]>([]);
  const [graphXAxisData, setGraphXAxisData] = useState<string[]>([]); // 追加

  return (
    <FilteredDataContext.Provider value={{ filteredData, setFilteredData, graphXAxisData, setGraphXAxisData }}>
      {children}
    </FilteredDataContext.Provider>
  );
};

export const useFilteredData = () => {
  const context = useContext(FilteredDataContext);
  if (!context) {
    throw new Error('useFilteredData must be used within a FilteredDataProvider');
  }
  return context;
};
