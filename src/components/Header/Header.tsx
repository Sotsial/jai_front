import { Flex, Space, Tabs, TabsProps } from "antd";
import { Header as AntdHeader } from "antd/es/layout/layout";
import logo from "src/assets/logo.png";
import "./Header.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <AntdHeader>
      <Flex justify="space-between">
        <Space size={24} align="center">
          <img src={logo} onClick={() => navigate("/")} className="logo" />
          <Tabs defaultActiveKey="1" items={items} defaultValue={"1"} />
        </Space>
      </Flex>
    </AntdHeader>
  );
};

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "Каталог ОАЭ",
  },
  {
    key: "2",
    label: "Каталог Кореи",
  },
  {
    key: "3",
    label: "Каталог Китай",
  },
];

export default Header;
