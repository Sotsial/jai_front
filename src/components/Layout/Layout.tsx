import { Row } from "antd";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import "./Layout.css";
import Footer from "../Footer/Footer";
import { isMobile } from "react-device-detect";

const Layout = () => {
  return (
    <>
      {!isMobile && <Header />}
      <div className="content">
        <Row gutter={[12, 24]} style={{ paddingTop: 24 }}>
          <Outlet />
        </Row>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
