import { InstagramOutlined } from "@ant-design/icons";
import { Button, Card, Flex, Popover, Space, Typography } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom";
import useStore, { CityType, CountryType } from "src/store/store";
import CalculationModal from "../CalculationModal/CalculationModal";

export interface SupplierVM {
  delivery_city: string;
  name: string;
  description: string;
  phone: string;
  links: { instagram: string; website: string };
  service_price: number;
  service_price_kzt: number;
  delivery_price: number;
  delivery_price_kzt: number;
  total_price: number;
  total_price_kzt: number;
}

export const fetchSuppliers = async ({
  catalog,
  city = "Алматы",
}: {
  catalog: CountryType;
  city: CityType;
}): Promise<{ suppliers: SupplierVM[] }> => {
  const { data } = await axios.get(
    "https://jaicar.kz/api/v1/catalog/supplier/",
    { params: { catalog, city } }
  );
  return data;
};

const Order = ({ data }: { data?: { suppliers: SupplierVM[] } }) => {
  const { country } = useStore();

  if (!data || !data.suppliers) return;

  return (
    <Space direction="vertical" style={{ paddingBottom: 12, width: "100%" }}>
      <Typography.Title level={4} style={{ marginBottom: 4, marginTop: 4 }}>
        Заказать авто:
      </Typography.Title>

      {data?.suppliers.map((el, index) => (
        <Card
          key={index}
          title={
            <Flex justify="space-between" align="center">
              <Typography.Title level={4} style={{ margin: 0 }}>
                {el.name}
              </Typography.Title>
              <Space>
                {el.links.instagram && (
                  <InstagramOutlined
                    style={{ fontSize: 22, cursor: "pointer" }}
                  />
                )}
              </Space>
              <Popover
                content={
                  <CalculationModal
                    country={country}
                    price={{
                      total_price: el?.total_price,
                      total_price_kzt: el?.total_price_kzt,
                      delivery_price: el.delivery_price,
                      delivery_price_kzt: el.delivery_price_kzt,
                      service_price: el?.service_price,
                      service_price_kzt: el.service_price_kzt,
                    }}
                  />
                }
              >
                <Button>Полный расчет</Button>
              </Popover>
            </Flex>
          }
          bordered={false}
          style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)" }}
        >
          <Space direction="vertical">
            <Typography.Text type="secondary">{el.description}</Typography.Text>
            <WhatsAppLinkButton phoneNumber={el.phone} />
          </Space>
        </Card>
      ))}
    </Space>
  );
};

export default Order;

const WhatsAppLinkButton = ({ phoneNumber }: { phoneNumber: string }) => {
  const { id, country, city } = useParams();

  const createWhatsAppLink = (phoneNumber: string) => {
    const cleanedNumber = phoneNumber.replace(/[\s()\-]/g, "");
    return `https://wa.me/${cleanedNumber}?text=Здравствуйте,%20интересует%20ваше%20объявление%20https://jai-front.vercel.app/item/${country}/${city}/${id}`;
  };

  const link = createWhatsAppLink(phoneNumber);

  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      <Button size="large" block type="primary">
        Заказать авто
      </Button>
    </a>
  );
};
