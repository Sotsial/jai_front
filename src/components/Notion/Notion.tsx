import { Adsense } from "@ctrl/react-adsense";
import { Flex, Typography } from "antd";
import { isMobile } from "react-device-detect";

const Notion = () => {
  if (isMobile)
    return (
      <Flex
        style={{
          padding: 12,
          backgroundColor: "#1c1819",
        }}
        align="center"
        gap={32}
      >
        <div style={{ color: "#fff", fontWeight: 600 }}>LOGO</div>
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
