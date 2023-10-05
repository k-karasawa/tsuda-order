import React from 'react';
import { Form, Input, Select, DatePicker, Button } from 'antd';
import styles from './styles/RegistrationForm.module.css';

const { Option } = Select;
const { TextArea } = Input;

export const AddOrderForm: React.FC = () => {
  return (
    <Form layout="vertical" className={styles.registrationform}>

      <Form.Item label="受注No">
        <Input disabled value="自動採番"/>
      </Form.Item>

      <Form.Item
        label="依頼内容"
        rules={[{ required: true, message: '依頼内容は必須です' }]}
      >
        <Select placeholder="依頼内容を選択">
          <Option value="option1">修理</Option>
          <Option value="option2">OH</Option>
          <Option value="option3">検査</Option>
          <Option value="option4">販売</Option>
        </Select>
      </Form.Item>

      <div className={styles.horizontalContainer}>
        <Form.Item
          label="ユーザー"
          rules={[{ required: true, message: 'ユーザーは必須です' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="顧客担当者"
          rules={[{ required: true, message: '顧客担当者は必須です' }]}
        >
          <Input />
        </Form.Item>
      </div>

      <div className={styles.horizontalContainer}>
        <Form.Item label="拠点">
          <Select placeholder="拠点を選択">
            <Option value="base1">Base 1</Option>
            <Option value="base2">Base 2</Option>
          </Select>
        </Form.Item>

        <Form.Item label="部署">
          <Select placeholder="部署を選択">
            <Option value="department1">Department 1</Option>
            <Option value="department2">Department 2</Option>
          </Select>
        </Form.Item>

        <Form.Item label="グループ">
          <Select placeholder="グループを選択">
            <Option value="group1">Group 1</Option>
            <Option value="group2">Group 2</Option>
          </Select>
        </Form.Item>
      </div>

      <div className={styles.horizontalContainer}>
        <Form.Item
          label="品名"
          rules={[{ required: true, message: '品名は必須です' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="品番">
          <Input />
        </Form.Item>

        <Form.Item label="台数">
          <Input />
        </Form.Item>
      </div>

      <div className={styles.horizontalContainer}>
        <Form.Item label="見積日時">
          <DatePicker />
        </Form.Item>

        <Form.Item label="希望納期">
          <DatePicker />
        </Form.Item>

        <Form.Item label="受注日">
          <DatePicker />
        </Form.Item>

        <Form.Item label="予定納期">
          <DatePicker />
        </Form.Item>
      </div>

      <div className={styles.horizontalContainer}>
        <Form.Item label="注文番号">
          <Input />
        </Form.Item>

        <Form.Item label="見積No">
          <Input />
        </Form.Item>

        <Form.Item label="注文書No">
          <Input />
        </Form.Item>

        <Form.Item label="受注金額">
          <Input />
        </Form.Item>
      </div>

      <Form.Item label="備考">
        <TextArea/>
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className={styles.submitButton}
        >
          登録
        </Button>
      </Form.Item>
    </Form>
  );
};
