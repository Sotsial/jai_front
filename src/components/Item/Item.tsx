import {
  Button,
  Carousel,
  Col,
  DescriptionsProps,
  Divider,
  Flex,
  Image,
  Popover,
  Row,
  Space,
  Typography,
} from "antd";
import "./Item.css";
import { Fragment, useEffect, useRef, useState } from "react";
import Order from "../Order/Order";
import { isMobile } from "react-device-detect";
import { CarVM, separator } from "../RecordList/RecordItem/RecordItem";
import useStore from "src/store/store";
import { CarouselRef } from "antd/es/carousel";
import CalculationModal from "../CalculationModal/CalculationModal";

const Item = ({
  model,
  total_price,
  total_price_kzt,
  gallery,
  year,
  mileage,
  body_type,
  exterior_color,
  engine_capacity,
  technical_features,
  brand,
  standard,
}: CarVM) => {
  const { city, country } = useStore();

  const carFeatures = technical_features?.split(", ");

  useEffect(() => {
    if (gallery?.length > 1) setCurrent(0);
  }, [gallery]);

  const previewRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<CarouselRef>(null);

  const images = gallery?.map((el) => el.path) ?? [];

  const [current, setCurrent] = useState(1);

  const startX = useRef(0);
  const endX = useRef(0);

  const goToPreviousSlide = (event: TouchEvent) => {
    startX.current = event.touches[0].clientX;
  };

  const goToNextSlide = (event: TouchEvent) => {
    endX.current = event.changedTouches[0].clientX;

    const deltaX = endX.current - startX.current;

    if (deltaX < 0 && current + 1 < images.length) {
      setCurrent((prev) => prev + 1);
    } else if (deltaX > 0 && current > 0) {
      setCurrent((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const slider = previewRef.current;
    if (!slider) return;

    slider.addEventListener("touchstart", goToPreviousSlide);
    slider.addEventListener("touchend", goToNextSlide);

    return () => {
      slider.removeEventListener("touchstart", goToPreviousSlide);
      slider.removeEventListener("touchend", goToNextSlide);
    };
  }, [current]);

  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Год выпуска",
      children: year,
    },
    {
      key: "2",
      label: "Пробег",
      children: `${mileage} км`,
    },
    {
      key: "3",
      label: "Кузов",
      children: body_type,
    },
    {
      key: "4",
      label: "Объем двигателя, л",
      children: engine_capacity,
    },
    {
      key: "5",
      label: "Цвет кузова",
      children: exterior_color,
    },
  ];

  if (isMobile)
    return (
      <Flex vertical gap={8}>
        <Image.PreviewGroup
          preview={{
            movable: false,
            forceRender: true,
            current: current,
            onChange: setCurrent,
            panelRef(instance) {
              // @ts-ignore
              previewRef.current = instance;
            },
          }}
        >
          <Carousel arrows infinite={false}>
            {images.map((el, index) => (
              <Image
                key={el}
                onClick={() => setCurrent(index)}
                style={{
                  height: "80px",
                  aspectRatio: "1/3",
                  cursor: "pointer",
                }}
                src={el}
              />
            ))}
          </Carousel>
        </Image.PreviewGroup>
        <Space direction="vertical" style={{ paddingInline: 12 }}>
          <Typography.Title
            level={3}
            style={{ margin: 0, textTransform: "capitalize" }}
          >
            {brand} | {model}
          </Typography.Title>
          <Flex justify="space-between">
            <Typography.Title
              level={4}
              style={{ marginTop: 0, marginBottom: 0 }}
            >
              {separator(total_price_kzt)} Т
            </Typography.Title>
            <Popover content={<CalculationModal country={country} />}>
              <Button type="primary">Полный расчет</Button>
            </Popover>
          </Flex>
        </Space>
        <Divider style={{ marginTop: 0, marginBottom: 0 }} />
        <Row
          gutter={[12, 12]}
          align={"middle"}
          style={{ maxWidth: "100%", paddingInline: 12 }}
        >
          <Col span={12}>
            <Typography.Text>В долларах</Typography.Text>
          </Col>
          <Col span={12} style={{ textAlign: "right" }}>
            <Typography.Text
              style={{
                fontSize: "1rem",
                fontWeight: 600,
                padding: 6,
                paddingInline: 8,
                backgroundColor: "#ffd313",
                borderRadius: 6,
              }}
            >
              ${separator(total_price)}
            </Typography.Text>
          </Col>
          <Col span={12}>
            <Typography.Text>Доставка</Typography.Text>
          </Col>
          <Col span={12} style={{ textAlign: "right" }}>
            <Typography.Text style={{ fontSize: "1.1rem", fontWeight: 600 }}>
              До Алматы
            </Typography.Text>
          </Col>
        </Row>
        <Divider style={{ marginTop: 0, marginBottom: 0 }} />
        <Row gutter={[12, 12]} style={{ maxWidth: "100%", paddingInline: 12 }}>
          {items?.map((el) => (
            <Fragment key={el.label as string}>
              <Col span={14}>
                <Typography.Text>{el.label}</Typography.Text>
              </Col>
              <Col span={10}>
                <Typography.Text>{el.children}</Typography.Text>
              </Col>
            </Fragment>
          ))}
        </Row>
        <Typography.Title level={4} style={{ paddingInline: 18 }}>
          Технические характеристики
        </Typography.Title>
        <Row style={{ paddingInline: 12 }}>
          {standard ? (
            Object.keys(standard).map((el) => (
              <Col span={24}>
                <Typography.Title
                  style={{ marginTop: 4, paddingInline: 6 }}
                  level={5}
                >
                  {el}
                </Typography.Title>
                <ul
                  style={{
                    listStyleType: "disc",
                    fontSize: "1rem",
                    paddingLeft: 24,
                  }}
                >
                  {Object.keys(standard[el]).map((item) => (
                    <li>{item}</li>
                  ))}
                </ul>
              </Col>
            ))
          ) : (
            <Col span={24}>
              <ul
                style={{
                  listStyleType: "disc",
                  fontSize: "1rem",
                  paddingLeft: 24,
                }}
              >
                {carFeatures?.map((el) => (
                  <li>{el}</li>
                ))}
              </ul>
            </Col>
          )}
        </Row>
      </Flex>
    );
  return (
    <Row gutter={[24, 12]}>
      <Col span={8}>
        <Flex
          justify="space-between"
          align="center"
          style={{ marginBottom: 24 }}
        >
          <Typography.Title level={3} style={{ marginTop: 0, marginBottom: 0 }}>
            {separator(total_price_kzt)} Т
          </Typography.Title>
          <Popover content={<CalculationModal country={country} />}>
            <Button type="primary">Полный расчет</Button>
          </Popover>
        </Flex>
        <Row gutter={[12, 12]} align={"middle"} style={{ paddingRight: 8 }}>
          <Col span={12}>
            <Typography.Text type="secondary">В долларах</Typography.Text>
          </Col>
          <Col span={12} style={{ textAlign: "right" }}>
            <Typography.Text
              style={{
                fontSize: "1rem",
                fontWeight: 600,
                padding: 6,
                paddingInline: 8,
                backgroundColor: "#ffd313",
                borderRadius: 6,
              }}
            >
              ${separator(total_price)}
            </Typography.Text>
          </Col>
          <Col span={12}>
            <Typography.Text type="secondary">Доставка</Typography.Text>
          </Col>
          <Col span={12} style={{ textAlign: "right" }}>
            <Typography.Text style={{ fontSize: "1.2rem", fontWeight: 600 }}>
              До {city}
            </Typography.Text>
          </Col>
        </Row>
        <Divider />
        <Row gutter={[12, 12]}>
          {items?.map((el, index) => (
            <Fragment key={index}>
              <Col span={12}>
                <Typography.Text type="secondary">{el.label}</Typography.Text>
              </Col>
              <Col span={12}>
                <Typography.Text>{el.children}</Typography.Text>
              </Col>
            </Fragment>
          ))}
        </Row>
        <Order />
      </Col>
      <Col span={16} className="item_right">
        <Space direction="vertical" style={{ width: "100%" }}>
          <Image.PreviewGroup
            preview={{
              movable: false,
              forceRender: true,
              current: current,
              onChange: setCurrent,
              panelRef(instance) {
                // @ts-ignore
                previewRef.current = instance;
              },
            }}
          >
            <Carousel
              arrows
              infinite={false}
              ref={(ref) => {
                // @ts-ignore
                carouselRef.current = ref;
              }}
            >
              {images?.map((el, index) => (
                <Image
                  key={el}
                  onClick={() => setCurrent(index)}
                  style={{
                    aspectRatio: "1/3",
                    cursor: "pointer",
                  }}
                  src={el}
                />
              ))}
            </Carousel>
          </Image.PreviewGroup>

          <Row gutter={[12, 12]}>
            {images?.map((el, index) => (
              <Col key={el} span={4}>
                <Image
                  onClick={() => carouselRef.current?.goTo(index)}
                  preview={false}
                  style={{
                    height: "80px",
                    aspectRatio: "1/3",
                    cursor: "pointer",
                  }}
                  src={el}
                />
              </Col>
            ))}
          </Row>

          <Typography.Title level={4}>
            Технические характеристики
          </Typography.Title>
          <Row>
            {standard ? (
              Object.keys(standard).map((el) => (
                <Col span={12}>
                  <Typography.Title style={{ marginTop: 6 }} level={5}>
                    {el}
                  </Typography.Title>
                  <ul
                    style={{
                      listStyleType: "disc",
                      fontSize: "1rem",
                    }}
                  >
                    {Object.keys(standard[el]).map((item) => (
                      <li>{item}</li>
                    ))}
                  </ul>
                </Col>
              ))
            ) : (
              <Col span={24}>
                <ul
                  style={{
                    display: "flex",
                    flexWrap: "wrap", // Это позволит элементам переноситься на следующую строку
                    listStyleType: "disc",
                    fontSize: "1rem",
                  }}
                >
                  {carFeatures?.map((el, index) => (
                    <li
                      key={index}
                      style={{ flex: "1 0 50%", lineHeight: "1.5" }}
                    >
                      {el}
                    </li>
                  ))}
                </ul>
              </Col>
            )}
          </Row>
        </Space>
      </Col>
    </Row>
  );
};

export default Item;
