import { type DataConfigInterface } from ".";

export interface AuthnzDataConfigInterface extends DataConfigInterface {
  context: Omit<DataConfigInterface["context"], "update"> & {
    update: (contextName: string, next: { player: string }) => void;
    player: string;
  };
}

// authentication & authorization data,
export const authnzDataConfig: AuthnzDataConfigInterface = {
  context: {
    contextName: "AUTHNZ_CONTEXT",
    update: (key, next) => {},
    player: "",
  },
  store: {
    storeName: "AUTHNZ",
    keys: {
      player: "", // user logged in as this player
    },
  },
};
