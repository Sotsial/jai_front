import { Card, Space, Typography } from "antd";
import "./Advertising.css";
import carImage from "src/assets/car.png";
import { isMobile } from "react-device-detect";

const Advertising = () => {
  if (isMobile)
    return (
      <Card
        style={{ minHeight: "200px", textAlign: "center", borderRadius: 0 }}
      >
        <Typography.Title level={2}>Рекламный баннер</Typography.Title>
      </Card>
    );
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
};

export default Advertising;
