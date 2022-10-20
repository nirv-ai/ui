import { type DataConfigInterface } from ".";

export interface AuthnzDataConfigInterface extends DataConfigInterface {
  defaults: {
    player: string; // callsign: user logged in as this playerInterface
  };
}
// authentication & authorization data,
export const authnzDataConfig: AuthnzDataConfigInterface = {
  store: {
    name: "AUTHNZ",
    keys: {
      player: "", // user logged in as this player
    },
  },
  defaults: {
    player: "",
  },
};
