import { Typography } from "antd";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div
        style={{
          maxWidth: 1280,
          paddingTop: 24,
          paddingBottom: 24,
          margin: "0 auto",
        }}
      >
        <Typography.Text type="secondary">
          © 2022-2024 Jai international
        </Typography.Text>
      </div>
    </div>
  );
};

export default Footer;
