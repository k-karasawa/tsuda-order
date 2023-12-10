import React from 'react';
import { Row, Col, Form, Input } from 'antd';
import { SelectDataCreate } from '../../components/SelectDataCreate/SelectDataCreate';

export const CustomerInput: React.FC = () => {
  return (
    <div>
      <Row gutter={16}>
        <Col span={7}>
          <Form.Item label="顧客" name="customer" required >
            <SelectDataCreate
              tableName="customer"
              placeholder="顧客を選択"
            />
          </Form.Item>
        </Col>
        <Col span={7}>
          <Form.Item label="拠点" name="customer_location">
            <Input />
          </Form.Item>
        </Col>
        <Col span={7}>
          <Form.Item name="customer_department" label="部署">
            <SelectDataCreate
              tableName="customer_department"
              placeholder="部署を選択"
            />
          </Form.Item>
        </Col>
        <Col span={7}>
          <Form.Item label="グループ" name="customer_group">
            <Input />
          </Form.Item>
        </Col>
        <Col span={7}>
          <Form.Item label="顧客担当者" name="customer_person">
            <Input addonAfter="様" />
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
};
