import { create } from "zustand";

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

interface StoreState {
  country: CountryType;
  setCountry: (country: CountryType) => void;
  city: CityType;
  setCity: (city: CityType) => void;
  filter: FilterParams;
  setFilter: (filter: FilterParams) => void;
}

// Создайте стор
const useStore = create<StoreState>((set) => ({
  country: "uae",
  setCountry: (country) => set({ country }),
  city: "Алматы",
  setCity: (city) => set({ city }),
  filter: {},
  setFilter: (filter) => set({ filter }),
}));

export default useStore;
