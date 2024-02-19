import React, { useState } from 'react';
import { Button, Table, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useSupabaseClient } from '@/hooks';
import { useRequests } from './useRequests';
import { RequestModal } from './RequestModal';
import { RequestColumns } from './RequestColumns';

export const RequestManage: React.FC = () => {
  const { requests, loading, fetchRequests } = useRequests();
  const [currentRequest, setCurrentRequest] = useState<any>(null);
  const [sort, setSort] = useState<number | null>(null);
  const [name, setName] = useState<string>('');
  const [visible, setVisible] = useState(false);
  const supabase = useSupabaseClient();

  const handleAddOrEditRequest = async () => {
    if (name && sort !== null) {
      const requestData = {
        name,
        sort
      };

      if (currentRequest) {
        const { error } = await supabase.from('request').update(requestData).eq('id', currentRequest.id);
        if (error) {
          message.error('リクエスト情報の更新に失敗しました。');
        } else {
          message.success('リクエスト情報が更新されました。');
          fetchRequests();
          setVisible(false);
        }
      } else {
        const { error } = await supabase.from('request').insert([requestData]);
        if (error) {
          message.error('リクエスト情報の追加に失敗しました。');
        } else {
          message.success('新しいリクエストが追加されました。');
          fetchRequests();
          setVisible(false);
        }
      }
    }
  };

  const handleDeleteRequest = async (id: number) => {
    const { error } = await supabase.from('request').delete().eq('id', id);
    if (error) {
      message.error('リクエスト情報の削除に失敗しました。');
    } else {
      message.success('リクエスト情報が削除されました。');
      fetchRequests();
    }
  };

  const columns = RequestColumns({
    setCurrentRequest,
    setVisible,
    setName,
    setSort,
    handleDeleteRequest
  });

  return (
    <div>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => {
          setVisible(true);
          setCurrentRequest(null);
          setName('');
          setSort(null);
        }}
        style={{ marginBottom: '20px' }}
      >
        追加
      </Button>

      <Table columns={columns} dataSource={requests.sort((a, b) => a.sort - b.sort)} loading={loading} rowKey="id" />

      <RequestModal
        visible={visible}
        onOk={handleAddOrEditRequest}
        onCancel={() => setVisible(false)}
        name={name}
        sort={sort}
        setName={setName}
        setSort={setSort}
        currentRequest={undefined}
      />
    </div>
  );
};
