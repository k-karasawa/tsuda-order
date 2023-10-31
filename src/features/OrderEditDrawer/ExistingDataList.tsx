import React, { useState } from 'react';
import { FloatButton, List, Input, DatePicker } from 'antd';
import { ExistingDataListProps, ExistingData } from './types/types';
import { PlusOutlined, EditOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

export const ExistingDataList: React.FC<ExistingDataListProps> = ({ data, onAddNew }) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [tempData, setTempData] = useState<Partial<ExistingData>>({});

  const startEditing = (index: number, item: ExistingData) => {
    setEditingIndex(index);
    setTempData(item);
  };

  const handleEditChange = (key: keyof ExistingData, value: any) => {
    setTempData((prev) => ({ ...prev, [key]: value }));
  };

  const saveChanges = (index: number) => {
    // TODO: ここでAPI呼び出しやロジックを使用してデータを保存します
    console.log("Saving changes:", tempData);
    setEditingIndex(null);
    setTempData({});
  };

  const cancelEditing = () => {
    setEditingIndex(null);
    setTempData({});
  };

  return (
    <div>
      {data.map((item, index) => (
        <List
          key={index}
          header={
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              {`出戻り${index + 1}回目`}
              {editingIndex === index ? (
                <div>
                  <a onClick={cancelEditing} style={{ marginRight: '1rem' }}><CloseOutlined /> キャンセル</a>
                  <a onClick={() => saveChanges(index)}><CheckOutlined /> 保存</a>
                </div>
              ) : (
                <a onClick={() => startEditing(index, item)}><EditOutlined /> 編集</a>
              )}
            </div>
          }
          bordered
          style={{ marginBottom: 16 }}
        >
          {editingIndex === index ? (
            <>
              <List.Item style={{ marginLeft: '1rem' }}>
                出戻り日:
                <DatePicker
                  value={dayjs(item.return_date)}
                  onChange={date => handleEditChange('return_date', date?.format('YYYY-MM-DD'))}
                />
              </List.Item>
              <List.Item style={{ marginLeft: '1rem' }}>
                再出荷日:
                <DatePicker
                  value={dayjs(item.reshipment_date)}
                  onChange={date => handleEditChange('reshipment_date', date?.format('YYYY-MM-DD'))}
                />
              </List.Item>
              <List.Item style={{ marginLeft: '1rem' }}>
                備考:
                <Input.TextArea
                  value={item.remark}
                  onChange={e => handleEditChange('remark', e.target.value)}
                />
              </List.Item>
            </>
          ) : (
            <>
              <List.Item style={{ marginLeft: '1rem' }}>
                出戻り日: {dayjs(item.return_date).format('YYYY-MM-DD')}
              </List.Item>
              <List.Item style={{ marginLeft: '1rem' }}>
                再出荷日: {dayjs(item.reshipment_date).format('YYYY-MM-DD')}
              </List.Item>
              <List.Item style={{ marginLeft: '1rem' }}>
                備考: {item.remark}
              </List.Item>
            </>
          )}
        </List>
      ))}
      <FloatButton
        icon={<PlusOutlined />}
        type="primary"
        tooltip={<div>出戻り情報追加</div>}
        style={{ right: 24 }}
        onClick={onAddNew}
      />
    </div>
  );
};
