  import React, { useState, useEffect } from 'react';
  import { Drawer, Form, Input, Row, Col, Divider, FloatButton, Switch, DatePicker } from 'antd';
  import { CheckOutlined, RollbackOutlined } from '@ant-design/icons';
  import { useOrderUpdater } from './hooks/useOrderUpdater';
  import { SelectDataCreate } from '../../components/SelectDataCreate/SelectDataCreate';
  import { SecondaryDrawer } from './SecondaryDrawer';
  import customParseFormat from 'dayjs/plugin/customParseFormat';
  import dayjs from 'dayjs';
  import { useRecoilValue } from 'recoil';
  import { selectedOrderAtom } from '@/recoil/selectedOrderAtom';
  import { InputNumber } from '@/components/InputNumber';
  import { formatOrderDates } from './utils/DayjsUtils';

  dayjs.extend(customParseFormat);
  const { TextArea } = Input;

  interface OrderEditDrawerProps {
    children: (showDrawer: () => void) => React.ReactNode;
    onUpdated: () => void;
  }

  export const OrderEditDrawer: React.FC<OrderEditDrawerProps> = ({ children, onUpdated }) => {
    const [visible, setVisible] = useState(false);
    const [secondaryDrawerVisible, setSecondaryDrawerVisible] = useState(false);
    const selectedOrder = useRecoilValue(selectedOrderAtom);

    const validateNumberInput = (value: string) => {
      const numberPattern = /^[0-9]+$/;
      return numberPattern.test(value) ?
             { validateStatus: 'success', errorMsg: null } :
             { validateStatus: 'error', errorMsg: '半角数値のみを入力してください' };
    };

    const openSecondaryDrawer = () => {
      setSecondaryDrawerVisible(true);
    };
    const closeSecondaryDrawer = () => {
      setSecondaryDrawerVisible(false);
    };

    const showDrawer = () => {
      setVisible(true);
    };
    const onClose = () => {
      form.resetFields();
      setIsAttention(false);
      setVisible(false);
    };

    const { form, handleUpdate, isAttention, setIsAttention } = useOrderUpdater(onClose, onUpdated, selectedOrder);

    const handleAttention = () => {
      setIsAttention((prevState: boolean) => !prevState);
    };

    //dayjsフォーマット
    useEffect(() => {
      if (selectedOrder) {
        const initialvalues = formatOrderDates(selectedOrder);
        form.setFieldsValue(initialvalues);
      }
    }, [form, selectedOrder]);
    //dayjsフォーマット
    const initialvalues = formatOrderDates(selectedOrder);

    const handleInvalidNumber = (value: string) => {
    };

    return (
      <>
        {children(showDrawer)}
        <Drawer
          title={
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {`受注番号　${selectedOrder?.prefix}${selectedOrder?.order_code}`}
              <Switch
                checkedChildren="重要"
                unCheckedChildren="普通"
                checked={isAttention}
                onChange={handleAttention}
              />
            </div>
          }
          width={800}
          onClose={onClose}
          open={visible}
          bodyStyle={{ paddingBottom: 40 }}
          destroyOnClose
        >
          <FloatButton.Group shape="circle" style={{ right: 24 }}>
            <FloatButton
              icon={<RollbackOutlined />}
              tooltip={<div>出戻登録</div>}
              onClick={openSecondaryDrawer}
            />
            <FloatButton
              icon={<CheckOutlined />}
              tooltip={<div>更新</div>}
              type="primary"
              onClick={handleUpdate}
            />
          </FloatButton.Group>

          <Form
            layout="vertical"
            form={form}
            initialValues={initialvalues}
            onValuesChange={form.getFieldValue('onValuesChange')}
          >
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item label="進捗" name="progress">
                  <SelectDataCreate
                    tableName="progress"
                    placeholder="進捗を選択"
                    value={form.getFieldValue('progress')}
                    onChange={value => form.setFieldsValue({ progress: value })}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="優先度" name="priority">
                  <SelectDataCreate
                    tableName="priority"
                    placeholder="優先度を選択"
                    value={form.getFieldValue('priority')}
                    onChange={value => form.setFieldsValue({ priority: value })}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="依頼内容" name="request">
                  <SelectDataCreate
                    tableName="request"
                    placeholder="依頼内容を選択"
                    value={form.getFieldValue('request')}
                    onChange={value => form.setFieldsValue({ request: value })}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Divider />
            <SecondaryDrawer visible={secondaryDrawerVisible} onClose={closeSecondaryDrawer} selectedOrder={selectedOrder} />
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item label="顧客" name="customer">
                  <SelectDataCreate
                    tableName="customer"
                    placeholder="顧客を選択"
                    value={form.getFieldValue('customer')}
                    onChange={value => form.setFieldsValue({ customer: value })}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="拠点" name="customer_location">
                  <Input placeholder="拠点を入力" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={8}>
                <Form.Item label="部署" name="customer_department">
                  <SelectDataCreate
                    tableName="customer_department"
                    placeholder="部署を選択"
                    value={form.getFieldValue('customer_department')}
                    onChange={value => form.setFieldsValue({ customer_department: value })}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="グループ" name="customer_group">
                  <Input placeholder="グループを入力" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="担当者" name="customer_person">
                  <Input placeholder="担当者を入力" addonAfter="様" />
                </Form.Item>
              </Col>
            </Row>
            <Divider />

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="品番" name="item_code">
                  <Input placeholder="品番を入力" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="品名" name="item_name">
                  <Input placeholder="品名を入力" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={8}>
                <Form.Item label="ロット/シリアル" name="lot">
                  <Input placeholder="ロットを入力" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="ソフトVer" name="soft">
                  <Input placeholder="ソフトVerを入力" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="台数" name="quantity">
                  <Input placeholder="台数を入力" />
                </Form.Item>
              </Col>
            </Row>
            <Divider />

            <Row gutter={16}>
              <Col span={6}>
                <Form.Item label="見積日" name="estimate_date">
                  <DatePicker style={{ width: '100%' }} />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item label="受注日" name="order_date">
                  <DatePicker style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="希望納期" name="desired_delivery_date">
                  <DatePicker style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="出荷日" name="shipment_date">
                  <DatePicker style={{ width: '100%' }} />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={6}>
                <Form.Item label="現品受領日" name="item_receive_date">
                  <DatePicker style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="現品返却日" name="item_return_date">
                  <DatePicker style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="資料送付日" name="send_document_date">
                  <DatePicker style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="資料受領日" name="receive_document_date">
                  <DatePicker style={{ width: '100%' }} />
                </Form.Item>
              </Col>
            </Row>
            <Divider />

            <Row gutter={16}>
              <Col span={8}>
                <Form.Item label="注文番号" name="customer_management_code">
                  <Input placeholder="注文番号を入力" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="見積No" name="estimate_code">
                  <Input placeholder="見積Noを入力" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="注文書No" name="order_form_code">
                  <Input placeholder="注文書Noを入力" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="検収日" name="accept_date">
                  <DatePicker style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="金額"
                  name="amount"
                  style={{ width: '100%' }}
                  rules={[
                    {
                      validator: (_, value) => {
                        const { validateStatus, errorMsg } = validateNumberInput(value);
                        if (validateStatus === 'error') {
                          return Promise.reject(errorMsg);
                        }
                        return Promise.resolve();
                      }
                    }
                  ]}
                >
                <InputNumber
                    value={selectedOrder?.amount || 0}
                    onChange={(value) => form.setFieldsValue({ amount: value })}
                    onInvalidNumber={handleInvalidNumber}
                  />
              </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="備考" name="comment">
                  <TextArea rows={4} placeholder="備考を入力" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="営業備考" name="remark">
                  <TextArea rows={4} placeholder="備考を入力" />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Drawer>
      </>
    );
  };
