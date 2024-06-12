import { useQuery } from "@tanstack/react-query";
import { Flex, Space, Typography } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom";
import useStore, { CountryType } from "src/store/store";
import "./CalculationModal.css";
import { separator } from "../RecordList/RecordItem/RecordItem";

const { Text, Title } = Typography;

interface CarPricing {
  car_price_with_customs: number; // Цена автомобиля с таможенными пошлинами
  catalog_item_id: number; // ID элемента каталога
  created_at: string; // Дата создания
  currency_rate_kzt: number; // Курс валюты KZT
  id: number; // ID
  primary_registration_price: number; // Цена первичной регистрации
  recycling_price: number; // Цена утилизации
  security_service_price: number; // Цена услуг безопасности
  technical_passport_price: number; // Цена технического паспорта
  total_price: number; // Общая цена
  total_price_kzt: number; // Общая цена в KZT
}

interface FetchParams {
  country: CountryType;
  id: string;
}

export const fetchItem = async ({
  country,
  id,
}: FetchParams): Promise<{ calculation: CarPricing }> => {
  const { data } = await axios.get(
    "https://jaicar.kz/api/v1/catalog/turnkey/" +
      country +
      "/" +
      id +
      "/calculation"
  );
  return data;
};

const CalculationModal = ({
  country,
  price,
}: {
  country: CountryType;
  price: {
    delivery_price: number;
    delivery_price_kzt: number;
    total_price: number;
    total_price_kzt: number;
    service_price: number;
    service_price_kzt: number;
  };
}) => {
  const { id } = useParams();
  const { city } = useStore();

  const { data } = useQuery({
    queryKey: ["calculation", country, id],
    queryFn: () => fetchItem({ country: country as CountryType, id: id! }),
  });

  return (
    <Space direction="vertical" size={6} style={{ maxWidth: 300 }}>
      <Title style={{ margin: 0, color: "#5e9de8" }} level={4}>
        <Flex justify="space-between">
          Общая сумма:
          <span>
            {separator(
              (data?.calculation?.total_price_kzt ?? 0) + price.total_price_kzt
            )}{" "}
            KZT
          </span>
        </Flex>
      </Title>

      <Flex justify="space-between" className="calculation_text">
        в долларах
        <span>
          ${" "}
          {separator((data?.calculation?.total_price ?? 0) + price.total_price)}
        </span>
      </Flex>

      <Text type="secondary">из них:</Text>
      <Flex justify="space-between" className="calculation_text">
        <div className="calculation_title">
          цена автомобиля с учетом таможенной очистки
        </div>
        <span>$ {separator(data?.calculation?.car_price_with_customs)}</span>
      </Flex>
      <Flex justify="space-between" className="calculation_text">
        доставка до {city}
        <span>$ {separator(price.delivery_price)}</span>
      </Flex>
      <Flex justify="space-between" className="calculation_text">
        утиль сбор
        <span>$ {separator(data?.calculation?.recycling_price)}</span>
      </Flex>
      <Flex justify="space-between" className="calculation_text">
        платежи за номера и техпаспорт
        <span>$ {separator(data?.calculation?.technical_passport_price)}</span>
      </Flex>
      <Flex justify="space-between" className="calculation_text">
        первичная регистрация
        <span>
          $ {separator(data?.calculation?.primary_registration_price)}
        </span>
      </Flex>
      <Flex justify="space-between" className="calculation_text">
        услуги компаний №1
        <span>$ {separator(price.service_price)}</span>
      </Flex>
    </Space>
  );
};

export default CalculationModal;
