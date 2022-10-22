import { StoreManager, type StoreManagerInterface } from "Data/Stores";

declare global {
  interface Window {
    StoreManager: StoreManagerInterface;
  }
}

export const setStoreManagerOnWindow = () => {
  if (typeof window !== "undefined") {
    window.StoreManager = StoreManager;
  }
};
