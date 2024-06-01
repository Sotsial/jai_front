import { Space, Typography } from "antd";
import { isMobile } from "react-device-detect";
import carImage from "src/assets/car.png";

const Notion = () => {
  if (isMobile)
    return (
      <div style={{ padding: 12, backgroundColor: "#1c1819" }}>
        <Typography.Text style={{ color: "#fff" }}>
          Посчитанные автомобили из Кореи, ОАЭ, Китая "под ключ" с учетом всех
          расходов
        </Typography.Text>
      </div>
    );

  return (
    <div className="advertising">
      <Space size={24} direction="vertical" style={{ paddingTop: 36 }}>
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
      </Space>
    </div>
  );
};

export default Notion;
