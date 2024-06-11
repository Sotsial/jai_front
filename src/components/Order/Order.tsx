import { InstagramOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Button, Card, Flex, Space, Typography } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom";
import useStore, { CityType, CountryType } from "src/store/store";

interface SupplierVM {
  delivery_city: string;
  name: string;
  description: string;
  phone: string;
  links: { instagram: string; website: string };
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

const Order = () => {
  const { country, city } = useStore();
  console.log(city);
  const { data } = useQuery({
    queryKey: ["suppliers", country, city],
    queryFn: () => fetchSuppliers({ catalog: country, city }),
  });

  return (
    <Space direction="vertical" style={{ paddingBottom: 12 }}>
      <Typography.Title level={4} style={{ marginBottom: 4, marginTop: 4 }}>
        Заказать авто:
      </Typography.Title>
      {data?.suppliers.map((el) => (
        <Card
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
  const { id, country } = useParams();

  const createWhatsAppLink = (phoneNumber: string) => {
    const cleanedNumber = phoneNumber.replace(/[\s()\-]/g, "");
    return `https://wa.me/${cleanedNumber}?text=Здравствуйте,%20интересует%20ваше%20объявление%20https://jai-front.vercel.app/item/${country}/${id}`;
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
