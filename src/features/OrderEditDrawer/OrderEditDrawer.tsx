  import React, { useState, useEffect } from 'react';
  import { Drawer, Form, Input, Row, Col, Divider, FloatButton, Switch } from 'antd';
  import { CheckOutlined, RollbackOutlined } from '@ant-design/icons';
  import { useOrderUpdater } from './hooks/useOrderUpdater';
  import { CustomDatePicker } from './CustomDatePicker';
  import { useOrderEffect } from './hooks/useOrderEffect';
  import { SelectDataCreate } from '../../components/SelectDataCreate/SelectDataCreate';
  import { SecondaryDrawer } from './SecondaryDrawer';
  import customParseFormat from 'dayjs/plugin/customParseFormat';
  import dayjs from 'dayjs';
  import { useRecoilValue } from 'recoil';
  import { selectedOrderAtom } from '@/recoil/selectedOrderAtom';

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

    const { form, dates, setDates, handleUpdate, isAttention, setIsAttention } = useOrderUpdater(onClose, onUpdated, selectedOrder);

    const handleAttention = () => {
      setIsAttention((prevState: boolean) => !prevState);
    };

    useOrderEffect(selectedOrder, setIsAttention, setDates);

    useEffect(() => {
      if (selectedOrder) {
        form.setFieldsValue(selectedOrder);
      }
    }, [form, selectedOrder]);

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

          <Form layout="vertical" form={form} initialValues={selectedOrder}>
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
                  <Input placeholder="担当者を入力" />
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
                <Form.Item label="ロット" name="lot">
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
                <CustomDatePicker
                  label="見積日"
                  value={dates.estimate_date}
                  onChange={(value) => setDates(prev => ({ ...prev, estimate_date: value }))}
                />
              </Col>
              <Col span={6}>
                <CustomDatePicker
                  label="受注日"
                  value={dates.order_date}
                  onChange={(value) => setDates(prev => ({ ...prev, order_date: value }))}
                />
              </Col>
              <Col span={6}>
                <CustomDatePicker
                  label="希望納期"
                  value={dates.desired_delivery_date}
                  onChange={(value) => setDates(prev => ({ ...prev, desired_delivery_date: value }))}
                />
              </Col>
              <Col span={6}>
                <CustomDatePicker
                  label="出荷日"
                  value={dates.shipment_date}
                  onChange={(value) => setDates(prev => ({ ...prev, shipment_date: value }))}
                />
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={6}>
                <CustomDatePicker
                  label="現品受領日"
                  value={dates.item_receive_date}
                  onChange={(value) => setDates(prev => ({ ...prev, item_receive_date: value }))}
                />
              </Col>
              <Col span={6}>
                <CustomDatePicker
                  label="現品返却日"
                  value={dates.item_return_date}
                  onChange={(value) => setDates(prev => ({ ...prev, item_return_date: value }))}
                />
              </Col>
              <Col span={6}>
                <CustomDatePicker
                  label="資料送付日"
                  value={dates.send_document_date}
                  onChange={(value) => setDates(prev => ({ ...prev, send_document_date: value }))}
                />
              </Col>
              <Col span={6}>
                <CustomDatePicker
                  label="資料受領日"
                  value={dates.receive_document_date}
                  onChange={(value) => setDates(prev => ({ ...prev, receive_document_date: value }))}
                />
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
                <CustomDatePicker
                  label="検収日"
                  value={dates.accept_date}
                  onChange={(value) => setDates(prev => ({ ...prev, accept_date: value }))}
                />
              </Col>
              <Col span={12}>
                <Form.Item label="金額" name="amount">
                  <Input placeholder="金額を入力" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="備考" name="comment">
                  <TextArea rows={3} placeholder="備考を入力" />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Drawer>
      </>
    );
  };
