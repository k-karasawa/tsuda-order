import React, { useEffect, useState } from "react";
import { useSupabaseClient } from "@/hooks";
import { Table, Button, Input } from "antd";

type DataType = {
  created_at: string;
  farm: number | null;
  id: number;
  name: string | null;
  user_id?: string;
};

const RlsTest = () => {
  const supabase = useSupabaseClient();
  const [data, setData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(true);
  const [newItem, setNewItem] = useState("");
  const [editItem, setEditItem] = useState({ id: null, name: "" });
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Error fetching user:', error);
        return;
      }
      if (user && user.email) {
        setUserEmail(user.email);
      } else {
        setUserEmail("");
      }
    };

    fetchUser();
  }, [supabase]);

  // データの読み込み
  const fetchData = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('rls_test')
      .select('*');
    if (error) console.error(error);
    else setData(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

const addItem = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error) {
    console.error('Error fetching user:', error);
    return;
  }

  if (user) {
    const { data, error } = await supabase
      .from('rls_test')
      .insert([{ name: newItem, user_id: user.id }]);

    if (error) console.error(error);
    else {
      fetchData();
      setNewItem("");
    }
  } else {
    console.error('User not logged in');
  }
};

  // データの更新
  const updateItem = async () => {
    const { data, error } = await supabase
      .from('rls_test')
      .update({ name: editItem.name })
      .match({ id: editItem.id });
    if (error) console.error(error);
    else {
      fetchData();
      setEditItem({ id: null, name: "" });
    }
  };

  const deleteItem = async (id: any) => {
    const { data, error } = await supabase
      .from('rls_test')
      .delete()
      .match({ id });
    if (error) console.error(error);
    else fetchData();
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '名前',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: any) => (
        <div>
          <Button onClick={() => setEditItem({ id: record.id, name: record.name })}>編集</Button>
          <Button onClick={() => deleteItem(record.id)}>削除</Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      {loading ? (
        <div>loading...</div>
      ) : (
        <div>
          <Input
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="新しいアイテム"
          />
          <Button onClick={addItem} disabled={!newItem.trim()}>追加</Button>
          {editItem.id && (
            <div>
              <Input
                value={editItem.name}
                onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
                placeholder="アイテムを編集"
              />
              <Button onClick={updateItem} disabled={!editItem.name.trim()}>更新</Button>
            </div>
          )}
          <Table dataSource={data} columns={columns} rowKey="id" />
        </div>
      )}
      <p>取得email: {userEmail}</p>
    </div>
  );
};

export default RlsTest;
