import React from 'react';
import { Form, DatePicker, Row, Col } from 'antd';
import dayjs from 'dayjs';

type DateInfoProps = {
  form: any;
};

export const DateInput: React.FC<DateInfoProps> = ({ form }) => {
  return (
    <div>
      <Row gutter={16}>
        <Col span={6}>
          <Form.Item label="見積日" name="estimate_date">
            <DatePicker
              format={{
                format: 'YYYY-MM-DD',
                type: 'mask',
              }}
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="受注日" name="order_date">
            <DatePicker
              format={{
                format: 'YYYY-MM-DD',
                type: 'mask',
              }}
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="希望納期" name="desired_delivery_date">
            <DatePicker
              format={{
                format: 'YYYY-MM-DD',
                type: 'mask',
              }}
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="出荷日" name="shipment_date">
            <DatePicker
              format={{
                format: 'YYYY-MM-DD',
                type: 'mask',
              }}
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={6}>
          <Form.Item label="現品受領日" name="item_receive_date">
            <DatePicker
              format={{
                format: 'YYYY-MM-DD',
                type: 'mask',
              }}
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="現品返却日" name="item_return_date">
            <DatePicker
              format={{
                format: 'YYYY-MM-DD',
                type: 'mask',
              }}
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="資料送付日" name="send_document_date">
            <DatePicker
              format={{
                format: 'YYYY-MM-DD',
                type: 'mask',
              }}
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="資料受領日" name="receive_document_date">
            <DatePicker
              format={{
                format: 'YYYY-MM-DD',
                type: 'mask',
              }}
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
};
