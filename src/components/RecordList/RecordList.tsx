import { List, Skeleton, Space, Typography } from "antd";
import RecordItem, { CarVM } from "./RecordItem/RecordItem";
import { useState } from "react";
import CitySelect from "./CitySelect/CitySelect";
import { isMobile } from "react-device-detect";
import useStore, {
  CityType,
  CountryType,
  FilterParams,
  SortDirectionType,
  SortType,
} from "src/store/store";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

interface CatalogVM {
  catalog: {
    data: CarVM[];
    meta: {
      current_page: number;
      last_page: number;
      per_page: number;
      total: number;
    };
  };
}

interface FetchTodoParams {
  country: CountryType;
  city: CityType;
  page?: number;
  filter: FilterParams;
  sort?: SortType;
  sortDirection: SortDirectionType;
}

export const fetchList = async ({
  country,
  city,
  page = 1,
  filter,
  sort,
  sortDirection,
}: FetchTodoParams): Promise<CatalogVM> => {
  const { data } = await axios.get(
    "https://jaicar.kz/api/v1/catalog/turnkey/" + country,
    {
      params: {
        ...filter,
        delivery_city: city,
        page: page,
        yearSort: sort === "yearSort" ? sortDirection : undefined,
        priceSort: sort === "priceSort" ? sortDirection : undefined,
      },
    }
  );
  return data;
};

const RecordList = () => {
  const [page, setPage] = useState<number>(1); // Добавлено состояние для текущей страницы
  const { country, city, filter, sort, sortDirection } = useStore();
  const { data, isLoading } = useQuery({
    queryKey: ["list", country, city, page, filter, sort, sortDirection],
    queryFn: () =>
      fetchList({ country, city, page, filter, sort, sortDirection }),
  });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <CitySelect total={data?.catalog.meta.total} />
      {isMobile && (
        <Typography.Title
          level={3}
          style={{ paddingInline: 8, marginTop: 4, marginBottom: 0 }}
        >
          Результаты поиска
        </Typography.Title>
      )}

      <List
        itemLayout="horizontal"
        className="record_list"
        dataSource={
          isLoading ? ([1, 2, 3] as unknown as CarVM[]) : data?.catalog.data
        }
        renderItem={(item) => {
          return (
            <List.Item key={item.id}>
              <Skeleton loading={isLoading} active avatar={{ shape: "square" }}>
                <RecordItem {...item} city={city} />
              </Skeleton>
            </List.Item>
          );
        }}
        pagination={{
          align: "center",
          pageSize: data?.catalog.meta.per_page,
          total: data?.catalog.meta.total,
          current: data?.catalog.meta.current_page,
          onChange: handlePageChange,
          style: { paddingBottom: 12 },
          hideOnSinglePage: true,
          showSizeChanger: false,
        }}
      />
    </Space>
  );
};

export default RecordList;
