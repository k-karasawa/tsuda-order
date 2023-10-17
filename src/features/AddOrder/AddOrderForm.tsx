import React, { useState, useRef } from 'react';
import { Form, Input, DatePicker, Row, Col, Divider, FloatButton, message, Modal } from 'antd';
import { FileAddOutlined } from '@ant-design/icons';
import styles from './styles/RegistrationForm.module.css';
import { SelectDataCreate } from '../../components/SelectDataCreate/SelectDataCreate';
import { supabase } from '@/../utils/supabase';
import dayjs from 'dayjs';
import { useRouter } from "next/router";
import { formatAmount } from '@/helper/formatAmountHelper';
import { GenerateOrderNumber } from './GenerateOrderNumber';

const { TextArea } = Input;

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

  const handleSubmit = async () => {
    const sanitizedData = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => {
        if (key.includes('date') && dayjs.isDayjs(value)) {
          return [key, formatDate(value as dayjs.Dayjs)];
        }
        if (key === 'amount' && value !== null && value !== undefined) {
          return [key, formatAmount(value.toString())];
        }
        return [key, value === undefined ? null : value];
      })
    );

    sanitizedData.order_code = orderCode;
    sanitizedData.prefix = orderPrefix;
    sanitizedData.progress = '0';

    const { data, error } = await supabase
      .from('order_list')
      .insert([sanitizedData]);

    if (error) {
      message.error('受注登録が失敗しました。' + (error.message || '詳細不明のエラー'));
    } else {
      formRef.current.resetFields();
      Modal.confirm({
        title: `『${orderPrefix}${orderCode}』として新規受注登録が完了しました。`,
        content: '続けて受注を登録しますか？',
        okText: '続ける',
        cancelText: '終了する',
        onOk() {
        },
        onCancel() {
          router.push('/order-list');
        }
      });
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
          tooltip={<div>更新</div>}
          type="primary"
          onClick={handleSubmit}
        />

      <Form
        layout="vertical"
        className={styles.container}
        onFinish={handleSubmit}
        onValuesChange={handleValuesChange}
        ref={formRef}
      >
        <Row gutter={16}>
          <Col span={7}>
            <Form.Item
              label="依頼内容"
              name="request"
              rules={[{ required: true, message: '依頼内容を選択してください' }]}
            >
              <SelectDataCreate tableName="request" placeholder="依頼内容を選択"/>
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item label="商社" name="farm" required>
              <SelectDataCreate
                  tableName="farm"
                  placeholder="商社を選択"
                  onChange={handleFarmChange}
              />
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item name="priority" label="優先度" required >
              <SelectDataCreate
                tableName="priority"
                placeholder="優先度を選択"
              />
            </Form.Item>
          </Col>
        </Row>
        <Divider orientation="right" plain>
          顧客情報
        </Divider>

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
                  <Input />
              </Form.Item>
          </Col>
        </Row>
        <Divider orientation="right" plain>
            製品情報
        </Divider>

        <Row gutter={16}>
          <Col span={7}>
            <Form.Item label="品番" name="item_code">
              <Input />
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item label="品名" name="item_name" >
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
        <Divider orientation="right" plain>
            日付情報
        </Divider>

        <Row gutter={16}>
          <Col span={6}>
            <Form.Item label="見積日" name="estimate_date">
              <DatePicker
                style={{ width: '90%' }}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="受注日" name="order_date">
              <DatePicker
                style={{ width: '90%' }}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="希望納期" name="desired_delivery_date">
              <DatePicker
                style={{ width: '90%' }}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="出荷日" name="shipment_date">
              <DatePicker
                style={{ width: '90%' }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={6}>
            <Form.Item label="現品受領日" name="item_receive_date">
              <DatePicker
                style={{ width: '90%' }}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="現品返却日" name="item_return_date">
              <DatePicker
                style={{ width: '90%' }}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="資料送付日" name="send_document_date">
              <DatePicker
                style={{ width: '90%' }}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="資料受領日" name="receive_document_date">
              <DatePicker
                style={{ width: '90%' }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Divider orientation="right" plain>
            注文情報
        </Divider>

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
            >
              <Input placeholder='数字で入力してください'/>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="備考" name="comment">
            <TextArea rows={4} placeholder="備考を入力" />
        </Form.Item>
      </Form>
      <GenerateOrderNumber
        farmId={farmId}
        setOrderCode={setOrderCode}
        setOrderPrefix={setOrderPrefix}
      />
    </>
  );
};
