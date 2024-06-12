import {
  Button,
  Col,
  DatePicker,
  Flex,
  InputNumber,
  Row,
  Space,
  Typography,
} from "antd";
import { Form, Picker } from "antd-mobile";
import {
  bodyOptions,
  driveUnitOptions,
  fetchCities,
  fetchFilter,
  fuelOptions,
  marks,
  models,
  transmissionsOptions,
} from "../Filter";
import { CloseOutlined, ReloadOutlined } from "@ant-design/icons";
import useStore, { FilterParams } from "src/store/store";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import "./FilterMobile.css";
import { separator } from "src/components/RecordList/RecordItem/RecordItem";
import { RuleObject } from "antd/es/form";

export const FilterButtonMobile = ({ onClick }: { onClick: () => void }) => {
  const { setFilter } = useStore();
  return (
    <Flex style={{ paddingInline: 8 }} gap={8}>
      <Button
        block
        size="large"
        onClick={onClick}
        style={{ backgroundColor: "#1c1819", color: "#fff", borderRadius: 12 }}
      >
        Фильтр
      </Button>
      <Button
        onClick={() => setFilter({})}
        size="large"
        icon={<ReloadOutlined />}
      />
    </Flex>
  );
};

export const FilterMobile = ({ onClose }: { onClose: () => void }) => {
  const [formValue, setFormValue] = useState<FilterParams>();
  const [formValueDebouce] = useDebounce(formValue, 500);

  const { country, setFilter, setCity, filter, setSort } = useStore();
  const [firstCountry] = useState(country);

  const [form] = Form.useForm();

  const { data: cities } = useQuery({
    queryKey: ["list", country],
    queryFn: () => fetchCities(country),
  });

  const citiesOptions =
    cities?.map((el) => ({ value: el.delivery_city })) ?? [];

  const { data } = useQuery({
    queryKey: ["list", country, formValueDebouce],
    queryFn: () => fetchFilter(country, formValueDebouce),
  });

  const brand = Form.useWatch("brand", form);

  const modelOptions = brand ? models(brand, country) : [];

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
    setSort(allValues.sort);
    onClose();
  };

  useEffect(() => {
    if (filter) form.setFieldsValue(filter);
  }, [filter]);

  useEffect(() => {
    if (firstCountry !== country) {
      form.setFieldValue("transmissions_type", undefined);
      form.setFieldValue("body_type", undefined);
      form.setFieldValue("fuel_type", undefined);
    }

    if (
      !citiesOptions?.some(
        (el) => el.value === form.getFieldValue("delivery_city")
      )
    ) {
      form.setFieldValue("delivery_city", "Алматы");
    }
    handleFormValuesChange();
  }, [country]);

  useEffect(() => {
    if (!modelOptions?.some((el) => el.value === form.getFieldValue("model"))) {
      form.setFieldValue("model", undefined);
    }
    if (
      !marks(country)?.some((el) => el.value === form.getFieldValue("brand"))
    ) {
      form.setFieldValue("brand", undefined);
    }
    handleFormValuesChange();
  }, [country]);

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
    <>
      <Flex
        style={{
          padding: 12,
          backgroundColor: "#1c1819",
          width: "100%",
        }}
        align="center"
        justify="space-between"
      >
        <Typography.Text style={{ color: "#fff" }}>Фильтр</Typography.Text>
        <Button
          onClick={onClose}
          icon={<CloseOutlined />}
          type="text"
          style={{ color: "#fff" }}
        />
      </Flex>
      <Form
        form={form}
        layout="vertical"
        style={{ width: "100%" }}
        footer={
          <Space direction="vertical" style={{ width: "100%" }}>
            <Button block htmlType="submit" type="primary" size="large">
              Показать {data?.items_count ?? " "} объявлений
            </Button>
            <Button
              block
              size="large"
              onClick={() => {
                form.resetFields();
                handleFormValuesChange();
              }}
            >
              Сбросить фильтр
            </Button>
          </Space>
        }
        className="filter_mobile"
        onValuesChange={handleFormValuesChange}
        onFinish={onFinish}
      >
        <Form.Item layout="horizontal" label="Сортировать по" name={"sort"}>
          <MoblieSelect
            options={[
              { value: "", label: "По умолчанию" },
              { value: "yearSort", label: "году выпуска" },
              { value: "priceSort", label: "цене" },
            ]}
            clear={false}
            sort
          />
        </Form.Item>
        <Form.Item layout="horizontal" label="Марка" name={"brand"}>
          <MoblieSelect
            options={marks(country)}
            onFieldChange={() => {
              form.setFieldValue("model", undefined);
              handleFormValuesChange();
            }}
          />
        </Form.Item>
        {brand && (
          <Form.Item layout="horizontal" label="Модель" name={"model"}>
            <MoblieSelect options={modelOptions} />
          </Form.Item>
        )}
        <Form.Item
          layout="horizontal"
          name={"delivery_city"}
          label="Доставка до"
          initialValue={"Алматы"}
        >
          <MoblieSelect options={citiesOptions} clear={false} />
        </Form.Item>

        <Row gutter={12} style={{ width: "100%" }}>
          <Col span={12}>
            <Form.Item
              name="yearFrom"
              label="Год выпуска"
              rules={[{ validator: validateYearLess }]}
            >
              <DatePicker prefix={"от"} picker="year" placeholder="От" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="yearTo"
              label={<div style={{ opacity: 0 }}>1</div>}
              rules={[{ validator: validateYearToMore }]}
            >
              <DatePicker prefix={"до"} picker="year" placeholder="До" />
            </Form.Item>
          </Col>
          <Col span={12}>
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
                placeholder={"От"}
                formatter={(value) => separator(value)}
                inputMode="numeric"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="priceTo"
              label={<div style={{ opacity: 0 }}>1</div>}
              rules={[
                {
                  validator: (_, value) =>
                    validatePriceToLess(value, "priceFrom"),
                },
              ]}
            >
              <InputNumber
                min={0}
                placeholder={"До"}
                formatter={(value) => separator(value)}
                inputMode="numeric"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
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
                placeholder={"От"}
                formatter={(value) => separator(value)}
                inputMode="numeric"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="mileageTo"
              label={<div style={{ opacity: 0 }}>1</div>}
              rules={[
                {
                  validator: (_, value) =>
                    validatePriceToLess(value, "mileageFrom"),
                },
              ]}
            >
              <InputNumber
                min={0}
                placeholder={"До"}
                formatter={(value) => separator(value)}
                inputMode="numeric"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="engineCapacityFrom"
              label={
                <div style={{ textWrap: "nowrap" }}>Объем двигателя, см3</div>
              }
              rules={[
                {
                  validator: (_, value) =>
                    validatePriceToMore(value, "engineCapacityTo"),
                },
              ]}
            >
              <InputNumber
                min={0}
                placeholder={"До"}
                inputMode="decimal"
                addonAfter="см³"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="engineCapacityTo"
              label={<div style={{ opacity: 0 }}>1</div>}
              rules={[
                {
                  validator: (_, value) =>
                    validatePriceToLess(value, "engineCapacityFrom"),
                },
              ]}
            >
              <InputNumber
                min={0}
                placeholder={"До"}
                inputMode="decimal"
                addonAfter="см³"
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item layout="horizontal" name={"transmissions_type"} label="КПП">
          <MoblieSelect options={transmissionsOptions(country)} />
        </Form.Item>

        <Form.Item layout="horizontal" name={"fuel_type"} label="Тип топливо">
          <MoblieSelect options={fuelOptions(country)} />
        </Form.Item>

        <Form.Item layout="horizontal" name={"body_type"} label="Тип кузова">
          <MoblieSelect options={bodyOptions(country)} />
        </Form.Item>
        <Form.Item layout="horizontal" label="Привод">
          <MoblieSelect options={driveUnitOptions} />
        </Form.Item>
      </Form>
    </>
  );
};

export default FilterMobile;

const MoblieSelect = ({
  options,
  value,
  onChange,
  defaultValue,
  onFieldChange,
  clear = true,
  sort,
}: {
  options?: { label: string; value: string }[] | { value: string }[];
  value?: string;
  onChange?: (v: string) => void;
  defaultValue?: string;
  onFieldChange?: () => void;
  clear?: boolean;
  sort?: boolean;
}) => {
  // @ts-ignore
  const opt: { label: string; value: string }[] = options?.[0]?.label
    ? options
    : options?.map((el) => ({ value: el.value, label: el.value }));

  const columns = clear ? [{ label: "Не выбрано", value: "" }, ...opt] : opt;
  return (
    <Picker
      columns={[columns]}
      value={value ? [value] : []}
      confirmText="Выбрать"
      cancelText="Закрыть"
      onConfirm={(v) => {
        // @ts-ignore
        onChange?.(v?.[0]);
        onFieldChange?.();
      }}
      defaultValue={defaultValue ? [defaultValue] : undefined}
    >
      {(value, actions) => {
        return (
          <Button style={{ float: "right" }} type="link" onClick={actions.open}>
            {value[0]?.label
              ? value[0]?.label
              : sort
              ? "По умолчанию"
              : "Выбрать"}
          </Button>
        );
      }}
    </Picker>
  );
};
