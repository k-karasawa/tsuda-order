import React, { useState } from 'react';
import { Button, Table, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { supabase } from '../../../../utils/supabase';
import { useCustomers } from './useCustomers';
import { CustomerModal } from './CustomerModal';
import { CustomerColumns } from './CustomerColumns';

export const CustomerManage: React.FC = () => {
  const { customers, loading, fetchCustomers } = useCustomers();
  const [visible, setVisible] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState<any>(null);
  const [name, setName] = useState<string>('');
  const [sort, setSort] = useState<number | null>(null);

  const handleAddOrEditCustomer = async () => {
    if (name) {
      const customerData = {
        name,
        sort
      };

      if (currentCustomer) {
        const { error } = await supabase.from('customer').update(customerData).eq('id', currentCustomer.id);
        if (error) {
          message.error('顧客情報の更新に失敗しました。');
        } else {
          message.success('顧客情報が更新されました。');
          fetchCustomers();
          setVisible(false);
        }
      } else {
        const { error } = await supabase.from('customer').insert([customerData]);
        if (error) {
          message.error('顧客情報の追加に失敗しました。');
        } else {
          message.success('新しい顧客が追加されました。');
          fetchCustomers();
          setVisible(false);
        }
      }
    }
  };

  const handleDeleteCustomer = async (id: number) => {
    const { error } = await supabase.from('customer').delete().eq('id', id);
    if (error) {
      message.error('顧客情報の削除に失敗しました。');
    } else {
      message.success('顧客情報が削除されました。');
      fetchCustomers();
    }
  };

  const columns = CustomerColumns({
    setCurrentCustomer,
    setVisible,
    setName,
    setSort,
    handleDeleteCustomer
  });

  return (
    <div>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => {
          setVisible(true);
          setCurrentCustomer(null);
          setName('');
        }}
        style={{ marginBottom: '20px' }}
      >
        追加
      </Button>

      <Table columns={columns} dataSource={customers} loading={loading} rowKey="id" />

      <CustomerModal
        visible={visible}
        onOk={handleAddOrEditCustomer}
        onCancel={() => setVisible(false)}
        name={name}
        setName={setName}
        currentCustomer={undefined}
      />
    </div>
  );
};
