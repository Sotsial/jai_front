import { Breadcrumb, Col, Divider, Flex, Select, Typography } from "antd";
import { isMobile } from "react-device-detect";
import { useNavigate } from "react-router-dom";
import Advertising from "src/components/Advertising/Advertising";
import Item from "src/components/Item/Item";
import Order from "src/components/Order/Order";

const ItemPage = () => {
  const navigate = useNavigate();
  if (isMobile)
    return (
      <>
        <Flex
          justify="space-between"
          style={{
            padding: 12,
            backgroundColor: "#1c1819",
            width: "100%",
            color: "#fff",
            fontSize: "1.2rem",
          }}
          align="center"
        >
          <strong onClick={() => navigate("/")}>Jai logo</strong>
          <Select
            className="lang_select"
            defaultValue="ru"
            variant="borderless"
            popupMatchSelectWidth
            options={[
              { value: "ru", label: "RU" },
              { value: "kz", label: "KAZ" },
            ]}
          />
        </Flex>
        <Col span={24}>
          <Item />
        </Col>
        <Col span={24} style={{ paddingInline: 18 }}>
          <Order />
        </Col>
      </>
    );

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
