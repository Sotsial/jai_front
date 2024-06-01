import image from "src/assets/car-mini.png";
import "./RecordItem.css";
import { Card, Col, Flex, Row, Space, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { isMobile } from "react-device-detect";
import useStore from "src/store/store";
import { selectCountryName } from "src/utiles";

const { Link, Text, Title } = Typography;

export interface ItemVm {
  model: string;
  fuel: string;
  year: number;
  engine_volume: string | null;
  price_usd: number;
  price_kzt: number;
  color: string;
  mileage_km: number;
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
  color,
  mileage_km,
}: ItemVm & { city: string }) => {
  const navigate = useNavigate();
  const { country } = useStore();
  if (isMobile)
    return (
      <Card styles={{ body: { padding: 8, paddingInline: 10 } }}>
        <Row
          className="record_item"
          onClick={() => navigate("item/123")}
          gutter={[12, 12]}
        >
          <Col span={12}>
            <Flex vertical gap={3} style={{ margin: 0 }}>
              <Link style={{ fontSize: "1.1rem" }}>{model}</Link>
              <Space align="center">
                <Title
                  level={5}
                  style={{ margin: 0, lineHeight: 1, paddingTop: 4 }}
                >
                  {numberWithSeparator(price_kzt)} ₸
                </Title>

                <Typography.Text className="record_item_price_dollar">
                  ${numberWithSeparator(price_usd)}
                </Typography.Text>
              </Space>
            </Flex>
          </Col>
          <Col span={12} style={{ textAlign: "right", lineHeight: "1" }}>
            <Text
              type="secondary"
              style={{ fontSize: "0.7rem", textWrap: "balance" }}
            >
              Цена указана с учетом всех расходов с доставкой до{" "}
              <strong>{city}</strong>
            </Text>
          </Col>
          <Col span={12}>
            <img src={image} />
          </Col>
          <Col span={12}>
            <Flex vertical justify="space-between" style={{ height: "100%" }}>
              <Space direction="vertical">
                <Text style={{ fontSize: "0.8rem" }}>
                  {`${year} / ${engine_volume} / Пробег: ${mileage_km} / ${fuel} / Автомат / ${color}`}
                </Text>
              </Space>
              <Text type="secondary">{selectCountryName(country)}</Text>
            </Flex>
          </Col>
        </Row>
      </Card>
    );

  return (
    <Card styles={{ body: { padding: 0 } }} style={{ border: "none" }}>
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
            <Text type="secondary">{selectCountryName(country)}</Text>
          </Flex>
        </Col>
        <Col span={8}>
          <Flex vertical gap={6} style={{ textAlign: "right", margin: 0 }}>
            <Title level={4} style={{ margin: 0 }}>
              {numberWithSeparator(price_kzt)} ₸ |{" "}
              {numberWithSeparator(price_usd)} $
            </Title>
            <Text type="secondary" style={{ fontSize: "0.8rem" }}>
              Цена указана с учетом всех расходов с доставкой до {city}
            </Text>
          </Flex>
        </Col>
      </Row>
    </Card>
  );
};

export default RecordItem;
