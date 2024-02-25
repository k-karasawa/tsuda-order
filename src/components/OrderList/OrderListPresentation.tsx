import React, { useEffect } from "react";
import { FloatButton } from "antd";
import { FileAddOutlined, DownloadOutlined } from "@ant-design/icons";
import { columns as originalColumns } from "@/data/columns";
import { createDynamicFilters } from "@/hooks/filterUtils";
import { generateColumns } from "@/hooks/columnUtils";
import type { OrderListPresentationProps, OrderListDataType } from "@/types/types";
import { filterableColumns } from "@/data/filterableColumns";
import { OrderTabs } from "./OrderTabs";
import { OrderEditDrawer } from "@/features/OrderEditDrawer/OrderEditDrawer";
import { useOrderList } from "@/hooks/useOrderList";
import Link from "next/link";
import { useRecoilState } from "recoil";
import { selectedOrderAtom } from "@/recoil/selectedOrderAtom";
import { exportToCsv } from "@/features/CSVExport/exportToCsv";
import { selectedColumns } from "@/features/CSVExport/selectedColumns";
import dayjs from "dayjs";

export const OrderListPresentation: React.FC<OrderListPresentationProps> = ({ data, columns, showDownloadButton, filterCondition }) => {
  const { revalidate } = useOrderList();
  const [selectedOrder, setSelectedOrder] = useRecoilState(selectedOrderAtom);
  const dynamicFilters = createDynamicFilters(data, filterableColumns);
  const usedColumns = columns || generateColumns(originalColumns, dynamicFilters);
  const handleRowClick = (record: OrderListDataType) => {
    setSelectedOrder(record);
  };

  useEffect(() => {
    revalidate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOrder]);

  return (
    <OrderEditDrawer onUpdated={revalidate}>
      {showDrawer => (
        <>
          <FloatButton.Group shape="circle" style={{ right: 24 }}>
            {showDownloadButton && (
              <FloatButton
                icon={<DownloadOutlined />}
                tooltip={<div>CSVダウンロード</div>}
                onClick={() => exportToCsv(data, `${dayjs().format('YYYYMMDD')}-${filterCondition}.csv`, selectedColumns)}
              />
            )}
            <Link href="/add-order">
              <FloatButton
                icon={<FileAddOutlined />}
                tooltip={<div>案件登録</div>}
                type="primary"
              />
            </Link>
          </FloatButton.Group>

          <OrderTabs
            data={data}
            columns={usedColumns}
            onRowClick={record => {
              handleRowClick(record);
              showDrawer();
            }}
          />
        </>
      )}
    </OrderEditDrawer>
  );
};
