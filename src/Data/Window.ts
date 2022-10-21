import { StoreManager } from "./ClientStore";

if (typeof window !== "undefined") {
  // @ts-ignore
  window.StoreManager = StoreManager;
}
