import { Flex, Space, Tabs, TabsProps } from "antd";
import { Header as AntdHeader } from "antd/es/layout/layout";
import logo from "src/assets/logo.png";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import useStore, { CountryType } from "src/store/store";

const Header = () => {
  const navigate = useNavigate();

  const { country, setCountry } = useStore();

  return (
    <AntdHeader>
      <Flex justify="space-between">
        <Space size={24} align="center">
          <img src={logo} onClick={() => navigate("/")} className="logo" />
          <Tabs
            activeKey={country}
            onChange={(country) => setCountry(country as CountryType)}
            items={items}
          />
        </Space>
      </Flex>
    </AntdHeader>
  );
};

const items: TabsProps["items"] = [
  {
    key: "uae",
    label: "Каталог ОАЭ",
  },
  {
    key: "kr",
    label: "Каталог Кореи",
  },
  {
    key: "ch",
    label: "Каталог Китай",
  },
];

export default Header;
