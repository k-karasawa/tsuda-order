export const formatAmount = (amount: string): string => {
  const halfWidth = amount.replace(/[０-９]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0xFEE0));
  const formatted = parseInt(halfWidth, 10).toLocaleString();
  return `¥${formatted}`;
};
