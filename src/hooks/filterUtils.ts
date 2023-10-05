type DataItemType = {
  [key: string]: any;
};

export const createDynamicFilters = (
  data: DataItemType[],
  filterableColumns: string[]
): Record<string, { text: any, value: any }[]> => {
  return filterableColumns.reduce((acc: Record<string, any[]>, colName: string) => {
    acc[colName] = Array.from(new Set(data.map((item: DataItemType) => item[colName]))).map(value => ({
      text: value,
      value: value,
    }));
    return acc;
  }, {});
};
