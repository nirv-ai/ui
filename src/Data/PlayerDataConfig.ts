import { type DataConfigInterface } from ".";

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
  player: PlayerDataInterface;
};

// all user data, keys are the players callsign
export interface PlayerDataConfigInterface extends DataConfigInterface {
  context: PlayerDataContextType;
}

export const playerDataConfig: PlayerDataConfigInterface = {
  context: {
    contextName: "PLAYER_CONTEXT",
    player: {
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
    // players are saved under their callsign
    keys: {},
  },
};

export type PlayerDataContextUpdater = (
  contextName: PlayerDataConfigInterface["context"]["contextName"],
  next: Partial<PlayerDataInterface>
) => void;
