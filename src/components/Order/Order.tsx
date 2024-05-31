import { InstagramOutlined } from "@ant-design/icons";
import { Button, Card, Flex, Space, Typography } from "antd";
import React from "react";

const Order = () => {
  return (
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
      style={{ marginTop: 24, boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)" }}
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
  );
};

export default Order;
