import { type DataConfigInterface } from "./DataConfig";
import * as K from "./DataKeys";

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
    contextName: "PLAYER_CONTEXT",
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
    storeName: "PLAYERS_STORE",
  },
};

export type PlayerDataContextUpdater = (
  contextName: PlayerDataConfigInterface["context"]["contextName"],
  next: Partial<PlayerDataInterface>
) => void;
