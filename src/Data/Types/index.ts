export interface DataConfigContextType {
  contextName: string;
}

export interface DataConfigStoreType {
  storeName: string;
}

export interface DataConfigInterface {
  /**
   * hydrated from the store
   * made available to the app via react context
   */
  context: DataConfigContextType;

  /**
   * data kept in sometype of client store (e.g. localStorage)
   * Dont store it here if it doesnt need to hydrate context
   */
  store: DataConfigStoreType;
}
