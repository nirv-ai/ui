export interface DataConfigInterface {
  store: {
    name: string;
    keys: { [key: string]: string };
  };
  defaults: { [key: string]: unknown };
}
