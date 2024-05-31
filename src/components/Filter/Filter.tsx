import "./Filter.css";
import { Button, Col, Flex, Form, Input, Row, Select, Typography } from "antd";

const Filter = () => {
  const [form] = Form.useForm();
  return (
    <div className="filter">
      <Form layout={"vertical"} form={form}>
        <Row>
          <Col span={8} className="filter_container search">
            <Typography.Title level={3} className="filter_container_title">
              Поиск
            </Typography.Title>
            <Form.Item label="Марка">
              <Select placeholder="Не выбрано" />
            </Form.Item>
            <Form.Item label="Доставка до города">
              <Select placeholder="Не выбрано" />
            </Form.Item>
          </Col>
          <Col span={16} className="filter_container">
            <Typography.Title level={3} className="filter_container_title">
              Фильтр
            </Typography.Title>
            <Row gutter={12}>
              <Col span={12}>
                <Form.Item label="Год выпуска">
                  <Input prefix={"от"} style={{ width: "50%" }} />
                  <Input prefix={"до"} style={{ width: "50%" }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Бюджет, KZT">
                  <Input prefix={"от"} style={{ width: "50%" }} />
                  <Input prefix={"до"} style={{ width: "50%" }} />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="КПП">
                  <Select placeholder="Не выбрано" />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Тип топливо">
                  <Select placeholder="Не выбрано" />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Тип кузова">
                  <Select placeholder="Не выбрано" />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Привод">
                  <Select placeholder="Не выбрано" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Объем двигателя, см3">
                  <Input prefix={"от"} style={{ width: "50%" }} />
                  <Input prefix={"до"} style={{ width: "50%" }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Пробег, км">
                  <Input prefix={"от"} style={{ width: "50%" }} />
                  <Input prefix={"до"} style={{ width: "50%" }} />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col span={24} className="filter_button">
            <Flex align="center" justify="center">
              <Button type="primary" size="large">
                Показать 53 765 объявлений
              </Button>
            </Flex>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Filter;
