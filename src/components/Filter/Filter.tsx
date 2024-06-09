import useStore, { CountryType, FilterParams } from "src/store/store";
import "./Filter.css";
import {
  Button,
  Col,
  DatePicker,
  Flex,
  Form,
  InputNumber,
  Row,
  Select,
  Typography,
} from "antd";
import axios from "axios";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useQuery } from "@tanstack/react-query";

export const transmissionsOptions = [
  { value: "Автомат" },
  { value: "Вариатор" },
  { value: "Механика" },
  { value: "Полуавтомат" },
  { value: "Другое" },
];

export const fuelOptions = [
  { value: "Бензин" },
  { value: "Дизель" },
  { value: "Электро" },
  { value: "Гибрид" },
  { value: "Газ" },
];

export const bodyOptions = [
  { value: "Седан" },
  { value: "Джип" },
  { value: "Минивэн" },
];

export const driveUnitOptions = [
  { value: "Задний" },
  { value: "Полный" },
  { value: "Передний" },
];

export const fetchFilter = async (
  country: CountryType,
  params?: FilterParams
): Promise<{ items_count: number }> => {
  const { data } = await axios.get(
    "https://jaicar.kz/api/v1/catalog/turnkey/" + country + "/count/",
    {
      params,
    }
  );
  return data;
};

const Filter = () => {
  const [form] = Form.useForm();
  const { country, setFilter, setCity } = useStore();

  const [formValue, setFormValue] = useState<FilterParams>();
  const [formValueDebouce] = useDebounce(formValue, 500);

  const { data } = useQuery({
    queryKey: ["list", country, formValueDebouce],
    queryFn: () => fetchFilter(country, formValueDebouce),
  });

  const handleFormValuesChange = (
    _: string,
    allValues: Record<string, any>
  ) => {
    if (allValues.yearFrom) {
      const yearFromDate = allValues.yearFrom;

      const yearFromAsString = yearFromDate.format("YYYY");

      allValues.yearFrom = yearFromAsString;
    }

    if (allValues.yearTo) {
      const yearFromDate = allValues.yearTo;

      const yearFromAsString = yearFromDate.format("YYYY");

      allValues.yearTo = yearFromAsString;
    }

    setFormValue(allValues);
  };

  const onFinish = (allValues: Record<string, any>) => {
    if (allValues.yearFrom) {
      const yearFromDate = allValues.yearFrom;

      const yearFromAsString = yearFromDate.format("YYYY");

      allValues.yearFrom = yearFromAsString;
    }

    if (allValues.yearTo) {
      const yearFromDate = allValues.yearTo;

      const yearFromAsString = yearFromDate.format("YYYY");

      allValues.yearTo = yearFromAsString;
    }
    setCity(allValues.delivery_city);
    setFilter(allValues);
  };

  return (
    <div className="filter">
      <Form
        layout={"vertical"}
        onValuesChange={handleFormValuesChange}
        form={form}
        onFinish={onFinish}
      >
        <Row>
          <Col span={8} className="filter_container search">
            <Typography.Title level={3} className="filter_container_title">
              Поиск
            </Typography.Title>
            <Form.Item label="Марка" name={"brand"}>
              <Select placeholder="Не выбрано" />
            </Form.Item>
            <Form.Item name={"delivery_city"} label="Доставка до города">
              <Select
                placeholder="Не выбрано"
                options={[{ value: "Астана" }, { value: "Алматы" }]}
              />
            </Form.Item>
          </Col>
          <Col span={16} className="filter_container">
            <Typography.Title level={3} className="filter_container_title">
              Фильтр
            </Typography.Title>
            <Row gutter={12}>
              <Col span={6}>
                <Form.Item name="yearFrom" label="Год выпуска">
                  <DatePicker prefix={"от"} picker="year" />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item name="yearTo" label=" ">
                  <DatePicker prefix={"до"} picker="year" />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item name="priceFrom" label="Бюджет, KZT">
                  <InputNumber min={0} prefix={"от"} />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item name="priceTo" label=" ">
                  <InputNumber min={0} prefix={"до"} />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item name={"transmissions_type"} label="КПП">
                  <Select
                    placeholder="Не выбрано"
                    options={transmissionsOptions}
                    allowClear
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item name={"fuel_type"} label="Тип топливо">
                  <Select
                    placeholder="Не выбрано"
                    options={fuelOptions}
                    allowClear
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item name={"body_type"} label="Тип кузова">
                  <Select
                    placeholder="Не выбрано"
                    options={bodyOptions}
                    allowClear
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Привод">
                  <Select
                    placeholder="Не выбрано"
                    options={driveUnitOptions}
                    allowClear
                  />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item
                  name="engineCapacityFrom"
                  label="Объем двигателя, см3"
                >
                  <InputNumber min={0} prefix={"от"} />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item name="engineCapacityTo" label=" ">
                  <InputNumber min={0} prefix={"до"} />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item name="mileageFrom" label="Пробег, км">
                  <InputNumber min={0} prefix={"от"} />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item name="mileageTo" label=" ">
                  <InputNumber min={0} prefix={"до"} />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col span={24} className="filter_button">
            <Flex align="center" justify="center">
              <Button htmlType="submit" type="primary" size="large">
                Показать {data?.items_count} объявлений
              </Button>
            </Flex>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Filter;
