import type { DataConfigInterface } from "Data/Types";
import * as K from "Data/DataKeys";

export type AuthnzDataContextType = DataConfigInterface["context"] & {
  [K.PLAYER_KEY]: string;
};

export interface AuthnzDataConfigInterface extends DataConfigInterface {
  context: AuthnzDataContextType;
}

// authentication & authorization data,
export const authnzDataConfig: AuthnzDataConfigInterface = {
  context: {
    contextName: K.AUTHNZ_CONTEXT_NAME,
    [K.PLAYER_KEY]: "",
  },
  store: {
    storeName: K.AUTHNZ_STORE_NAME,
  },
};

export type AuthnzDataContextUpdater = (
  contextName: AuthnzDataConfigInterface["context"]["contextName"],
  next: Partial<AuthnzDataContextType>
) => void;
