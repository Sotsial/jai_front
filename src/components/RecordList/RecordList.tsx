import { Divider, Pagination, Select, Space, Typography } from "antd";
import RecordItem from "./RecordItem/RecordItem";
import { dataCars } from "./MockData";
import Advertising from "../Advertising/Advertising";
import { Fragment, useState } from "react";

const RecordList = () => {
  const [city, setCity] = useState("Алматы");
  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Space align="center">
        <Typography.Title level={3} style={{ margin: 0 }}>
          Доставка авто из Кореи до
        </Typography.Title>
        <Select
          value={city}
          onChange={setCity}
          options={[
            { label: "Алматы", value: "Алматы" },
            { label: "Астана", value: "Астана" },
          ]}
        />
      </Space>
      <Typography.Text>Найдено 53 765 объявлений</Typography.Text>
      <Typography.Text>
        <Space>
          Сортировать по:
          <Typography.Link underline>По умолчанию</Typography.Link>
        </Space>
      </Typography.Text>
      <Space direction="vertical" size={24}>
        {dataCars.map((el, index) => (
          <Fragment key={index}>
            <RecordItem {...el} city={city} />
            {(index + 1) % 3 === 0 && index !== 0 && <Advertising />}
          </Fragment>
        ))}
      </Space>
      <Divider />
      <Pagination
        showSizeChanger={false}
        total={500}
        showTotal={() => "Страницы"}
      />
    </Space>
  );
};

export default RecordList;
