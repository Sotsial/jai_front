import { Button } from "antd";

const FilterMobile = () => {
  return (
    <div style={{ paddingInline: 8 }}>
      <Button
        block
        size="large"
        style={{ backgroundColor: "#1c1819", color: "#fff", borderRadius: 12 }}
      >
        Фильтр
      </Button>
    </div>
  );
};

export default FilterMobile;
