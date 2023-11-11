import React from 'react';
import { Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { exportToCsv } from './exportToCsv';

interface CSVDownloaderProps {
  data: any[];
  filename: string;
}

export const CSVDownloader: React.FC<CSVDownloaderProps> = ({ data, filename }) => {
  const handleDownload = () => {
    exportToCsv(data, filename);
  };

  return (
    <Button
      onClick={handleDownload}
      type="primary"
      icon={<DownloadOutlined />}
    >
      CSV
    </Button>
  );
};
