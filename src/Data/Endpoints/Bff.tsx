import axios, { type AxiosInstance } from "axios";

export const BFFEndpoint: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BFF_BASE_URL!,
  timeout: 2000,
});
