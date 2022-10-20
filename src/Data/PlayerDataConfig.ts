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
  defaults: {
    player: PlayerDataInterface;
  };
}
export const playerDataConfig: PlayerDataConfigInterface = {
  store: {
    name: "PLAYERS",
    // players are saved under their callsign
    keys: {},
  },
  defaults: {
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
};
