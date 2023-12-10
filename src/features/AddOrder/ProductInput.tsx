// ProductInfo.tsx
import React from 'react';
import { Row, Col, Form, Input } from 'antd';

export const ProductInput: React.FC = () => {
  return (
    <div>
      <Row gutter={16}>
        <Col span={7}>
          <Form.Item label="品番" name="item_code">
            <Input />
          </Form.Item>
        </Col>
        <Col span={7}>
          <Form.Item label="品名" name="item_name">
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={7}>
          <Form.Item label="ロット/シリアル" name="lot">
            <Input />
          </Form.Item>
        </Col>
        <Col span={7}>
          <Form.Item label="ソフトVer," name="soft">
            <Input />
          </Form.Item>
        </Col>
        <Col span={7}>
          <Form.Item label="台数" name="quantity">
            <Input type='number' />
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
};
