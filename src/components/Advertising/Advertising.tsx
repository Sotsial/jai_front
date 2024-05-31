import { Space, Typography } from "antd";
import "./Advertising.css";
import carImage from "src/assets/car.png";

const Advertising = ({ type = 1 }: { type?: number }) => {
  if (type === 1)
    return (
      <div className="advertising">
        <Space size={24}>
          <img src={carImage} className="car_image" />
          <Typography.Title className="advertising_text">
            Рекламный баннер
          </Typography.Title>
        </Space>
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

export default Advertising;
