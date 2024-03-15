import React, { useEffect, useState } from "react";
import { useSupabaseClient } from "@/hooks/useSupabaseClient";
import { Button, Input, message, Select, Switch, Form } from "antd";
import { Database } from "@/types/database.types";
import styles from "./styles/NoticeStyles.module.css";

type Notice = Database['public']['Tables']['notice']['Row'];

export const Notification = () => {
  const supabase = useSupabaseClient();
  const [notices, setNotices] = useState<Notice[]>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchNotices = async () => {
      const { data, error } = await supabase
        .from('notice')
        .select('*');
      if (error) {
        message.error('通知の取得に失敗しました。');
      } else {
        setNotices(data);
      }
    };

    fetchNotices();
  }, [supabase]);

  const handleSubmit = async (values: any) => {
    const { id, message: noticeMessage, type, function: functionValue } = values;
    const { error } = await supabase
      .from('notice')
      .update({ message: noticeMessage, type, function: functionValue })
      .match({ id });

    if (error) {
      message.error('通知の更新に失敗しました。');
    } else {
      message.success('通知設定が更新されました。');
    }
  };

  return (
    <>
      <h2 className={styles.noticeTitle}>
        アナウンスメッセージ設定
      </h2>
      <div className={styles.noticeContainer}>
        {notices.map((notice) => (
          <Form
            key={notice.id}
            form={form}
            layout="vertical"
            initialValues={{ id: notice.id, message: notice.message, type: notice.type, function: notice.function }}
            onFinish={handleSubmit}
            className={styles.noticeForm}
          >
            <Form.Item name="id" hidden={true} />
            <Form.Item
              name="message"
              label="通知内容メッセージ"
            >
              <Input />
            </Form.Item>
            <div className={styles.formItemHorizontal}>
              <Form.Item
                name="type"
                label="通知タイプ"
                style={{ flex: 1 }}
                className={styles.typeSelectMargin}
              >
                <Select>
                  <Select.Option value="success">Success</Select.Option>
                  <Select.Option value="info">Information</Select.Option>
                  <Select.Option value="warning">Warning</Select.Option>
                  <Select.Option value="error">Error</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="function"
                label="切り替え"
                valuePropName="checked"
                style={{ flex: 2 }}
              >
                <Switch checkedChildren="有効" unCheckedChildren="無効" />
              </Form.Item>
            </div>
            <Form.Item className={styles.updateButton}>
              <Button type="primary" htmlType="submit">更新</Button>
            </Form.Item>
          </Form>
        ))}
      </div>
    </>
  );
};
