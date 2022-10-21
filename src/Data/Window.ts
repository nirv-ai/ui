import { StoreManager } from "./StoreManager";

export const setStoreManagerOnWindow = () => {
  if (typeof window !== "undefined") {
    // @ts-ignore
    window.StoreManager = StoreManager;
  }
};
