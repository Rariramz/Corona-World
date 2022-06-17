import { URL } from "../consts/consts";
import { get } from "./fetchWrapper";

// Get global COVID-19  totals for today, yesterday and two days ago
export const getGlobalData = async () => {
  await get(URL + "all");
};

// Get COVID-19 totals for all continents
export const getContinentsData = async () => {
  await get(URL + "continents");
};

// Get COVID-19 totals for a specific continent
export const getContinentData = async (continent) => {
  await get(URL + `continents/${continent}`);
};

// Get COVID-19 totals for all countries
export const getCountriesData = async () => {
  await get(URL + "countries");
};

// Get COVID-19 totals for a specific country
export const getCountryData = async (country) => {
  await get(URL + `countries/${country}`);
};
