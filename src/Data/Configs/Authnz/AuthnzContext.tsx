import * as React from "react";

import {
  authnzDataConfig,
  type AuthnzDataConfigInterface,
} from "./AuthnzDataConfig";
import { AUTHNZ_CONTEXT_NAME } from "Data/DataKeys";

export const AuthnzContext = React.createContext(authnzDataConfig.context);
AuthnzContext.displayName = AUTHNZ_CONTEXT_NAME;

export interface AuthnzContextProviderInterface {
  children: React.ReactNode;
  context?: AuthnzDataConfigInterface["context"];
}
export const AuthnzContextProvider: React.FC<
  AuthnzContextProviderInterface
> = ({ children, context = authnzDataConfig.context }) => (
  <AuthnzContext.Provider value={context}>{children}</AuthnzContext.Provider>
);
