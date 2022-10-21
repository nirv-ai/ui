import { type DataConfigInterface } from ".";

export type AuthnzDataContextType = DataConfigInterface["context"] & {
  player: string;
};

export interface AuthnzDataConfigInterface extends DataConfigInterface {
  context: AuthnzDataContextType;
}

// authentication & authorization data,
export const authnzDataConfig: AuthnzDataConfigInterface = {
  context: {
    contextName: "AUTHNZ_CONTEXT",
    player: "",
  },
  store: {
    storeName: "AUTHNZ",
    keys: {
      player: "", // user logged in as this player
    },
  },
};

export type AuthnzDataContextUpdater = (
  contextName: AuthnzDataConfigInterface["context"]["contextName"],
  next: Partial<AuthnzDataContextType>
) => void;
