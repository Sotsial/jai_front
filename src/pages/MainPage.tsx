import { Affix, Col } from "antd";
import { useState } from "react";
import { isMobile } from "react-device-detect";
import Advertising from "src/components/Advertising/Advertising";
import Filter from "src/components/Filter/Filter";
import FilterMobile, {
  FilterButtonMobile,
} from "src/components/Filter/FilterMobile/FilterMobile";
import Notion from "src/components/Notion/Notion";
import RecordList from "src/components/RecordList/RecordList";

const MainPage = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  if (isMobile) {
    if (filterOpen)
      return <FilterMobile onClose={() => setFilterOpen(false)} />;
    return (
      <>
        <Col span={24}>
          <Notion />
        </Col>
        <Col span={24}>
          <FilterButtonMobile onClick={() => setFilterOpen(true)} />
        </Col>
        <Col span={24}>
          <RecordList />
        </Col>
      </>
    );
  }

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
        <Affix offsetTop={16}>
          <Notion />
        </Affix>
      </Col>
    </>
  );
};

export default MainPage;
