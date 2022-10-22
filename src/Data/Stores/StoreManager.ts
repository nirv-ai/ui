import store, { type StoreType } from "store2";

import {
  ClientStore,
  getAuthnzStore,
  getPlayerStore,
  type ClientStoreInterface,
} from "./ClientStore";

export interface StoreManagerInterface {
  ClientStore: ClientStoreInterface;
  ClientStoreClear: () => void;
  ClientStoreAll: () => void;
  getAuthnzStore: typeof getAuthnzStore;
  getPlayerStore: typeof getPlayerStore;
  store: StoreType;
}
/**
 * encapsulates all logic for managing all types of stores
 * whether client, backend, cache, etc
 */
export const StoreManager: StoreManagerInterface = {
  ClientStore,
  ClientStoreClear: () => store(false),
  ClientStoreAll: () => store(),
  getAuthnzStore,
  getPlayerStore,
  store,
};
