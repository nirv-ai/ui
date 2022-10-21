/**
 * TODO: move ClientStore into a separate file
 * ^ there will be a BackendStore, CacheStore, etc.
 */
import store, { type StoreType } from "store2";

import { playerDataConfig, authnzDataConfig } from "Data";

export type ClientStorePromiseType = Promise<StoreType>;
export interface ClientStoreInterface {
  (props?: { namespace?: string }): ClientStorePromiseType;
}
/**
 * gets the ClientStore for managing localStorage
 * @see "store2" dependency
 */
export const ClientStore: ClientStoreInterface = async (props = {}) => {
  if (props.namespace) return store.namespace(props.namespace);

  return store;
};

/**
 * returns a ClientStore namespaced to playerDataConfig.store.storeName
 * @see ClientStore fn
 */
export const getPlayerStore = async (): ClientStorePromiseType =>
  ClientStore({
    namespace: playerDataConfig.store.storeName,
  });

/**
 * returns a ClientStore namespaced to authnzDataConfig.store.storeName
 * @see ClientStore fn
 */
export const getAuthnzStore = async () =>
  ClientStore({
    namespace: authnzDataConfig.store.storeName,
  });
