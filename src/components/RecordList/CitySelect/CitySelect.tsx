import {
  SortAscendingOutlined,
  SortDescendingOutlined,
} from "@ant-design/icons";
import { Space, Typography, Select, Card, Flex, Button } from "antd";
import { isMobile } from "react-device-detect";
import { countryName } from "src/components/Layout/Layout";
import useStore from "src/store/store";

const CitySelect = ({ total = 0 }: { total?: number }) => {
  const { city, country, sort, setSort, sortDirection, setSortDirection } =
    useStore();

  if (isMobile)
    return (
      <Card styles={{ body: { padding: 12 } }}>
        <Flex justify="space-between" align="center">
          <Typography.Title level={5} style={{ margin: 0 }}>
            Доставка авто из {countryName(country)} до {city}
          </Typography.Title>
        </Flex>
        <Typography.Text type="secondary">
          Найдено {total} объявлений
        </Typography.Text>
      </Card>
    );

  return (
    <Space direction="vertical">
      <Space align="center">
        <Typography.Title level={3} style={{ margin: 0 }}>
          Доставка авто из {countryName(country)} до {city}
        </Typography.Title>
      </Space>
      <Typography.Text>Найдено {total} объявлений</Typography.Text>
      <Typography.Text>
        <div>
          Сортировать по:
          <Select
            variant="borderless"
            popupMatchSelectWidth={false}
            labelRender={(props) => <a>{props.label}</a>}
            value={sort}
            onChange={setSort}
            options={[
              { value: "", label: "По умолчанию" },
              { value: "yearSort", label: "году выпуска" },
              { value: "priceSort", label: "цене" },
            ]}
          />
          {sort !== "" && (
            <Button
              type="text"
              onClick={() =>
                setSortDirection(sortDirection === "asc" ? "desc" : "asc")
              }
              icon={
                sortDirection === "desc" ? (
                  <SortAscendingOutlined />
                ) : (
                  <SortDescendingOutlined />
                )
              }
            />
          )}
        </div>
      </Typography.Text>
    </Space>
  );
};

export default CitySelect;
