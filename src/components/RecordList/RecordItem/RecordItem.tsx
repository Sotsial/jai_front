import image from "src/assets/car-mini.png";
import "./RecordItem.css";
import { Col, Flex, Row, Space, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const { Link, Text, Title } = Typography;

interface ItemVm {
  model: string;
  fuel: string;
  year: number;
  engine_volume: string | null;
  price_usd: number;
  price_kzt: number;
}

const numberWithSeparator = (number: number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

const RecordItem = ({
  model,
  engine_volume,
  fuel,
  year,
  price_usd,
  price_kzt,
  city,
}: ItemVm & { city: string }) => {
  const navigate = useNavigate();

  return (
    <Row
      className="record_item"
      onClick={() => navigate("item/123")}
      gutter={24}
    >
      <Col span={6}>
        <img src={image} />
      </Col>
      <Col span={10}>
        <Flex vertical justify="space-between" style={{ height: "100%" }}>
          <Space direction="vertical">
            <Link style={{ fontSize: "1.3rem" }}>{model}</Link>
            <Text style={{ fontSize: "1rem" }}>
              {`${year} / ${engine_volume} / Пробег: 123 / ${fuel} / Автомат / Белый`}
            </Text>
          </Space>
          <Text type="secondary">ОАЭ</Text>
        </Flex>
      </Col>
      <Col span={8}>
        <Flex vertical gap={6} style={{ textAlign: "right", margin: 0 }}>
          <Title level={4} style={{ margin: 0 }}>
            {numberWithSeparator(price_kzt)} ₸ |{numberWithSeparator(price_usd)}{" "}
            $
          </Title>
          <Text type="secondary" style={{ fontSize: "0.8rem" }}>
            Цена указана с учетом всех расходов с доставкой до {city}
          </Text>
        </Flex>
      </Col>
    </Row>
  );
};

export default RecordItem;
