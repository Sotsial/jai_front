import { Col } from "antd";
import { isMobile } from "react-device-detect";
import Advertising from "src/components/Advertising/Advertising";
import Filter from "src/components/Filter/Filter";
import FilterMobile from "src/components/Filter/FilterMobile/FilterMobile";
import Notion from "src/components/Notion/Notion";
import RecordList from "src/components/RecordList/RecordList";

const MainPage = () => {
  if (isMobile)
    return (
      <>
        <Col span={24}>
          <Notion />
        </Col>
        <Col span={24}>
          <FilterMobile />
        </Col>
        <Col span={24}>
          <RecordList />
        </Col>
      </>
    );

  return (
    <>
      <Col span={24}>
        <Filter />
      </Col>
      <Col span={24}>
        <Advertising />
      </Col>
      <Col span={16}>
        <RecordList />
      </Col>
      <Col span={8}>
        <Notion />
      </Col>
    </>
  );
};

export default MainPage;
