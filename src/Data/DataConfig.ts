export type DataConfigContextType = {
  contextName: string;
};

export type DataConfigStoreType = {
  // local storage
  storeName: string;
  keys: { [key: string]: string };
};

export interface DataConfigInterface {
  context: DataConfigContextType;
  store: DataConfigStoreType;
}
