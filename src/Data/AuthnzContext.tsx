import React from "react";

import { authnzDataConfig } from ".";

export const AuthnzContext = React.createContext(authnzDataConfig.defaults);
AuthnzContext.displayName = "AuthnzContext";

export interface AuthnzContextProviderInterface {
  children: React.ReactNode;
  context?: typeof authnzDataConfig.defaults;
}
export const AuthnzContextProvider: React.FC<
  AuthnzContextProviderInterface
> = ({ children, context = authnzDataConfig.defaults }) => (
  <AuthnzContext.Provider value={context}>{children}</AuthnzContext.Provider>
);
