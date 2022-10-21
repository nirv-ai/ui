import { type DataConfigInterface } from "./DataConfig";
import * as K from "./DataKeys";

export type AuthnzDataContextType = DataConfigInterface["context"] & {
  [K.PLAYER_KEY]: string;
};

export interface AuthnzDataConfigInterface extends DataConfigInterface {
  context: AuthnzDataContextType;
}

// authentication & authorization data,
export const authnzDataConfig: AuthnzDataConfigInterface = {
  context: {
    contextName: "AUTHNZ_CONTEXT",
    [K.PLAYER_KEY]: "",
  },
  store: {
    storeName: "AUTHNZ_STORE",
  },
};

export type AuthnzDataContextUpdater = (
  contextName: AuthnzDataConfigInterface["context"]["contextName"],
  next: Partial<AuthnzDataContextType>
) => void;
