/**
 * TODO: should be made available via context
 * TODO: should be loaded automatically on root route
 */
import store, { type StoreBase } from "store2";

let loaded = false;

export interface ClientStoreInterface {
  (props?: { namespace?: string }): Promise<StoreBase>;
}
export const ClientStore: ClientStoreInterface = async (props = {}) => {
  if (!loaded) {
    console.info("loading store");
    loaded = true;
  }

  if (props.namespace) return store.namespace(props.namespace);

  return store;
};
