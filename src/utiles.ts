import { CountryType } from "./store/store";

export const selectCountryName = (country: CountryType) => {
  let name;
  switch (country) {
    case "China":
      name = "Китай";
      break;
    case "Korea":
      name = "Корея";
      break;
    case "UAE":
      name = "ОАЭ";
      break;

    default:
      name = "ОАЭ";
      break;
  }
  return name;
};
