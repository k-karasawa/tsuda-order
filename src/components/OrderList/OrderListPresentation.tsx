import { useEffect, useState, useMemo } from "react";
import { Spin } from "antd";
import { FloatButton } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { createDynamicFilters } from "@/hooks/filterUtils";
import { generateColumns } from "@/hooks/columnUtils";
import { filterableColumns } from "@/data/filterableColumns";
import { OrderTabs } from "./OrderTabs";
import { OrderEditDrawer } from "@/features/OrderEditDrawer/OrderEditDrawer";
import { useOrderList } from "@/hooks/useOrderList";
import { useRecoilState } from "recoil";
import { selectedOrderAtom } from "@/recoil/selectedOrderAtom";
import { exportToCsv } from "@/features/CSVExport/exportToCsv";
import { selectedColumns } from "@/features/CSVExport/selectedColumns";
import { columns as originalColumns } from "@/data/columns";
import { columns as sColumns } from "@/data/columns_s";
import { columns as mColumns } from "@/data/columns_m";
import { useLoginUser } from "@/hooks/useLoginUser";
import { ColumnsType } from "antd/es/table";
import type { OrderListPresentationProps, OrderListDataType } from "@/types/types";
import dayjs from "dayjs";

export const OrderListPresentation: React.FC<OrderListPresentationProps> = ({ data, columns, filterCondition }) => {
  const { revalidate } = useOrderList();
  const [selectedOrder, setSelectedOrder] = useRecoilState(selectedOrderAtom);
  const dynamicFilters = useMemo(() => createDynamicFilters(data, filterableColumns), [data]);
  const { organization } = useLoginUser();
  const [isColumnsReady, setIsColumnsReady] = useState(false);
  const [dynamicColumns, setDynamicColumns] = useState<ColumnsType<OrderListDataType>>([]);

  useEffect(() => {
    if (!organization) {
      setIsColumnsReady(false);
      return;
    }

    let newDynamicColumns;
    switch (organization) {
      case "サス・サンワ株式会社":
        newDynamicColumns = generateColumns(sColumns, dynamicFilters);
        break;
      case "株式会社ミヤハラ":
        newDynamicColumns = generateColumns(mColumns, dynamicFilters);
        break;
      default:
        newDynamicColumns = columns || generateColumns(originalColumns, dynamicFilters);
        break;
    }

    setDynamicColumns(newDynamicColumns);
    setIsColumnsReady(true);
  }, [organization, columns, dynamicFilters]);

  const handleRowClick = (record: OrderListDataType) => {
    setSelectedOrder(record);
  };

  useEffect(() => {
    revalidate();
  }, [selectedOrder, revalidate]);

  if (!isColumnsReady) {
    return <Spin size="large" />;
  }

  return (
    <OrderEditDrawer onUpdated={revalidate}>
      {showDrawer => (
        <>
          <FloatButton
            icon={<DownloadOutlined />}
            type="primary"
            tooltip={<div>CSVダウンロード</div>}
            onClick={() => exportToCsv(data, `${dayjs().format('YYYYMMDD')}-${filterCondition || "全件ダウンロード"}.csv`, selectedColumns)}
          />
          <OrderTabs
            data={data}
            columns={dynamicColumns}
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
