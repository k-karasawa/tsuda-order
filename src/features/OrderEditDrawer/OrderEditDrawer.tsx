import React, { useState } from 'react';
import { Drawer, Form, Input, DatePicker, Row, Col, Divider, FloatButton } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import type { OrderListDataType } from '@/types/types';

interface OrderEditDrawerProps {
  selectedOrder?: OrderListDataType;
  children: (showDrawer: () => void) => React.ReactNode;
}

const { TextArea } = Input;

export const OrderEditDrawer: React.FC<OrderEditDrawerProps> = ({ children, selectedOrder }) => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  console.log(selectedOrder)

  return (
    <>
      {children(showDrawer)}
      <Drawer
        title="Edit Order"
        width={800}
        onClose={onClose}
        open={visible}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <FloatButton icon={<CheckOutlined />} tooltip={<div>更新</div>} type="primary" style={{ right: 20 }} />
        <Form layout="vertical" initialValues={selectedOrder}>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="進捗" name="progress_name">
                <Input placeholder="進捗を入力" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="優先度" name="priority_level">
                <Input placeholder="優先度を入力" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="依頼内容" name="request_name">
                <Input placeholder="依頼内容を入力" />
              </Form.Item>
            </Col>
          </Row>
          <Divider />

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="顧客" name="customer_name">
                <Input placeholder="顧客を入力" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="拠点" name="customer_location">
                <Input placeholder="拠点を入力" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="部署" name="customer_department_name">
                <Input placeholder="部署を入力" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="グループ" name="customer_group">
                <Input placeholder="グループを入力" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="担当者" name="customer_person">
                <Input placeholder="担当者を入力" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="商社" name="farm_name">
                <Input placeholder="商社を入力" />
              </Form.Item>
            </Col>
          </Row>
          <Divider />

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="品番" name="item_code">
                <Input placeholder="品番を入力" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="品名" name="item_name">
                <Input placeholder="品名を入力" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="ロット" name="lot">
                <Input placeholder="ロットを入力" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="ソフトVer" name="soft">
                <Input placeholder="ソフトVerを入力" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="台数" name="quantity">
                <Input placeholder="台数を入力" />
              </Form.Item>
            </Col>
          </Row>
          <Divider />

          <Row gutter={16}>
            <Col span={6}>
              <Form.Item label="見積日">
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="受注日">
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="希望納期">
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="出荷日">
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={6}>
              <Form.Item label="現品受領日">
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="現品返却日">
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="資料送付日">
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="資料受領日">
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
          <Divider />

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="注文番号" name="customer_management_code">
                <Input placeholder="注文番号を入力" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="見積No" name="estimate_code">
                <Input placeholder="見積Noを入力" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="注文書No" name="order_form_code">
                <Input placeholder="注文書Noを入力" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="検収日">
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="金額" name="amount">
                <Input placeholder="金額を入力" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="備考" name="comment">
                <TextArea rows={3} placeholder="備考を入力" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};
