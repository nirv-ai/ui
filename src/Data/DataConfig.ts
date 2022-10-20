export interface DataConfigInterface {
  context: {
    contextName: string;
    update: (key: string, prev: any) => void; // e.g. a setState fn to update defaults
  };
  store: {
    storeName: string;
    keys: { [key: string]: string };
  };
}
