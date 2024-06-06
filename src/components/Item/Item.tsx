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

const items: DescriptionsProps["items"] = [
  {
    key: "1",
    label: "Год выпуска",
    children: "2011",
  },
  {
    key: "2",
    label: "Пробег",
    children: "5 124 км",
  },
  {
    key: "3",
    label: "Кузов",
    children: "Внедорожник",
  },
  {
    key: "4",
    label: "Объем двигателя, л",
    children: "4.7",
  },
  {
    key: "5",
    label: "Цвет кузова",
    children: "Серый",
  },
];

const images = [
  "https://i.gaw.to/vehicles/photos/40/36/403605-2024-toyota-camry.jpg?640x400",
  "https://imgd.aeplcdn.com/664x374/n/cw/ec/122561/toyota-camry-right-front-three-quarter6.jpeg?isig=0&wm=1&q=80",
  "https://www.motortrend.com/uploads/sites/5/2020/07/2021-Toyota-Camry.jpg?w=768&width=768&q=75&format=webp",
];

const Item = () => {
  const [image, setImage] = useState(
    "https://i.gaw.to/vehicles/photos/40/36/403605-2024-toyota-camry.jpg?640x400"
  );

  const carouselRef = useRef<HTMLDivElement>(null);

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
    const slider = carouselRef.current;
    if (!slider) return;

    slider.addEventListener("touchstart", goToPreviousSlide);
    slider.addEventListener("touchend", goToNextSlide);

    return () => {
      slider.removeEventListener("touchstart", goToPreviousSlide);
      slider.removeEventListener("touchend", goToNextSlide);
    };
  }, [current]);

  const content = (
    <div>
      <p>Content</p>
      <p>Content</p>
    </div>
  );

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
              carouselRef.current = instance;
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
          <Typography.Title level={3} style={{ margin: 0 }}>
            Toyota Camry
          </Typography.Title>

          <Typography.Title level={4} style={{ marginTop: 0, marginBottom: 0 }}>
            18 500 000 Т
          </Typography.Title>
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
              $41 111
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
          {items.map((el) => (
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
          <Col span={24}>
            <Typography.Title
              style={{ marginTop: 4, paddingInline: 6 }}
              level={5}
            >
              Экстерьер / интерьер
            </Typography.Title>
            <ul
              style={{
                listStyleType: "disc",
                fontSize: "1rem",
                paddingLeft: 24,
              }}
            >
              <li>Люк на крыше</li>
              <li>Фары (Led)</li>
              <li>Алюминиевые диски</li>
              <li>Подогрев руля</li>
              <li>Мультруль</li>
              <li>Центразамок</li>
              <li>Подрулевые переключатели</li>
            </ul>
          </Col>
          <Col span={24}>
            <Typography.Title
              style={{ marginTop: 4, paddingInline: 6 }}
              level={5}
            >
              Безопасность
            </Typography.Title>
            <ul
              style={{
                listStyleType: "disc",
                fontSize: "1rem",
                paddingLeft: 24,
              }}
            >
              <li>Система контроля давления в шинах (TPMS)</li>
              <li>Антиблокировочная система (ABS)</li>
              <li>Система стабилизации (ESP)</li>
              <li>Подушки безопасности</li>
              <li>Задний видеокамера</li>
              <li>Система помощи при парковке (Park Assist)</li>
              <li>Система контроля слепых зон (BLIS)</li>
            </ul>
          </Col>
          <Col span={24}>
            <Typography.Title
              style={{ marginTop: 4, paddingInline: 6 }}
              level={5}
            >
              Удобство / Мультимедиа
            </Typography.Title>
            <ul
              style={{
                listStyleType: "disc",
                fontSize: "1rem",
                paddingLeft: 24,
              }}
            >
              <li>Система навигации</li>
              <li>Система голосового управления</li>
              <li>Bluetooth соединение</li>
              <li>USB порты</li>
              <li>Система автоматического климат-контроля</li>
              <li>Электропривод сидений</li>
              <li>Аудиосистема высокого качества</li>
            </ul>
          </Col>
          <Col span={24}>
            <Typography.Title
              style={{ marginTop: 4, paddingInline: 6 }}
              level={5}
            >
              Сиденья
            </Typography.Title>
            <ul
              style={{
                listStyleType: "disc",
                fontSize: "1rem",
                paddingLeft: 24,
              }}
            >
              <li>Электрорегулировка сидений</li>
              <li>Подогрев передних сидений</li>
              <li>Вентиляция передних сидений</li>
              <li>Массажные функции в передних сиденьях</li>
              <li>Память настройки положения сидений</li>
              <li>Система поддержки поясницы</li>
              <li>Регулируемый подголовник</li>
            </ul>
          </Col>
        </Row>
      </Flex>
    );
  return (
    <Row gutter={[24, 24]}>
      <Col span={8}>
        <Flex
          justify="space-between"
          align="center"
          style={{ marginBottom: 24 }}
        >
          <Typography.Title level={3} style={{ marginTop: 0, marginBottom: 0 }}>
            18 500 000 Т
          </Typography.Title>
          <Popover content={content} title="Title">
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
              $41 111
            </Typography.Text>
          </Col>
          <Col span={12}>
            <Typography.Text type="secondary">Доставка</Typography.Text>
          </Col>
          <Col span={12} style={{ textAlign: "right" }}>
            <Typography.Text style={{ fontSize: "1.2rem", fontWeight: 600 }}>
              До Алматы
            </Typography.Text>
          </Col>
        </Row>
        <Divider />
        <Row gutter={[12, 12]}>
          {items.map((el) => (
            <>
              <Col span={12}>
                <Typography.Text type="secondary">{el.label}</Typography.Text>
              </Col>
              <Col span={12}>
                <Typography.Text>{el.children}</Typography.Text>
              </Col>
            </>
          ))}
        </Row>
        <Order />
      </Col>
      <Col span={16} className="item_right">
        <Space direction="vertical" style={{ width: "100%" }}>
          <Image style={{ width: "100%" }} src={image} />
          <Row gutter={12}>
            {images.map((el) => (
              <Col key={el} span={4}>
                <Image
                  onClick={() => setImage(el)}
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
            <Col span={12}>
              <Typography.Title style={{ marginTop: 6 }} level={5}>
                Экстерьер / интерьер
              </Typography.Title>
              <ul
                style={{
                  listStyleType: "disc",
                  fontSize: "1rem",
                }}
              >
                <li>Люк на крыше</li>
                <li>Фары (Led)</li>
                <li>Алюминиевые диски</li>
                <li>Подогрев руля</li>
                <li>Мультруль</li>
                <li>Центразамок</li>
                <li>Подрулевые переключатели</li>
              </ul>
            </Col>
            <Col span={12}>
              <Typography.Title style={{ marginTop: 6 }} level={5}>
                Безопасность
              </Typography.Title>
              <ul
                style={{
                  listStyleType: "disc",
                  fontSize: "1rem",
                }}
              >
                <li>Система контроля давления в шинах (TPMS)</li>
                <li>Антиблокировочная система (ABS)</li>
                <li>Система стабилизации (ESP)</li>
                <li>Подушки безопасности</li>
                <li>Задний видеокамера</li>
                <li>Система помощи при парковке (Park Assist)</li>
                <li>Система контроля слепых зон (BLIS)</li>
              </ul>
            </Col>
            <Col span={12}>
              <Typography.Title style={{ marginTop: 6 }} level={5}>
                Удобство / Мультимедиа
              </Typography.Title>
              <ul
                style={{
                  listStyleType: "disc",
                  fontSize: "1rem",
                }}
              >
                <li>Система навигации</li>
                <li>Система голосового управления</li>
                <li>Bluetooth соединение</li>
                <li>USB порты</li>
                <li>Система автоматического климат-контроля</li>
                <li>Электропривод сидений</li>
                <li>Аудиосистема высокого качества</li>
              </ul>
            </Col>
            <Col span={12}>
              <Typography.Title style={{ marginTop: 6 }} level={5}>
                Сиденья
              </Typography.Title>
              <ul
                style={{
                  listStyleType: "disc",
                  fontSize: "1rem",
                }}
              >
                <li>Электрорегулировка сидений</li>
                <li>Подогрев передних сидений</li>
                <li>Вентиляция передних сидений</li>
                <li>Массажные функции в передних сиденьях</li>
                <li>Память настройки положения сидений</li>
                <li>Система поддержки поясницы</li>
                <li>Регулируемый подголовник</li>
              </ul>
            </Col>
          </Row>
        </Space>
      </Col>
    </Row>
  );
};

export default Item;
