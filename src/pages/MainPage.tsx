import { Col } from "antd";
import { isMobile } from "react-device-detect";
import Advertising from "src/components/Advertising/Advertising";
import Filter from "src/components/Filter/Filter";
import RecordList from "src/components/RecordList/RecordList";

const MainPage = () => {
  if (isMobile)
    return (
      <>
        <Col span={24}>
          <Filter />
        </Col>
        <Col span={24}>
          <RecordList />
        </Col>
        <Col span={24}>
          <Advertising type={2} />
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
        <Advertising type={2} />
      </Col>
    </>
  );
};

export default MainPage;
