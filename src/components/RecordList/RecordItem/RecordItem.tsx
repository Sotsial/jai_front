import "./RecordItem.css";
import { Card, Col, Flex, Row, Space, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { isMobile } from "react-device-detect";
import useStore from "src/store/store";
import { selectCountryName } from "src/utiles";

const { Link, Text, Title } = Typography;

export interface CarVM {
  id: number;
  body_type: string;
  brand: string;
  catalog_item_id: string;
  engine_capacity: string;
  fuel_type: string;
  model: string;
  exterior_color: string;
  mileage: number;
  total_price: number;
  total_price_kzt: number;
  transmissions_type: string;
  year: number;
  main_photo: string;
  gallery: { path: string }[];
  technical_features: string;
  standard: Record<string, Record<string, number>>;
}
export const separator = (number?: number) => {
  if (!number) return "0";
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

const RecordItem = ({
  id,
  model,
  engine_capacity,
  fuel_type,
  year,
  total_price,
  total_price_kzt,
  city,
  exterior_color,
  mileage,
  main_photo,
  transmissions_type,
}: CarVM & { city: string }) => {
  const navigate = useNavigate();
  const { country } = useStore();
  if (isMobile)
    return (
      <Card styles={{ body: { padding: 8, paddingInline: 10 } }}>
        <Row
          className="record_item"
          onClick={() => navigate(`item/${country}/${id}`)}
          gutter={[12, 12]}
        >
          <Col span={12}>
            <Flex vertical gap={3} style={{ margin: 0 }}>
              <Link className="record_item_model">{model}</Link>
              <Space align="center">
                <Text className="record_item_price_tenge">
                  {separator(total_price_kzt)} ₸
                </Text>

                <Text className="record_item_price_dollar">
                  ${separator(total_price)}
                </Text>
              </Space>
            </Flex>
          </Col>
          <Col
            span={12}
            style={{ textAlign: "right" }}
            className="record_item_description"
          >
            <Space size={0} direction="vertical">
              <Text type="secondary">
                Цена указана с учетом всех расходов с доставкой до{" "}
                <strong>{city}</strong>
              </Text>
            </Space>
          </Col>
          <Col span={12}>
            <div
              style={{
                backgroundImage: `url("${main_photo}")`,
              }}
              className="record_item_image"
            />
          </Col>
          <Col span={12}>
            <Flex vertical justify="space-between" style={{ height: "100%" }}>
              <Space direction="vertical">
                <Text style={{ fontSize: "0.8rem" }}>
                  {`${year} / ${engine_capacity} / Пробег: ${mileage} / ${fuel_type} / ${transmissions_type} / ${exterior_color}`}
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
        onClick={() => navigate(`item/${country}/${id}`)}
        gutter={24}
      >
        <Col span={6}>
          <div
            style={{
              backgroundImage: `url("${main_photo}")`,
            }}
            className="record_item_image"
          />
        </Col>
        <Col span={10}>
          <Flex vertical justify="space-between" style={{ height: "100%" }}>
            <Space direction="vertical">
              <Link style={{ fontSize: "1.3rem" }}>{model}</Link>
              <Text style={{ fontSize: "1rem" }}>
                {`${year} / ${engine_capacity} / Пробег: ${mileage} / ${fuel_type} / ${transmissions_type} / ${exterior_color}`}
              </Text>
            </Space>
            <Text type="secondary">{selectCountryName(country)}</Text>
          </Flex>
        </Col>
        <Col span={8}>
          <Flex vertical gap={6} style={{ textAlign: "right", margin: 0 }}>
            <Title level={4} style={{ margin: 0, textWrap: "nowrap" }}>
              {separator(total_price_kzt)} ₸ | {separator(total_price)} $
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
