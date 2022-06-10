import { URL } from "../consts/consts";
import { get } from "./fetchWrapper";

// Get global COVID-19  totals for today, yesterday and two days ago
export const getGlobalData = async (callback) => {
  await get(URL + "all", callback);
};

// Get COVID-19 totals for all continents
export const getContinentsData = async (callback) => {
  await get(URL + "continents", callback);
};

// Get COVID-19 totals for a specific continent
export const getContinentData = async (continent, callback) => {
  await get(URL + `continents/${continent}`, callback);
};

// Get COVID-19 totals for all countries
export const getCountriesData = async (callback) => {
  await get(URL + "countries", callback);
};

// Get COVID-19 totals for a specific country
export const getCountryData = async (country, callback) => {
  await get(URL + `countries/${country}`, callback);
};
