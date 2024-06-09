import { create } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";

export type CountryType = "uae" | "ch" | "kr";
export type CityType = "Астана" | "Алматы";

export interface FilterParams {
  brand?: string;
  model?: string;
  yearFrom?: number;
  yearTo?: number;
  priceFrom?: number;
  priceTo?: number;
  transmissionsType?: string;
  mileageFrom?: number;
  mileageTo?: number;
  engineCapacityFrom?: number;
  engineCapacityTo?: number;
  yearSort?: "asc" | "desc";
  priceSort?: "asc" | "desc";
  delivery_city?: CityType;
}

export type SortType = "yearSort" | "priceSort" | "";

export type SortDirectionType = "asc" | "desc";

interface StoreState {
  country: CountryType;
  setCountry: (country: CountryType) => void;
  city: CityType;
  setCity: (city: CityType) => void;
  filter: FilterParams;
  setFilter: (filter: FilterParams) => void;
  sort?: SortType;
  setSort: (sort: SortType) => void;
  sortDirection: SortDirectionType;
  setSortDirection: (sort: SortDirectionType) => void;
}

// Определение типа с использованием persist
type MyPersist = (
  config: (set: any, get: any, api: any) => StoreState,
  options: PersistOptions<StoreState>
) => (set: any, get: any, api: any) => StoreState;

// Создайте стор с поддержкой localStorage
const useStore = create<StoreState>(
  (persist as MyPersist)(
    (set) => ({
      country: "uae",
      setCountry: (country) => set({ country }),
      city: "Алматы",
      setCity: (city) => set({ city }),
      filter: {},
      setFilter: (filter) => set({ filter }),
      sort: "",
      setSort: (sort) => set({ sort }),
      sortDirection: "asc",
      setSortDirection: (sortDirection) => set({ sortDirection }),
    }),
    {
      name: "app-store", // имя для хранения в localStorage
    }
  )
);

export default useStore;
