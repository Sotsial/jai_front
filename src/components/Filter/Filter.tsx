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
  Tooltip,
  Typography,
} from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import { RuleObject } from "antd/es/form";
import { separator } from "../RecordList/RecordItem/RecordItem";
import data from "src/mark.json";
import { ReloadOutlined } from "@ant-design/icons";

export const marks = data.map((el) => ({ value: el.mark }));

export const models = (mark: string) =>
  (
    data.find((el) => el.mark === mark)?.models as {
      id: string;
      name: string;
    }[]
  ).map((model) => ({ value: model.name }));

export const transmissionsOptions = (country: CountryType) => {
  if (country === "kr")
    return [
      { value: "Автомат" },
      { value: "Вариатор" },
      { value: "Механика" },
      { value: "Полуавтомат" },
      { value: "Другое" },
    ];

  return [{ value: "Автомат" }, { value: "Механика" }];
};

export const fuelOptions = (country: CountryType) => {
  const options = [
    { value: "Бензин" },
    { value: "Дизель" },
    { value: "Электро" },
    { value: "Гибрид" },
  ];

  if (country === "kr") options.push({ value: "Газ" });

  return options;
};

export const bodyOptions = (country: CountryType) => {
  if (country === "uae")
    return [
      { value: "Купе" },
      { value: "Другое" },
      { value: "Пикап" },
      { value: "Спорткар" },
      { value: "Внедорожник" },
      { value: "Седан" },
      { value: "Хэтчбек" },
      { value: "Кабриолет" },
      { value: "Фургон" },
      { value: "Универсал" },
      { value: "Кроссовер" },
    ];
  if (country === "ch")
    return [{ value: "Седан" }, { value: "Джип" }, { value: "Минивэн" }];
  if (country === "kr")
    return [
      { value: "Седан" },
      { value: "Внедорожник" },
      { value: "Спорткар" },
      { value: "Грузовой автомобиль" },
      { value: "Фургон" },
      { value: "Кемпер" },
      { value: "Другое" },
    ];
  return [];
};

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

  const brand = Form.useWatch("brand", form);

  const modelOptions = brand ? models(brand) : [];

  useEffect(() => {
    form.setFieldValue("model", undefined);
    handleFormValuesChange();
  }, [brand]);

  const { data } = useQuery({
    queryKey: ["list", country, formValueDebouce],
    queryFn: () => fetchFilter(country, formValueDebouce),
  });

  useEffect(() => {
    form.setFieldValue("transmissions_type", undefined);
    form.setFieldValue("body_type", undefined);
    form.setFieldValue("fuel_type", undefined);
    handleFormValuesChange();
  }, [country]);

  const handleFormValuesChange = () => {
    const allValues = form.getFieldsValue();
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

  const validateYearToMore = (_: RuleObject, value: any) => {
    const yearFrom = form.getFieldValue("yearFrom");
    if (yearFrom && value && value.year() < yearFrom.year()) {
      return Promise.reject(`Не может быть  раньше ${yearFrom.year()}г`);
    }
    return Promise.resolve();
  };

  const validateYearLess = (_: RuleObject, value: any) => {
    const yearFrom = form.getFieldValue("yearTo");
    if (yearFrom && value && value.year() > yearFrom.year()) {
      return Promise.reject(`Не может быть позже ${yearFrom.year()}г`);
    }
    return Promise.resolve();
  };

  const validatePriceToLess = (value: number, name: string) => {
    const priceFrom = form.getFieldValue(name);
    if (priceFrom !== undefined && value !== undefined && value < priceFrom) {
      return Promise.reject("Не может быть меньше " + priceFrom);
    }
    return Promise.resolve();
  };

  const validatePriceToMore = (value: number, name: string) => {
    const priceFrom = form.getFieldValue(name);
    if (priceFrom !== undefined && value !== undefined && value > priceFrom) {
      return Promise.reject("Не может быть больше " + priceFrom);
    }
    return Promise.resolve();
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
              <Select
                placeholder="Не выбрано"
                options={marks}
                showSearch
                allowClear
              />
            </Form.Item>
            <Form.Item label="Модель" name={"model"}>
              <Select
                placeholder={brand ? "Не выбрано" : "Выберите марку"}
                options={modelOptions}
                showSearch
                allowClear
              />
            </Form.Item>
            <Form.Item name={"delivery_city"} label="Доставка до города">
              <Select
                placeholder="Не выбрано"
                options={[{ value: "Астана" }, { value: "Алматы" }]}
                defaultValue={"Алматы"}
              />
            </Form.Item>
          </Col>
          <Col span={16} className="filter_container">
            <Typography.Title level={3} className="filter_container_title">
              Фильтр
            </Typography.Title>
            <Row gutter={12}>
              <Col span={6}>
                <Form.Item
                  name="yearFrom"
                  label="Год выпуска"
                  rules={[{ validator: validateYearLess }]}
                >
                  <DatePicker prefix={"от"} picker="year" />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  name="yearTo"
                  label=" "
                  rules={[{ validator: validateYearToMore }]}
                >
                  <DatePicker prefix={"до"} picker="year" />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  name="priceFrom"
                  label="Бюджет, KZT"
                  rules={[
                    {
                      validator: (_, value) =>
                        validatePriceToMore(value, "priceTo"),
                    },
                  ]}
                >
                  <InputNumber
                    min={0}
                    prefix={"от"}
                    formatter={(value) => separator(value)}
                    inputMode="numeric"
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  name="priceTo"
                  label=" "
                  rules={[
                    {
                      validator: (_, value) =>
                        validatePriceToLess(value, "priceFrom"),
                    },
                  ]}
                >
                  <InputNumber
                    min={0}
                    prefix={"до"}
                    formatter={(value) => separator(value)}
                    inputMode="numeric"
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item name={"transmissions_type"} label="КПП">
                  <Select
                    placeholder="Не выбрано"
                    options={transmissionsOptions(country)}
                    allowClear
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item name={"fuel_type"} label="Тип топливо">
                  <Select
                    placeholder="Не выбрано"
                    options={fuelOptions(country)}
                    allowClear
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item name={"body_type"} label="Тип кузова">
                  <Select
                    placeholder="Не выбрано"
                    options={bodyOptions(country)}
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
                  rules={[
                    {
                      validator: (_, value) =>
                        validatePriceToMore(value, "engineCapacityTo"),
                    },
                  ]}
                >
                  <InputNumber
                    min={0}
                    prefix={"от"}
                    inputMode="decimal"
                    addonAfter="см³"
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  name="engineCapacityTo"
                  label=" "
                  rules={[
                    {
                      validator: (_, value) =>
                        validatePriceToLess(value, "engineCapacityFrom"),
                    },
                  ]}
                >
                  <InputNumber
                    min={0}
                    prefix={"до"}
                    inputMode="decimal"
                    addonAfter="см³"
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  name="mileageFrom"
                  label="Пробег, км"
                  rules={[
                    {
                      validator: (_, value) =>
                        validatePriceToMore(value, "mileageTo"),
                    },
                  ]}
                >
                  <InputNumber
                    min={0}
                    prefix={"от"}
                    formatter={(value) => separator(value)}
                    inputMode="numeric"
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  name="mileageTo"
                  label=" "
                  rules={[
                    {
                      validator: (_, value) =>
                        validatePriceToLess(value, "mileageFrom"),
                    },
                  ]}
                >
                  <InputNumber
                    min={0}
                    prefix={"до"}
                    formatter={(value) => separator(value)}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col span={24} className="filter_button">
            <Flex align="center" gap={8} justify="center">
              <Button htmlType="submit" type="primary" size="large">
                Показать {data?.items_count ?? " "} объявлений
              </Button>
              <Tooltip title="Сбросить фильтр">
                <Button
                  onClick={() => form.resetFields()}
                  size="large"
                  icon={<ReloadOutlined />}
                />
              </Tooltip>
            </Flex>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Filter;
