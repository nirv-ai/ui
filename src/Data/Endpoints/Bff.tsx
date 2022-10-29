import axios, { type AxiosInstance } from "axios";

export const BFFEndpoint: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BFF_BASE_URL!,
  timeout: 2000,
});

// player routes
export const PLAYERS_PLAY_ROUTE = "/v1/players/play";
export const PLAYERS_JOIN_ROUTE = "/v1/players/join";
export const PLAYERS_GET_ROUTE = "/v1/players";

// path routes
export const PATHS_GET_ROUTE = "/v1/paths";
