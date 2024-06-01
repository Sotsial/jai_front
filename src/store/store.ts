import { create } from "zustand";

export type CountryType = "UAE" | "China" | "Korea";
export type CityType = "Astana" | "Almaty";

interface StoreState {
  country: CountryType;
  setCountry: (country: CountryType) => void;
}

// Создайте стор
const useStore = create<StoreState>((set) => ({
  country: "UAE",
  setCountry: (country) => set({ country }),
}));

export default useStore;
