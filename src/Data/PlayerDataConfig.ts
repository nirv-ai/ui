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

// all user data, keys are the players callsign
export interface PlayerDataConfigInterface extends DataConfigInterface {
  context: Omit<DataConfigInterface["context"], "update"> & {
    player: PlayerDataInterface;
    update: (key: string, next: Partial<PlayerDataInterface>) => void;
  };
}

export const playerDataConfig: PlayerDataConfigInterface = {
  context: {
    contextName: "PLAYER_CONTEXT",
    update: (key, next) => {},
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
