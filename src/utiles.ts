import { CountryType } from "./store/store";

export const selectCountryName = (country: CountryType) => {
  let name;
  switch (country) {
    case "ch":
      name = "Китай";
      break;
    case "kr":
      name = "Корея";
      break;
    case "uae":
      name = "ОАЭ";
      break;

    default:
      name = "ОАЭ";
      break;
  }
  return name;
};
