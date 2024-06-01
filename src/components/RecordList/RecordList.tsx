import { Card, Divider, Pagination, Space, Typography } from "antd";
import RecordItem from "./RecordItem/RecordItem";
import { dataCars } from "./MockData";
import Advertising from "../Advertising/Advertising";
import { Fragment, useState } from "react";
import CitySelect from "./CitySelect/CitySelect";
import { isMobile } from "react-device-detect";

const RecordList = () => {
  const [city, setCity] = useState("Алматы");
  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <CitySelect city={city} setCity={setCity} />
      {isMobile && (
        <Typography.Title
          level={3}
          style={{ paddingInline: 8, marginTop: 4, marginBottom: 0 }}
        >
          Результаты поиска
        </Typography.Title>
      )}
      <Space direction="vertical" size={isMobile ? 8 : 24}>
        {dataCars.map((el, index) => (
          <Fragment key={index}>
            <RecordItem {...el} city={city} />
            {(index + 1) % 3 === 0 && index !== 0 && <Advertising />}
          </Fragment>
        ))}
      </Space>
      {!isMobile && <Divider />}
      {isMobile ? (
        <Card>
          <Pagination showSizeChanger={false} total={500} />
        </Card>
      ) : (
        <Pagination
          showSizeChanger={false}
          total={500}
          showTotal={() => "Страницы"}
        />
      )}
    </Space>
  );
};

export default RecordList;
