import React from 'react';
import { Drawer, Form, Input, Row, Col, Button, DatePicker } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';
import moment from 'moment';

interface SecondaryDrawerProps {
  visible: boolean;
  onClose: () => void;
}

export const SecondaryDrawer: React.FC<SecondaryDrawerProps> = ({ visible, onClose }) => {
  const [form] = Form.useForm();

  return (
    <Drawer
      title={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          出戻登録の詳細
          <Button onClick={onClose}>
            キャンセル
          </Button>
        </div>
      }
      width={600}
      onClose={onClose}
      visible={visible}
      destroyOnClose
    >
      <Form layout="vertical" form={form}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="出戻日" name="return_date" initialValue={moment()}>
              <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="再出荷日" name="reshipment_date">
              <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="備考" name="comment">
              <Input.TextArea rows={5} placeholder="出戻りの経緯や理由を記入"/>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <FloatButton icon={<CheckOutlined />} type="primary" style={{ right: 24 }} />
    </Drawer>
  );
};
