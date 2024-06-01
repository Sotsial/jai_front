import { Space, Typography, Select, Card, Flex } from "antd";
import { isMobile } from "react-device-detect";

const CitySelect = ({
  city,
  setCity,
}: {
  city: string;
  setCity: (v: string) => void;
}) => {
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
          Найдено 53 765 объявлений
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
      <Typography.Text>Найдено 53 765 объявлений</Typography.Text>
      <Typography.Text>
        <Space>
          Сортировать по:
          <Typography.Link underline>По умолчанию</Typography.Link>
        </Space>
      </Typography.Text>
    </Space>
  );
};

export default CitySelect;