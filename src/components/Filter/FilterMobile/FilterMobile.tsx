import {
  Button,
  Col,
  DatePicker,
  Flex,
  InputNumber,
  Row,
  Typography,
} from "antd";
import { Form, Picker } from "antd-mobile";
import {
  bodyOptions,
  driveUnitOptions,
  fetchFilter,
  fuelOptions,
  transmissionsOptions,
} from "../Filter";
import { CloseOutlined } from "@ant-design/icons";
import useStore, { FilterParams } from "src/store/store";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import "./FilterMobile.css";
import { separator } from "src/components/RecordList/RecordItem/RecordItem";

export const FilterButtonMobile = ({ onClick }: { onClick: () => void }) => {
  return (
    <div style={{ paddingInline: 8 }}>
      <Button
        block
        size="large"
        onClick={onClick}
        style={{ backgroundColor: "#1c1819", color: "#fff", borderRadius: 12 }}
      >
        Фильтр
      </Button>
    </div>
  );
};

const cities = [
  { label: "Астана", value: "Астана" },
  { label: "Алматы", value: "Алматы" },
];

export const FilterMobile = ({ onClose }: { onClose: () => void }) => {
  const [formValue, setFormValue] = useState<FilterParams>();
  const [formValueDebouce] = useDebounce(formValue, 500);

  const { country, setFilter, setCity } = useStore();

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
    onClose();
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
        layout="vertical"
        style={{ width: "100%" }}
        footer={
          <Button block htmlType="submit" type="primary" size="large">
            Показать {data?.items_count} объявлений
          </Button>
        }
        className="filter_mobile"
        onValuesChange={handleFormValuesChange}
        onFinish={onFinish}
      >
        <Form.Item layout="horizontal" label="Марка" name={"brand"}>
          <MoblieSelect options={[]} />
        </Form.Item>
        <Form.Item
          layout="horizontal"
          name={"delivery_city"}
          label="Доставка до"
        >
          <MoblieSelect options={cities} />
        </Form.Item>

        <Row gutter={12} style={{ width: "100%" }}>
          <Col span={12}>
            <Form.Item name="yearFrom" label="Год выпуска">
              <DatePicker prefix={"от"} picker="year" placeholder="От" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="yearTo"
              label={<div style={{ opacity: 0 }}>1</div>}
            >
              <DatePicker prefix={"до"} picker="year" placeholder="До" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="priceFrom" label="Бюджет, KZT">
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
            <Form.Item name="mileageFrom" label="Пробег, км">
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
          <MoblieSelect options={transmissionsOptions} />
        </Form.Item>

        <Form.Item layout="horizontal" name={"fuel_type"} label="Тип топливо">
          <MoblieSelect options={fuelOptions} />
        </Form.Item>

        <Form.Item layout="horizontal" name={"body_type"} label="Тип кузова">
          <MoblieSelect options={bodyOptions} />
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
}: {
  options: { label: string; value: string }[] | { value: string }[];
  value?: string;
  onChange?: (v: string) => void;
}) => {
  const opt = options.map((el) => ({ value: el.value, label: el.value }));
  return (
    <Picker
      columns={[opt]}
      value={value ? [value] : []}
      confirmText="Выбрать"
      cancelText="Закрыть"
      onConfirm={(v) => {
        // @ts-ignore
        onChange?.(v[0]);
      }}
    >
      {(value, actions) => {
        return (
          <Button style={{ float: "right" }} type="link" onClick={actions.open}>
            {value[0]?.label ?? "Выбрать"}
          </Button>
        );
      }}
    </Picker>
  );
};
