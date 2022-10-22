/**
 * TODO: move ClientStore into a separate file
 * ^ there will be a BackendStore, CacheStore, etc.
 */
import store, { type StoreType } from "store2";

import { AUTHNZ_STORE_NAME, PLAYER_STORE_NAME } from "Data/DataKeys";

export type ClientStorePromiseType = Promise<StoreType>;
export type ClientStoreInterface = (props?: {
  namespace?: string;
}) => ClientStorePromiseType;
/**
 * gets the ClientStore for managing localStorage
 * @see "store2" dependency
 */
export const ClientStore: ClientStoreInterface = async (props = {}) => {
  if (props.namespace) return store.namespace(props.namespace);

  // get around error
  await Promise.resolve();
  return store;
};

/**
 * returns a ClientStore namespaced to playerDataConfig.store.storeName
 * @see ClientStore fn
 */
export const getPlayerStore = async (): ClientStorePromiseType =>
  ClientStore({ namespace: PLAYER_STORE_NAME });

/**
 * returns a ClientStore namespaced to authnzDataConfig.store.storeName
 * @see ClientStore fn
 */
export const getAuthnzStore = async () =>
  ClientStore({ namespace: AUTHNZ_STORE_NAME });
