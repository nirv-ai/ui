/**
 * TODO: move ClientStore into a separate file
 * ^ there will be a BackendStore, CacheStore, etc.
 * TODO: refactor this entire thing
 */
import store, { type StoreType } from "store2";

export interface StoreManagerInterface {
  store: StoreType;
}
export const StoreManager: StoreManagerInterface = { store };

export interface ClientStoreInterface {
  (props?: { namespace?: string }): Promise<StoreType>;
}
export const ClientStore: ClientStoreInterface = async (props = {}) => {
  if (props.namespace) return StoreManager.store.namespace(props.namespace);

  return store;
};
