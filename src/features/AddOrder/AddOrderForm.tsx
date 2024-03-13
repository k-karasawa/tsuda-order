import React, { useState, useRef } from 'react'
import { Form, Row, Col, Divider, FloatButton, message, Modal, Button } from 'antd'
import { FileAddOutlined } from '@ant-design/icons'
import styles from './styles/RegistrationForm.module.css'
import { SelectDataCreate } from '../../components/SelectDataCreate/SelectDataCreate'
import { useSupabaseClient } from '@/hooks';
import dayjs from 'dayjs'
import { useRouter } from "next/router"
import { GenerateOrderNumber } from './GenerateOrderNumber'
import { CustomerInput } from './CustomerInput'
import { ProductInput } from './ProductInput'
import { DateInput } from './DateInput'
import { OrderInput } from './OrderInput'

type FormData = {
  [key: string]: string | number | dayjs.Dayjs | null;
};

export const AddOrderForm: React.FC = () => {
  const [farmId, setFarmId] = useState<string | number | null>(null);
  const [orderCode, setOrderCode] = useState<string>('');
  const [orderPrefix, setOrderPrefix] = useState<string>('');
  const [formData, setFormData] = useState<FormData>({});
  const formRef = useRef<any>(null);
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const supabase = useSupabaseClient();

  const handleValuesChange = (changedValues: any, allValues: any) => {
    const updatedValues = {...allValues};

    Object.keys(updatedValues).forEach(key => {
      if (key.includes('date') && dayjs.isDayjs(updatedValues[key])) {
        updatedValues[key] = formatDate(updatedValues[key] as dayjs.Dayjs);
      }
    });

    setFormData(updatedValues);
  };

  const formatDate = (dateObj: dayjs.Dayjs | null): string | null => {
    if (dateObj && dayjs.isDayjs(dateObj)) {
        return dateObj.format('YYYY-MM-DD');
    }
    return dateObj;
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    setOrderCode((prevOrderCode) => (parseInt(prevOrderCode) + 1).toString());
  };

  const handleClearAndContinue = () => {
    formRef.current.resetFields();
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    router.push('/order-list');
    setIsModalVisible(false);
  };

  const handleSubmit = async () => {
    const entries = Object.entries(formData).map(([key, value]) => {
      if (dayjs.isDayjs(value)) {
        return [key, value.format('YYYY-MM-DD')];
      }
      return [key, value];
    });

    const sanitizedData = {
      ...Object.fromEntries(entries),
      customer: parseInt(formData.customer as string),
      order_code: orderCode,
      prefix: orderPrefix,
      progress: parseInt(formData.progress as string),
      request: parseInt(formData.request as string),
      status_updated_at: dayjs().format('YYYY-MM-DD'),
    };

    const { data, error } = await supabase
      .from('order_list')
      .insert([sanitizedData]);

    if (error) {
      message.error('受注登録が失敗しました。' + (error.message || '詳細不明のエラー'));
    } else {
      showModal();
    }
  };

  const handleFarmChange = (selectedFarmId: string | number) => {
    const newFarmId = `${selectedFarmId}_${Date.now()}`;
    setFarmId(newFarmId);
  };

  return (
    <>
      <FloatButton
        icon={<FileAddOutlined />}
        tooltip={<div>追加</div>}
        type="primary"
        onClick={handleSubmit}
      />

      <Form
        layout="vertical"
        className={styles.container}
        onFinish={handleSubmit}
        onValuesChange={handleValuesChange}
        ref={formRef}
        initialValues={{ quantity: 1, priority: 2, progress: 0 }}
      >
        <Row gutter={16}>
          <Col span={5}>
            <Form.Item
              label="依頼内容"
              name="request"
              rules={[{ required: true, message: '依頼内容を選択してください' }]}
            >
              <SelectDataCreate tableName="request" placeholder="依頼内容を選択"/>
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item label="商社" name="farm" required>
              <SelectDataCreate
                  tableName="farm"
                  placeholder="商社を選択"
                  onChange={handleFarmChange}
              />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item name="priority" label="優先度" required >
              <SelectDataCreate
                tableName="priority"
                placeholder="優先度を選択"
              />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item name="progress" label="進捗" required >
              <SelectDataCreate
                tableName="progress"
                placeholder="進捗を選択"
              />
            </Form.Item>
          </Col>
        </Row>

        <Divider orientation="right" plain>顧客情報</Divider>

        <CustomerInput />

        <Divider orientation="right" plain>製品情報</Divider>

        <ProductInput />

        <Divider orientation="right" plain>日付情報</Divider>

        <DateInput form={formRef.current} />

        <Divider orientation="right" plain>注文情報</Divider>

        <OrderInput formRef={formRef} />
      </Form>

      <GenerateOrderNumber
        farmId={farmId}
        setOrderCode={setOrderCode}
        setOrderPrefix={setOrderPrefix}
      />
      <Modal
        title={`『${orderPrefix}${orderCode}』として新規受注登録が完了しました。`}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="continue" type="primary" onClick={handleOk}>
            同じ情報で続ける
          </Button>,
          <Button key="clear" onClick={handleClearAndContinue}>
            クリアして続ける
          </Button>,
          <Button key="cancel" onClick={handleCancel}>
            終了する
          </Button>,
        ]}
      >
        同じ情報で続けて案件を登録しますか？
      </Modal>
    </>
  );
};
