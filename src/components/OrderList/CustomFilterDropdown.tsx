import { Button, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

export const filterIcon = (filtered: boolean) => (
  <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
);

export const CustomFilterDropdown: React.FC<any> = ({
  setSelectedKeys,
  selectedKeys,
  confirm,
  clearFilters,
}) => {
  return (
    <div style={{ padding: 8 }}>
      <Input
        placeholder="Search full order code"
        value={selectedKeys[0] || ''}
        onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
        onPressEnter={confirm}
        style={{ width: 188, marginBottom: 8, display: 'block' }}
      />
      <Button
        type="primary"
        onClick={confirm}
        size="small"
        style={{ width: 90, marginRight: 8 }}
      >
        Search
      </Button>
      <Button
        onClick={() => {
          setSelectedKeys([]);
          clearFilters();
        }}
        size="small"
        style={{ width: 90 }}
      >
        Reset
      </Button>
    </div>
  );
};
