export const generateSalesData = (orderData: any[]) => {
  const salesData = {
    受付: 0,
    検証中: 0,
    完了: 0,
    出戻り: 0,
    失注: 0,
    作業中: 0,
  };

  orderData.forEach((data) => {
    switch (data.progress_name) {
      case '受付':
      case '見積提出':
      case '仮見積':
        salesData.受付++;
        break;
      case '検証中':
        salesData.検証中++;
        break;
      case '完了':
        salesData.完了++;
        break;
      case '出戻り':
        salesData.出戻り++;
        break;
      case '失注':
        salesData.失注++;
        break;
      default:
        salesData.作業中++;
        break;
    }
  });

  return Object.entries(salesData).map(([name, value]) => ({
    name,
    value,
  }));
};
