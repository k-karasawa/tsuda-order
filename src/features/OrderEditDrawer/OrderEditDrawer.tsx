import React, { useState } from 'react';
import { Drawer, Form, Input, DatePicker, Row, Col, Divider, FloatButton } from 'antd';
import { CheckOutlined } from '@ant-design/icons';

interface OrderEditDrawerProps {
  children: (showDrawer: () => void) => React.ReactNode;
}

const { TextArea } = Input;

export const OrderEditDrawer: React.FC<OrderEditDrawerProps> = ({ children }) => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

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
        <Form layout="vertical">
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="進捗">
                <Input placeholder="進捗を入力" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="優先度">
                <Input placeholder="優先度を入力" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="依頼内容">
                <Input placeholder="依頼内容を入力" />
              </Form.Item>
            </Col>
          </Row>
          <Divider />

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="顧客">
                <Input placeholder="顧客を入力" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="拠点">
                <Input placeholder="拠点を入力" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="部署">
                <Input placeholder="部署を入力" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="グループ">
                <Input placeholder="グループを入力" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="担当者">
                <Input placeholder="担当者を入力" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="商社">
                <Input placeholder="商社を入力" />
              </Form.Item>
            </Col>
          </Row>
          <Divider />

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="品番">
                <Input placeholder="品番を入力" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="品名">
                <Input placeholder="品名を入力" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="ロット">
                <Input placeholder="ロットを入力" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="ソフトVer">
                <Input placeholder="ソフトVerを入力" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="台数">
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
              <Form.Item label="注文番号">
                <Input placeholder="注文番号を入力" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="見積No">
                <Input placeholder="見積Noを入力" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="注文書No">
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
              <Form.Item label="金額">
                <Input placeholder="金額を入力" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="備考">
                <TextArea rows={3} placeholder="備考を入力" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};
