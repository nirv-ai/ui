/**
 * utility fns for managing all context in the app
 * keeps the logic separate from the data
 */
import React from "react";

import { type PlayerDataContextUpdater } from "./PlayerDataConfig";
import { type AuthnzDataContextUpdater } from "./AuthnzDataConfig";

export interface ContextManagerInterface {
  updateContext: PlayerDataContextUpdater & AuthnzDataContextUpdater;
}

export const ContextManager: ContextManagerInterface = {
  // this should be implemented by the parent of the provider
  // ^ e.g. a setState fn, see App
  updateContext: (contextName, next) => {},
};

export const ContextUpdaterContext: React.Context<ContextManagerInterface> =
  React.createContext(ContextManager);

export interface ContextUpdaterProviderInterface {
  children: React.ReactNode;
  context?: ContextManagerInterface;
}

export const ContextUpdaterProvider: React.FC<
  ContextUpdaterProviderInterface
> = ({ children, context = ContextManager }) => (
  <ContextUpdaterContext.Provider value={context}>
    {children}
  </ContextUpdaterContext.Provider>
);
