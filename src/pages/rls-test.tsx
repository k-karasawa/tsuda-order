import React, { useEffect, useState } from "react";
import { useSupabaseClient } from "@/hooks";
import { Table, Button, Input } from "antd";

const RlsTest = () => {
  const supabase = useSupabaseClient();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newItem, setNewItem] = useState("");
  const [editItem, setEditItem] = useState({ id: null, name: "" }); // 編集用の状態
  const [userEmail, setUserEmail] = useState("");

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
  }, []);

  // データの追加
  const addItem = async () => {
    const { data, error } = await supabase
      .from('rls_test')
      .insert([{ name: newItem }]);
    if (error) console.error(error);
    else {
      fetchData(); // データを再読み込み
      setNewItem(""); // 入力フィールドをクリア
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
      fetchData(); // データを再読み込み
      setEditItem({ id: null, name: "" }); // 編集状態をクリア
    }
  };

  // データの削除
  const deleteItem = async (id: any) => {
    const { data, error } = await supabase
      .from('rls_test')
      .delete()
      .match({ id });
    if (error) console.error(error);
    else fetchData(); // データを再読み込み
  };

  // Tableの列定義（更新と削除の操作を含む）
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
      <p>ログインユーザーのメールアドレス: {userEmail}</p>
    </div>
  );
};

export default RlsTest;
