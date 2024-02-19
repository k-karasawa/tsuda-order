import React, { useState, useEffect } from 'react';
import { Button, Table, message, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useSupabaseClient } from '@/hooks';
import { useCustomerDepartments } from './useCustomerDepartments';
import { useCustomersInfo } from './useCustomersInfo';
import { CustomerDepartmentModal } from './CustomerDepartmentModal';
import { CustomerDepartmentColumns } from './CustomerDepartmentColumns';

export const CustomerDepartmentManage: React.FC = () => {
  const { departments, loading, fetchDepartments } = useCustomerDepartments();
  const { customers } = useCustomersInfo();
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const [currentDepartment, setCurrentDepartment] = useState<any>(null);
  const [department, setDepartment] = useState<string>('');
  const [sort, setSort] = useState<number | null>(null);
  const supabase = useSupabaseClient();

  const handleAddOrEditDepartment = async () => {
    if (department) {
      const departmentData: {
        department: string;
        customer_id: number | null;
        sort?: number;
      } = {
        department,
        customer_id: currentDepartment ? currentDepartment.customer_id : selectedCustomerId
      };

      if (sort !== null) {
        departmentData.sort = sort;
      }

      if (currentDepartment) {
        const { error } = await supabase.from('customer_department').update(departmentData).eq('id', currentDepartment.id);
        if (error) {
          message.error('部署情報の更新に失敗しました。');
        } else {
          message.success('部署情報が更新されました。');
          if (selectedCustomerId) {
            fetchDepartments(selectedCustomerId);
          }
          setVisible(false);
        }
      } else {
        const { error } = await supabase.from('customer_department').insert([departmentData]);
        if (error) {
          message.error('部署情報の追加に失敗しました。');
        } else {
          message.success('新しい部署が追加されました。');
          if (selectedCustomerId) {
            fetchDepartments(selectedCustomerId);
          }
          setVisible(false);
        }
      }
    }
  };

  const handleDeleteDepartment = async (id: number) => {
    const { error } = await supabase.from('customer_department').delete().eq('id', id);
    if (error) {
      message.error('部署情報の削除に失敗しました。');
    } else {
      message.success('部署情報が削除されました。');
      if (selectedCustomerId) {
        fetchDepartments(selectedCustomerId);
      }
    }
  };

  useEffect(() => {
    if (selectedCustomerId) {
      fetchDepartments(selectedCustomerId);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCustomerId]);

  const columns = CustomerDepartmentColumns({
    setCurrentDepartment,
    setVisible,
    setDepartment,
    setSort,
    handleDeleteDepartment
  });

  return (
    <div>
      <div style={{marginBottom: '8px'}}>顧客を選択してください。</div>
      <Select
        style={{ width: 200, marginBottom: '20px', marginRight: '20px' }}
        placeholder="顧客を選択"
        onChange={(value: number) => setSelectedCustomerId(value)}
      >
        {customers.map(customer => (
          <Select.Option key={customer.id} value={customer.id}>
            {customer.name}
          </Select.Option>
        ))}
      </Select>

      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => {
          setVisible(true);
          setCurrentDepartment(null);
          setDepartment('');
          setSort(null);
        }}
        style={{ marginBottom: '20px' }}
      >
        追加
      </Button>

      <Table
        columns={columns}
        dataSource={departments.sort((a, b) => a.sort - b.sort)}
        loading={selectedCustomerId ? loading : false}
        rowKey="id"
      />
      <CustomerDepartmentModal
        visible={visible}
        onOk={handleAddOrEditDepartment}
        onCancel={() => setVisible(false)}
        department={department}
        sort={sort}
        setDepartment={setDepartment}
        setSort={setSort}
        currentDepartment={currentDepartment}
      />
    </div>
  );
};
