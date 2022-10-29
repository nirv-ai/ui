import type { DataConfigInterface } from "Data/Types";
import * as K from "Data/DataKeys";

export interface PathDataInterface {
  name: string;
  about: string;
  incentives: string;
  disciplines: string;
  academia: string;
  skills: string;
  strategy: string;
  child_paths: string;
  display_name: string;
}

export type PathDataContextType = DataConfigInterface["context"];

// all user data, keys are the players callsign
export interface PathDataConfigInterface extends DataConfigInterface {
  context: PathDataContextType;
}

export const pathDataConfig: PathDataConfigInterface = {
  context: {
    contextName: K.PATH_CONTEXT_NAME,
  },
  store: {
    storeName: K.PATH_STORE_NAME,
  },
};

export type PathDataContextUpdater = (
  contextName: PathDataConfigInterface["context"]["contextName"],
  next: Partial<PathDataInterface>
) => void;
