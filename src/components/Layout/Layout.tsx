import { Row } from "antd";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../Header/Header";
import "./Layout.css";
import Footer from "../Footer/Footer";
import { isMobile } from "react-device-detect";
import { TabBar } from "antd-mobile";
import { useEffect, useRef } from "react";

const Layout = () => {
  const tabs = [
    {
      key: "message",
      title: "Каталог ОАЭ",
      icon: "🇦🇪",
    },
    {
      key: "todo",
      title: "Каталог Кореи",
      icon: "🇰🇷",
    },
    {
      key: "home",
      title: "Каталог Китая",
      icon: "🇨🇳",
    },
  ];
  const myElementRef = useRef<HTMLDivElement>(null);

  const { pathname } = useLocation();
  useEffect(() => {
    if (myElementRef.current) {
      myElementRef.current.scrollTo({ top: 0 });
    }
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
          <TabBar>
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
      <div className="content">
        <Row
          gutter={isMobile ? [0, 8] : [12, 24]}
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
