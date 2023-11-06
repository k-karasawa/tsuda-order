import React, { useState } from 'react';
import { Button, Table, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { supabase } from '../../../../utils/supabase';
import { useProgresses } from './useProgresses';
import { ProgressModal } from './ProgressModal';
import { ProgressColumns } from './ProgressColumns';

export const ProgressManage: React.FC = () => {
  const { progresses, loading, fetchProgresses } = useProgresses();
  const [visible, setVisible] = useState(false);
  const [currentProgress, setCurrentProgress] = useState<any>(null);
  const [progress, setProgress] = useState<string>('');
  const [sort, setSort] = useState<number | null>(null);
  const [color, setColor] = useState<string>('');

  const handleAddOrEditProgress = async () => {
    if (progress && sort !== null) {
      const progressData = {
        progress,
        sort,
        color,
      };

      if (currentProgress) {
        const { error } = await supabase.from('progress').update(progressData).eq('id', currentProgress.id);
        if (error) {
          message.error('進捗情報の更新に失敗しました。');
        } else {
          message.success('進捗情報が更新されました。');
          fetchProgresses();
          setVisible(false);
        }
      } else {
        const { error } = await supabase.from('progress').insert([progressData]);
        if (error) {
          message.error('進捗情報の追加に失敗しました。');
        } else {
          message.success('新しい進捗が追加されました。');
          fetchProgresses();
          setVisible(false);
        }
      }
    }
  };

  const handleDeleteProgress = async (id: number) => {
    const { error } = await supabase.from('progress').delete().eq('id', id);
    if (error) {
      message.error('進捗情報の削除に失敗しました。');
    } else {
      message.success('進捗情報が削除されました。');
      fetchProgresses();
    }
  };

  const columns = ProgressColumns({
    setCurrentProgress,
    setVisible,
    setProgress,
    setSort,
    handleDeleteProgress
  });

  return (
    <div>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => {
          setVisible(true);
          setCurrentProgress(null);
          setProgress('');
          setSort(null);
          setColor('');
        }}
        style={{ marginBottom: '20px' }}
      >
        追加
      </Button>

      <Table columns={columns} dataSource={progresses.sort((a, b) => a.sort - b.sort)} loading={loading} rowKey="id" pagination={false}/>

      <ProgressModal
        visible={visible}
        onOk={handleAddOrEditProgress}
        onCancel={() => setVisible(false)}
        progress={progress}
        sort={sort}
        setProgress={setProgress}
        setSort={setSort}
        currentProgress={currentProgress}
        setColor={setColor}
        color={color}
      />
    </div>
  );
};
