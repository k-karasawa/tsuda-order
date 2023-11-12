export const exportToCsv = (data: any[], filename: string) => {
  let csvContent = "\uFEFF";

  // ヘッダー行の追加（オプション、データの構造に応じて調整）
  const headers = Object.keys(data[0]).join(',');
  csvContent += headers + '\r\n';

  // データ行の追加
  data.forEach(row => {
    const rowContent = Object.values(row).join(',');
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
