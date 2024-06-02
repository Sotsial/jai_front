import "./Advertising.css";
import { isMobile } from "react-device-detect";
import { Adsense } from "@ctrl/react-adsense";

const Advertising = () => {
  if (isMobile)
    return (
      // <Card
      //   style={{ minHeight: "200px", textAlign: "center", borderRadius: 0 }}
      // >
      //   <Typography.Title level={2}>Рекламный баннер</Typography.Title>
      // </Card>
      <Adsense
        client="ca-pub-6168437561514335"
        slot="6338645549"
        format="auto"
      />
    );
  return (
    // <div className="advertising">
    //   <Space size={24}>
    //     <img src={carImage} className="car_image" />
    //     <Typography.Title className="advertising_text">
    //       Рекламный баннер
    //     </Typography.Title>
    //   </Space>
    // </div>
    <Adsense
      client="ca-pub-6168437561514335"
      slot="6338645549"
      format="auto"
      layout=""
    />
  );
};

export default Advertising;
