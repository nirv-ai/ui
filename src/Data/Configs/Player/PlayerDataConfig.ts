import type { DataConfigInterface } from "Data/Types";
import * as K from "Data/DataKeys";

export interface PlayerDataInterface {
  email: string;
  about: string;
  avatar: string;
  callsign: string;
  first: string;
  last: string;
  password?: string;
}

export type PlayerDataContextType = DataConfigInterface["context"] & {
  [K.PLAYER_KEY]: PlayerDataInterface;
};

// all user data, keys are the players callsign
export interface PlayerDataConfigInterface extends DataConfigInterface {
  context: PlayerDataContextType;
}

export const playerDataConfig: PlayerDataConfigInterface = {
  context: {
    contextName: K.PLAYER_CONTEXT_NAME,
    [K.PLAYER_KEY]: {
      email: "",
      about: "",
      avatar: "",
      callsign: "",
      first: "",
      last: "",
      password: "",
    },
  },
  store: {
    storeName: K.PLAYER_STORE_NAME,
  },
};

export type PlayerDataContextUpdater = (
  contextName: PlayerDataConfigInterface["context"]["contextName"],
  next: Partial<PlayerDataInterface>
) => void;
