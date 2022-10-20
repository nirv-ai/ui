import React from "react";

import {
  authnzDataConfig,
  type AuthnzDataConfigInterface,
} from "./AuthnzDataConfig";
import { playerDataConfig } from "./PlayerDataConfig";

export const AuthnzContext = React.createContext(authnzDataConfig.context);
AuthnzContext.displayName = playerDataConfig.context.contextName;

export interface AuthnzContextProviderInterface {
  children: React.ReactNode;
  context?: AuthnzDataConfigInterface["context"];
}
export const AuthnzContextProvider: React.FC<
  AuthnzContextProviderInterface
> = ({ children, context = authnzDataConfig.context }) => (
  <AuthnzContext.Provider value={context}>{children}</AuthnzContext.Provider>
);
