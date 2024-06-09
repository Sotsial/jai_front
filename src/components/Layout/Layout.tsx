import { Row } from "antd";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../Header/Header";
import "./Layout.css";
import Footer from "../Footer/Footer";
import { isMobile } from "react-device-detect";
import { TabBar } from "antd-mobile";
import { useEffect, useRef } from "react";
import useStore, { CountryType } from "src/store/store";

const tabs = [
  {
    key: "uae",
    title: "Каталог ОАЭ",
    icon: "🇦🇪",
  },
  {
    key: "kr",
    title: "Каталог Кореи",
    icon: "🇰🇷",
  },
  {
    key: "ch",
    title: "Каталог Китая",
    icon: "🇨🇳",
  },
];

export const countryName = (country?: CountryType) => {
  let name = "ОАЭ";
  switch (country) {
    case "ch":
      name = "Китая";
      break;
    case "uae":
      name = "ОАЭ";
      break;
    case "kr":
      name = "Кореи";
      break;

    default:
      break;
  }
  return name;
};

const Layout = () => {
  const myElementRef = useRef<HTMLDivElement>(null);

  const { country, setCountry } = useStore();

  const { pathname } = useLocation();

  useEffect(() => {
    if (myElementRef.current) {
      myElementRef.current.scrollTo({ top: 0 });
    }
    console.log(myElementRef.current?.scrollTop);
  }, [pathname]);

  if (isMobile)
    return (
      <>
        <div ref={myElementRef} className="content_mobile">
          <Row
            gutter={isMobile ? [0, 8] : [12, 24]}
            style={{ paddingTop: isMobile ? 0 : 24 }}
          >
            <Outlet />
          </Row>
        </div>
        <div className={"bottom"}>
          <TabBar
            activeKey={country}
            onChange={(country) => setCountry(country as CountryType)}
          >
            {tabs.map((item) => (
              <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
            ))}
          </TabBar>
        </div>
      </>
    );

  return (
    <>
      <Header />
      <div className="content" ref={myElementRef}>
        <Row
          gutter={isMobile ? [0, 8] : [12, 18]}
          style={{ paddingTop: isMobile ? 0 : 24 }}
        >
          <Outlet />
        </Row>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
