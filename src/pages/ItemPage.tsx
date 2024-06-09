import { useQuery } from "@tanstack/react-query";
import {
  Breadcrumb,
  Col,
  Divider,
  Flex,
  Row,
  Select,
  Skeleton,
  Typography,
} from "antd";
import axios from "axios";
import { isMobile } from "react-device-detect";
import { useNavigate, useParams } from "react-router-dom";
import Advertising from "src/components/Advertising/Advertising";
import Item from "src/components/Item/Item";
import { countryName } from "src/components/Layout/Layout";
import Order from "src/components/Order/Order";
import { CarVM } from "src/components/RecordList/RecordItem/RecordItem";
import { CountryType } from "src/store/store";

interface FetchParams {
  country: CountryType;
  id: string;
}

export const fetchItem = async ({
  country,
  id,
}: FetchParams): Promise<{ catalog_item: CarVM }> => {
  const { data } = await axios.get(
    "https://jaicar.kz/api/v1/catalog/turnkey/" + country + "/" + id
  );
  return data;
};

const ItemPage = () => {
  const { country, id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["carItem", country, id],
    queryFn: () => fetchItem({ country: country as CountryType, id: id! }),
  });

  if (isLoading && !isMobile)
    return (
      <Col span={24}>
        <Skeleton />
        <Row gutter={[24, 12]}>
          <Col span={8}>
            <Skeleton />
            <Skeleton />
          </Col>
          <Col span={16}>
            <div className="image-loader">
              <Skeleton.Image
                style={{ width: "100%", height: 300 }}
                active={true}
              />
            </div>
            <Skeleton />
            <Skeleton />
          </Col>
        </Row>
      </Col>
    );
  if (isMobile)
    return (
      <>
        <Flex
          justify="space-between"
          style={{
            padding: 12,
            backgroundColor: "#1c1819",
            width: "100%",
            color: "#fff",
            fontSize: "1.2rem",
          }}
          align="center"
        >
          <strong onClick={() => navigate("/")}>Jai logo</strong>
          <Select
            className="lang_select"
            defaultValue="ru"
            variant="borderless"
            popupMatchSelectWidth
            options={[
              { value: "ru", label: "RU" },
              { value: "kz", label: "KAZ" },
            ]}
          />
        </Flex>
        {isLoading ? (
          <Col span={24}>
            <div className="image-loader">
              <Skeleton.Image
                style={{ width: "100%", height: 300 }}
                active={true}
              />
              <Skeleton />
              <Skeleton />
            </div>
          </Col>
        ) : (
          <Col span={24}>{data && <Item {...data.catalog_item} />}</Col>
        )}
        <Col span={24} style={{ paddingInline: 18 }}>
          <Order />
        </Col>
      </>
    );

  return (
    <>
      <Col span={24}>
        <Advertising />
      </Col>

      <Col span={24}>
        <Breadcrumb
          items={[
            {
              title: "Главная",
              onClick: () => navigate("/"),
            },
            {
              title: "Каталог " + countryName(country as CountryType),
              onClick: () => navigate("/"),
            },
            {
              title: data?.catalog_item?.brand,
              onClick: () => {},
            },
            {
              title: data?.catalog_item?.model,
              onClick: () => {},
            },
          ]}
        />
      </Col>

      <Typography.Title
        level={2}
        style={{ margin: 0, textTransform: "capitalize" }}
      >
        {data?.catalog_item?.brand} | {data?.catalog_item?.model}
      </Typography.Title>
      <Divider style={{ margin: "8px 0" }} />
      <Col span={24}>{data && <Item {...data.catalog_item} />}</Col>
    </>
  );
};

export default ItemPage;
