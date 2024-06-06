import { Space, Typography, Select, Card, Flex } from "antd";
import { isMobile } from "react-device-detect";
import useStore from "src/store/store";

const CitySelect = ({ total = 0 }: { total?: number }) => {
  const { city, setCity, setFilter } = useStore();

  if (isMobile)
    return (
      <Card styles={{ body: { padding: 12 } }}>
        <Flex justify="space-between" align="center">
          <Typography.Title level={5} style={{ margin: 0 }}>
            Доставка авто из Кореи до
          </Typography.Title>
          <Select
            variant="borderless"
            value={city}
            onChange={setCity}
            options={[
              { label: "Алматы", value: "Алматы" },
              { label: "Астана", value: "Астана" },
            ]}
          />
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
          Доставка авто из Кореи до
        </Typography.Title>
        <Select
          value={city}
          onChange={setCity}
          options={[
            { label: "Алматы", value: "Алматы" },
            { label: "Астана", value: "Астана" },
          ]}
        />
      </Space>
      <Typography.Text>Найдено {total} объявлений</Typography.Text>
      <Typography.Text>
        <Space>
          Сортировать по:
          <Typography.Link underline onClick={() => setFilter({})}>
            По умолчанию
          </Typography.Link>
        </Space>
      </Typography.Text>
    </Space>
  );
};

export default CitySelect;
