import React from 'react';
import { Drawer, Form, Input, Row, Col, Button, DatePicker, message, FloatButton } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { useRegisterReturn } from './hooks/useRegisterReturn';
import { ExistingDataList } from './ExistingDataList';
import { ReturnData, ExistingData, SecondaryDrawerProps } from './types/types';

export const SecondaryDrawer: React.FC<SecondaryDrawerProps> = ({ visible, onClose }) => {
  const [form] = Form.useForm();
  const { addNewReturn, fetchExistingReturn, selectedOrder } = useRegisterReturn();
  const [existingData, setExistingData] = React.useState<ExistingData[] | null>(null);

  React.useEffect(() => {
    if (visible && selectedOrder?.id) {
      (async () => {
        const data = await fetchExistingReturn(String(selectedOrder.id));
        setExistingData(data);
      })();
    }
  }, [visible, fetchExistingReturn, selectedOrder?.id]);

  const handleRegister = async () => {
    try {
      const values = await form.validateFields();
      const returnData: ReturnData = {
        return_date: values.return_date.format('YYYY-MM-DD'),
        reshipment_date: values.reshipment_date ? values.reshipment_date.format('YYYY-MM-DD') : null,
        remark: values.comment,
      };

      await addNewReturn(returnData);
      message.success('登録に成功しました！');
      onClose();
    } catch (error) {
      console.error('Error registering return:', error);
      message.error(`登録に失敗しました。出戻り日は必須です。`);
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
      {existingData && existingData.length > 0 ? (
        <ExistingDataList data={existingData} onAddNew={() => setExistingData(null)} onClose={onClose} />
      ) : (
        <Form layout="vertical" form={form}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="出戻り日" name="return_date" initialValue={dayjs()}>
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
          <FloatButton
            icon={<CheckOutlined />}
            type="primary"
            tooltip={<div>登録</div>}
            style={{ right: 24 }}
            onClick={handleRegister}
          />
        </Form>
      )}
    </Drawer>
  );
};
