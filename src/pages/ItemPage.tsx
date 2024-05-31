import { Breadcrumb, Col, Divider, Typography } from "antd";
import Advertising from "src/components/Advertising/Advertising";
import Item from "src/components/Item/Item";

const ItemPage = () => {
  return (
    <>
      <Col span={24}>
        <Advertising />
      </Col>

      <Col span={24}>
        <Breadcrumb
          items={[
            {
              title: "Главная",
              path: "/",
            },
            {
              title: "Каталог ОАЭ",
              path: "/",
            },
            {
              title: "Toyota",
              path: "/",
            },
          ]}
        />
      </Col>

      <Typography.Title level={2} style={{ margin: 0 }}>
        Toyota Camry
      </Typography.Title>
      <Divider style={{ margin: "8px 0" }} />
      <Col span={24}>
        <Item />
      </Col>
    </>
  );
};

export default ItemPage;
