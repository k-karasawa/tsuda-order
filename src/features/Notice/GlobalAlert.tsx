import React, { useEffect, useState } from 'react';
import { Alert } from 'antd';
import Marquee from 'react-fast-marquee';
import { useSupabaseClient } from "@/hooks";

type Notice = {
  id: number;
  message: string | null;
  type: number;
};

const getAlertType = (type: number): "success" | "info" | "warning" | "error" => {
  switch (type) {
    case 0:
      return "success";
    case 1:
      return "info";
    case 2:
      return "warning";
    case 3:
      return "error";
    default:
      return "info";
  }
};

export const GlobalAlert: React.FC = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const supabase = useSupabaseClient();

  useEffect(() => {
    const fetchNotices = async () => {
      const { data, error } = await supabase
        .from('notice')
        .select('*')
        .eq('function', true);

      if (!error && data) {
        setNotices(data);
      }
    };

    fetchNotices();
  }, [supabase]);

  return (
    <>
      {notices.map((notice) => (
        <Alert
          key={notice.id}
          banner
          message={
            <Marquee pauseOnHover={false} gradient={false} speed={30}>
              {notice.message}
            </Marquee>
          }
          type={getAlertType(notice.type)}
        />
      ))}
    </>
  );
};
