import React from 'react';
import { Form, Input, Select, DatePicker, Row, Col, Divider, FloatButton } from 'antd';
import { FileAddOutlined } from '@ant-design/icons';
import styles from './styles/RegistrationForm.module.css';

const { Option } = Select;
const { TextArea } = Input;

export const AddOrderForm: React.FC = () => {
  return (
    <>
      <FloatButton
        icon={<FileAddOutlined />}
        tooltip={<div>新規登録</div>}
        type="primary"
      />
      <Form layout="vertical" className={styles.container}>
        <Row gutter={16}>
          <Col span={7}>
            <Form.Item
              label="依頼内容"
              rules={[{ required: true, message: '依頼内容は必須です' }]}
            >
              <Select placeholder="依頼内容を選択">
                <Option value="request1">Request 1</Option>
                <Option value="request2">Request 2</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item
              label="商社"
              rules={[{ required: true, message: '商社は必須です' }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Divider orientation="right" plain>
          顧客情報
        </Divider>


        <Row gutter={16}>
          <Col span={7}>
            <Form.Item
              label="顧客"
              rules={[{ required: true, message: '顧客は必須です' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item label="拠点">
              <Select placeholder="拠点を選択">
                <Option value="base1">Base 1</Option>
                <Option value="base2">Base 2</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={7}>
            <Form.Item label="部署">
              <Select placeholder="部署を選択">
                <Option value="department1">Department 1</Option>
                <Option value="department2">Department 2</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item label="グループ">
              <Select placeholder="グループを選択">
                <Option value="group1">Group 1</Option>
                <Option value="group2">Group 2</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item
              label="顧客担当者"
              rules={[{ required: true, message: '顧客担当者は必須です' }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Divider orientation="right" plain>
          製品情報
        </Divider>

        <Row gutter={16}>
          <Col span={7}>
            <Form.Item label="品番">
              <Input />
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item
              label="品名"
              rules={[{ required: true, message: '品名は必須です' }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={7}>
            <Form.Item label="ロット/シリアル">
              <Input />
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item label="ソフトVer,">
              <Input />
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item label="台数">
              <Input type='number'/>
            </Form.Item>
          </Col>
        </Row>
        <Divider orientation="right" plain>
          日付情報
        </Divider>

        <Row gutter={16}>
          <Col span={6}>
            <Form.Item label="見積日">
              <DatePicker style={{ width: '90%' }}/>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="受注日">
              <DatePicker style={{ width: '90%' }}/>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="希望納期">
              <DatePicker style={{ width: '90%' }}/>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="出荷日">
              <DatePicker style={{ width: '90%' }}/>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={6}>
            <Form.Item label="現品受領日">
              <DatePicker style={{ width: '90%' }}/>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="現品返却日">
              <DatePicker style={{ width: '90%' }}/>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="資料送付日">
              <DatePicker style={{ width: '90%' }}/>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="資料受領日">
              <DatePicker style={{ width: '90%' }}/>
            </Form.Item>
          </Col>
        </Row>
        <Divider orientation="right" plain>
          注文情報
        </Divider>

        <Row gutter={16}>
          <Col span={7}>
            <Form.Item label="注文番号">
              <Input />
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item label="見積No">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={7}>
            <Form.Item label="注文書No">
              <Input />
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item label="金額">
              <Input />
            </Form.Item>
          </Col>
        </Row>


        <Form.Item label="備考">
          <TextArea rows={4} placeholder="備考を入力" />
        </Form.Item>
      </Form>
    </>
  );
};
