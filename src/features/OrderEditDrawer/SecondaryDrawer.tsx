import React from 'react';
import { Drawer, Form, Input, Row, Col, Button, DatePicker, message } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';
import dayjs from 'dayjs';
import { useRegisterReturn } from './hooks/useRegisterReturn';

interface SecondaryDrawerProps {
  visible: boolean;
  onClose: () => void;
}

export const SecondaryDrawer: React.FC<SecondaryDrawerProps> = ({ visible, onClose }) => {
  const [form] = Form.useForm();
  const { registerReturn } = useRegisterReturn();

  const handleRegister = async () => {
    try {
      const values = await form.validateFields();
      await registerReturn({
        return_date: values.return_date.format('YYYY-MM-DD'),
        reshipment_date: values.reshipment_date.format('YYYY-MM-DD'),
        remark: values.comment,
      });
      message.success('登録に成功しました！');
      onClose();
    } catch (error) {
      console.error('Error registering return:', error);
      message.error('登録に失敗しました。出戻り日は必須です。');
    }
  };

  return (
    <Drawer
      title={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          出戻り登録の詳細
          <Button onClick={onClose}>
            キャンセル
          </Button>
        </div>
      }
      width={600}
      onClose={onClose}
      open={visible}
      destroyOnClose
    >
      <Form layout="vertical" form={form}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="出戻日" name="return_date" initialValue={dayjs()}>
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
      <FloatButton
        icon={<CheckOutlined />}
        type="primary"
        tooltip={<div>登録</div>}
        style={{ right: 24 }}
        onClick={handleRegister}
      />
    </Drawer>
  );
};
