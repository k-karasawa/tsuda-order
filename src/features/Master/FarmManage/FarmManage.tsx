import React, { useState } from 'react';
import { Button, Table, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { supabase } from '../../../../utils/supabase';
import { useFarms } from './useFarms';
import { FarmModal } from './FarmModal';
import { FarmColumns } from './FarmColumns';

export const FarmManage: React.FC = () => {
  const { farms, loading, fetchFarms } = useFarms();
  const [visible, setVisible] = useState(false);
  const [currentFarm, setCurrentFarm] = useState<any>(null);

  const [name, setName] = useState<string>('');
  const [sort, setSort] = useState<number | null>(null);
  const [prefix, setPrefix] = useState<string>('');

  const handleAddOrEditFarm = async () => {
    if (name && sort !== null && prefix) {
      const farmData = {
        name,
        sort,
        prefix
      };

      if (currentFarm) {
        const { error } = await supabase.from('farm').update(farmData).eq('id', currentFarm.id);
        if (error) {
          message.error('商社情報の更新に失敗しました。');
        } else {
          message.success('商社情報が更新されました。');
          fetchFarms();
          setVisible(false);
        }
      } else {
        const { error } = await supabase.from('farm').insert([farmData]);
        if (error) {
          message.error('商社情報の追加に失敗しました。');
        } else {
          message.success('新しい商社が追加されました。');
          fetchFarms();
          setVisible(false);
        }
      }
    }
  };

  const handleDeleteFarm = async (id: number) => {
    const { error } = await supabase.from('farm').delete().eq('id', id);
    if (error) {
      message.error('商社情報の削除に失敗しました。');
    } else {
      message.success('商社情報が削除されました。');
      fetchFarms();
    }
  };

  const columns = FarmColumns({
    setCurrentFarm,
    setVisible,
    setName,
    setSort,
    setPrefix,
    handleDeleteFarm
  });

  return (
    <div>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => {
          setVisible(true);
          setCurrentFarm(null);
          setName('');
          setSort(null);
          setPrefix('');
        }}
      >
        追加
      </Button>

      <Table columns={columns} dataSource={farms.sort((a, b) => a.sort - b.sort)} loading={loading} rowKey="id" />

      <FarmModal
        visible={visible}
        onOk={handleAddOrEditFarm}
        onCancel={() => setVisible(false)}
        name={name}
        sort={sort}
        prefix={prefix}
        setName={setName}
        setSort={setSort}
        setPrefix={setPrefix}
        currentFarm={undefined}
      />
    </div>
  );
};
