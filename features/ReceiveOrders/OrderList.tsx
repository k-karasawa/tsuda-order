import React, { useContext, useEffect, useRef, useState } from 'react';
import type { InputRef } from 'antd';
import { Form, Input, Popconfirm, Table, Tag } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { Item, DataType, initialData } from './TableData';
import styles from './tableStyles.module.css';

const { Search } = Input;

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0, width: '100%' }}  // width を 100% にセットしてセルの幅を固定
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
        {children}
      </div>
    );
  }

  return <td {...restProps} style={{ padding: 8, width: restProps.style?.width, height: '60px', ...restProps.style }}>{childNode}</td>;
};


type EditableTableProps = Parameters<typeof Table>[0];

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

export const OrderList: React.FC = () => {
  const [dataSource, setDataSource] = useState<DataType[]>(initialData);
  const [filteredData, setFilteredData] = useState<DataType[]>(initialData); // ← フィルタリングされたデータのためのstate
  const [count, setCount] = useState(2);
  const [searchText, setSearchText] = useState<string>(""); // ← 検索テキストのstate

  useEffect(() => {
    if (searchText) {
      const loweredSearchText = searchText.toLowerCase();
      const filtered = dataSource.filter(item => 
        Object.values(item).some(value => 
          String(value).toLowerCase().includes(loweredSearchText)
        )
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(dataSource);
    }
  }, [searchText, dataSource]);

  const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
    {
      title: '受注No,',
      dataIndex: '受注No',
      width: '90px',
    },
    {
      title: '進捗',
      dataIndex: '進捗',
      width: '100px',
      editable: true,
      render: (text: string) => {
        switch (text) {
          case '完了':
            return <Tag color="green">{text}</Tag>;
          case '見積提出':
            return <Tag color="pink">{text}</Tag>;
          case '受注済み':
            return <Tag color="orange">{text}</Tag>;
          case '作業中':
            return <Tag color="blue">{text}</Tag>;
          case '検証中':
            return <Tag color="purple">{text}</Tag>;
          case '失注':
            return <Tag color="gray">{text}</Tag>;
          default:
            return <Tag>{text}</Tag>;
        }
      },
    },
    {
      title: '依頼内容',
      dataIndex: '依頼内容',
      width: '130px',
      editable: true,
    },
    {
      title: 'ユーザー',
      dataIndex: 'ユーザー',
      width: '120px',
      editable: true,
    },
    {
      title: '拠点',
      dataIndex: '拠点',
      width: '120px',
      editable: true,
    },
    {
      title: '顧客担当者',
      dataIndex: '顧客担当者',
      width: '110px',
      editable: true,
    },
    {
      title: '部署',
      dataIndex: '部署',
      width: '100px',
      editable: true,
    },
    {
      title: '品番',
      dataIndex: '品番',
      width: '150px',
      editable: true,
    },
    {
      title: '品名',
      dataIndex: '品名',
      width: '150px',
      editable: true,
    },
    {
      title: '台数',
      dataIndex: '台数',
      width: '5%',
      editable: true,
    },
    {
      title: '見積日',
      dataIndex: '見積日',
      width: '120px',
      editable: true,
    },
    {
      title: '受注日',
      dataIndex: '受注日',
      width: '120px',
      editable: true,
    },
    {
      title: '希望納期',
      dataIndex: '希望納期',
      width: '120px',
      editable: true,
    },
    {
      title: '予定納期',
      dataIndex: '予定納期',
      width: '120px',
      editable: true,
    },
    {
      title: '出荷日',
      dataIndex: '出荷日',
      width: '120px',
      editable: true,
    },
    {
      title: '備考',
      dataIndex: '備考',
      width: '200px',
      editable: true,
    },
    {
      title: '削除',
      dataIndex: 'operation',
      width: '70px',
      align: 'center',
      render: (_, record: { key: React.Key }) =>
        dataSource.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
            <a>🗑️</a>
          </Popconfirm>
        ) : null,
    },
  ];

  const handleSave = (row: DataType) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  return (
    <>
      <div style={{ marginTop: 40 }}>
        <Search
          placeholder="Search in table"
          onSearch={value => setSearchText(value)}
          style={{ width: 200 }}
          enterButton
        />
      </div>
      
      <div style={{ width: '100%', overflowX: 'auto' }}>
        <Table
          rowClassName={() => styles.editableRow}
          tableLayout="fixed"
          style={{ marginTop: 20 }}
          components={components}
          bordered
          dataSource={filteredData} // ← フィルタリングされたデータを使用
          columns={columns as ColumnTypes}
          pagination={{ defaultPageSize: 50 }}
        />
      </div>
    </>
  );
};