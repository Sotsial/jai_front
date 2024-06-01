import { InstagramOutlined } from "@ant-design/icons";
import { Button, Card, Flex, Space, Typography } from "antd";
const Order = () => {
  return (
    <Space direction="vertical" style={{ paddingBottom: 12 }}>
      <Typography.Title level={4} style={{ marginBottom: 4, marginTop: 4 }}>
        Заказать авто:
      </Typography.Title>
      <Card
        title={
          <Flex justify="space-between">
            Jai Supplier
            <Space>
              <InstagramOutlined style={{ fontSize: 22, cursor: "pointer" }} />
            </Space>
          </Flex>
        }
        bordered={false}
        style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)" }}
      >
        <Space direction="vertical">
          <Typography.Text type="secondary">
            Компания по импорту авто из Южной Кореи, ОАЭ, Китая. Офисы в Астане,
            Алматы, Караганда. <b />
            Заказывайте! Самые быстрые сроки доставки
          </Typography.Text>
          <Button size="large" block type="primary">
            Заказать авто
          </Button>
        </Space>
      </Card>
    </Space>
  );
};

export default Order;
