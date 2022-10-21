export interface DataConfigInterface {
  context: {
    contextName: string;
    update: (contextName: string, prev: any) => void; // e.g. a setState fn to update defaults
  };
  store: {
    // local storage
    storeName: string;
    keys: { [key: string]: string };
  };
}
