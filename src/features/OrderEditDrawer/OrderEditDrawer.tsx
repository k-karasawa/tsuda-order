import React, { useState, useEffect } from 'react';
import { Drawer, Form, Input, DatePicker, Row, Col, Divider, FloatButton, Switch } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import type { OrderListDataType } from '@/types/types';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useOrderUpdater } from './hooks/useOrderUpdater';

dayjs.extend(customParseFormat);
const { TextArea } = Input;

interface OrderEditDrawerProps {
  selectedOrder?: OrderListDataType;
  children: (showDrawer: () => void) => React.ReactNode;
  onUpdated: () => void;
}

export const OrderEditDrawer: React.FC<OrderEditDrawerProps> = ({ children, selectedOrder, onUpdated }) => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  const { form, dates, setDates, handleUpdate, isAttention, setIsAttention } = useOrderUpdater(onClose, onUpdated, selectedOrder);

  const handleAttention = () => {
    setIsAttention((prevState: boolean) => !prevState);
  };

  useEffect(() => {
    setIsAttention(!!selectedOrder?.attention);
    if (selectedOrder) {
      setDates({
        estimate_date: selectedOrder.estimate_date || null,
        order_date: selectedOrder.order_date || null,
        desired_delivery_date: selectedOrder.desired_delivery_date || null,
        shipment_date: selectedOrder.shipment_date || null,
        item_receive_date: selectedOrder.item_receive_date || null,
        item_return_date: selectedOrder.item_return_date || null,
        send_document_date: selectedOrder.send_document_date || null,
        receive_document_date: selectedOrder.receive_document_date || null,
        accept_date: selectedOrder.accept_date || null,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOrder]);


  return (
    <>
      {children(showDrawer)}
      <Drawer
        title={
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {`受注番号 ${selectedOrder?.order_code}`}
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
      >
        <FloatButton
          icon={<CheckOutlined />}
          tooltip={<div>更新</div>}
          type="primary"
          onClick={handleUpdate}
        />

        <Form layout="vertical" form={form} initialValues={selectedOrder}>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="進捗" name="progress_name">
                <Input placeholder="進捗を入力" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="優先度" name="priority_level">
                <Input placeholder="優先度を入力" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="依頼内容" name="request_name">
                <Input placeholder="依頼内容を入力" />
              </Form.Item>
            </Col>
          </Row>
          <Divider />

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="顧客" name="customer_name">
                <Input placeholder="顧客を入力" />
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
              <Form.Item label="部署" name="customer_department_name">
                <Input placeholder="部署を入力" />
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

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="商社" name="farm_name">
                <Input placeholder="商社を入力" />
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
              <Form.Item label="見積日">
                <DatePicker
                  value={dates.estimate_date ? dayjs(dates.estimate_date) : undefined}
                  style={{ width: '100%' }}
                  onChange={(date) => setDates(prev => ({ ...prev, estimate_date: date ? date.format("YYYY-MM-DD") : null }))}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="受注日">
                <DatePicker
                  value={dates.order_date ? dayjs(dates.order_date) : undefined}
                  style={{ width: '100%' }}
                  onChange={(date) => setDates(prev => ({ ...prev, order_date: date ? date.format("YYYY-MM-DD") : null }))}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="希望納期">
                <DatePicker
                  value={dates.desired_delivery_date ? dayjs(dates.desired_delivery_date) : undefined}
                  style={{ width: '100%' }}
                  onChange={(date) => setDates(prev => ({ ...prev, desired_delivery_date: date ? date.format("YYYY-MM-DD") : null }))}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="出荷日">
                <DatePicker
                  value={dates.shipment_date ? dayjs(dates.shipment_date) : undefined}
                  style={{ width: '100%' }}
                  onChange={(date) => setDates(prev => ({ ...prev, shipment_date: date ? date.format("YYYY-MM-DD") : null }))}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={6}>
              <Form.Item label="現品受領日">
                <DatePicker
                  value={dates.item_receive_date ? dayjs(dates.item_receive_date) : undefined}
                  style={{ width: '100%' }}
                  onChange={(date) => setDates(prev => ({ ...prev, item_receive_date: date ? date.format("YYYY-MM-DD") : null }))}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="現品返却日">
                <DatePicker
                  value={dates.item_return_date ? dayjs(dates.item_return_date) : undefined}
                  style={{ width: '100%' }}
                  onChange={(date) => setDates(prev => ({ ...prev, item_return_date: date ? date.format("YYYY-MM-DD") : null }))}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="資料送付日">
                <DatePicker
                  value={dates.send_document_date ? dayjs(dates.send_document_date) : undefined}
                  style={{ width: '100%' }}
                  onChange={(date) => setDates(prev => ({ ...prev, send_document_date: date ? date.format("YYYY-MM-DD") : null }))}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="資料受領日">
                <DatePicker
                  value={dates.receive_document_date ? dayjs(dates.receive_document_date) : undefined}
                  style={{ width: '100%' }}
                  onChange={(date) => setDates(prev => ({ ...prev, receive_document_date: date ? date.format("YYYY-MM-DD") : null }))}
                />
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
              <Form.Item label="検収日">
                <DatePicker
                  value={dates.accept_date ? dayjs(dates.accept_date) : undefined}
                  style={{ width: '100%' }}
                  onChange={(date) => setDates(prev => ({ ...prev, accept_date: date ? date.format("YYYY-MM-DD") : null }))}
                />
              </Form.Item>
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
