import { ColumnMapping } from "./colmunMapping";

export const exportToCsv = (data: any[], filename: string, selectedColumns?: string[]) => {
  let csvContent = "\uFEFF";

  // ヘッダー行の追加
  const headers = ColumnMapping
    .filter(column => !selectedColumns || selectedColumns.includes(column.key))
    .map(column => column.label)
    .join(',');
  csvContent += headers + '\r\n';

  // データ行の追加
  data.forEach(row => {
    const rowContent = ColumnMapping
      .filter(column => !selectedColumns || selectedColumns.includes(column.key))
      .map(column => row[column.key] || '')
      .join(',');
    csvContent += rowContent + '\r\n';
  });

  // Blobオブジェクトを使用してファイルダウンロードのトリガーを設定
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
