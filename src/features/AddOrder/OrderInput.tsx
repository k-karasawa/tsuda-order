import React from 'react';
import { Form, Input, Row, Col } from 'antd';

const { TextArea } = Input;

type OrderInfoProps = {
  formRef: React.RefObject<any>;
};

export const OrderInput: React.FC<OrderInfoProps> = ({ formRef }) => {
  return (
    <div>
      <Row gutter={16}>
        <Col span={7}>
          <Form.Item label="注文番号" name="customer_management_code">
            <Input />
          </Form.Item>
        </Col>
        <Col span={7}>
          <Form.Item label="見積No" name="estimate_code">
            <Input placeholder="見積Noを入力" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={7}>
          <Form.Item label="注文書No" name="order_form_code">
            <Input placeholder="注文書Noを入力" />
          </Form.Item>
        </Col>
        <Col span={7}>
          <Form.Item
            label="金額"
            name="amount"
            rules={[
              {
                pattern: /^[0-9]*$/,
                message: '数字のみを入力してください。',
              },
            ]}
          >
            <Input placeholder='半角数字のみを入力してください' />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={12}>
          <Form.Item label="現場備考" name="comment">
            <TextArea rows={4} placeholder="備考を入力" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label="営業備考" name="remark">
            <TextArea rows={4} placeholder="備考を入力" />
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
};
