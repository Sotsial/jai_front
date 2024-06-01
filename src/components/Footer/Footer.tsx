import { Divider, Flex, Space, Typography } from "antd";
import "./Footer.css";
import { InstagramOutlined, YoutubeOutlined } from "@ant-design/icons";

const Footer = () => {
  return (
    <div className="footer">
      <div
        style={{
          maxWidth: 1280,
          paddingTop: 24,
          paddingBottom: 12,
          margin: "0 auto",
        }}
      >
        <Flex justify="space-between">
          <Space size={12} direction="vertical">
            <Typography.Text type="secondary" style={{ cursor: "pointer" }}>
              Сотрудничество
            </Typography.Text>
            <Typography.Text type="secondary" style={{ cursor: "pointer" }}>
              Пользовательское соглашение
            </Typography.Text>
            <Typography.Text type="secondary" style={{ cursor: "pointer" }}>
              Политика конфенденциальности
            </Typography.Text>
          </Space>
          <Space size={12} direction="vertical">
            <Typography.Text type="secondary" style={{ cursor: "pointer" }}>
              Скачать приложение
            </Typography.Text>
            <Typography.Text type="secondary" style={{ cursor: "pointer" }}>
              Мобильная верстка сайта
            </Typography.Text>
          </Space>
          <div />
          <Space direction="vertical">
            <Typography.Text type="secondary">
              Следите за нашими новостями
            </Typography.Text>
            <Flex
              gap={12}
              style={{ fontSize: 20, cursor: "pointer" }}
              align="center"
            >
              <InstagramOutlined />
              <YoutubeOutlined />
            </Flex>
          </Space>
        </Flex>
        <Divider style={{ marginBottom: 12, marginTop: 24 }} />
        <Typography.Text type="secondary">
          © 2022-2024 Jai international
        </Typography.Text>
      </div>
    </div>
  );
};

export default Footer;
