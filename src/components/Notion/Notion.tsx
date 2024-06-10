import { Adsense } from "@ctrl/react-adsense";
import { Flex, Typography } from "antd";
import { isMobile } from "react-device-detect";
import { useNavigate } from "react-router-dom";
import logo from "src/assets/logo-white.png";

const Notion = () => {
  const navigate = useNavigate();
  if (isMobile)
    return (
      <Flex
        style={{
          padding: 6,
          paddingInline: 12,
          backgroundColor: "#1c1819",
        }}
        align="center"
        gap={32}
      >
        <img
          src={logo}
          onClick={() => navigate("/")}
          style={{ maxHeight: 44 }}
        />
        <Typography.Text
          style={{ color: "#fff", fontSize: "0.8rem", textWrap: "balance" }}
        >
          Посчитанные автомобили из Кореи, ОАЭ, Китая "под ключ" с учетом всех
          расходов
        </Typography.Text>
      </Flex>
    );

  return (
    <Adsense client="ca-pub-6168437561514335" slot="6338645549" format="auto" />
  );
};

{
  /* <Space size={24} direction="vertical" style={{ paddingTop: 36 }}>
        <img src={carImage} className="car_image" />
        <div style={{ paddingInline: 24 }}>
          <Typography.Title level={2} className="advertising_text">
            Посчитанные автомобили с учетом всех расходов
          </Typography.Title>
          <Typography.Paragraph>
            <ul
              style={{
                color: "#fff",
                listStyleType: "disc",
                fontSize: "1.3rem",
              }}
            >
              <li>Надежный импорт</li>
              <li>Быстрая доставка</li>
            </ul>
          </Typography.Paragraph>
        </div>
      </Space> */
}

export default Notion;
