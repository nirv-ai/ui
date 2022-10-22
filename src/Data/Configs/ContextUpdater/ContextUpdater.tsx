/**
 * utility fns for managing all context in the app
 * keeps the logic separate from the data
 */
import { createContext, type Context, type FC, type ReactNode } from "react";

import type { PlayerDataContextUpdater } from "Data/Configs/Player";
import type { AuthnzDataContextUpdater } from "Data/Configs/Authnz";

export interface ContextUpdaterInterface {
  updateContext: PlayerDataContextUpdater & AuthnzDataContextUpdater;
}

export const ContextUpdaterBase: ContextUpdaterInterface = {
  // this should be implemented by the parent of the provider
  // ^ e.g. a setState fn, see App
  updateContext: (contextName, next) => {
    return void 0;
  },
};

export const ContextUpdaterContext: Context<ContextUpdaterInterface> =
  createContext(ContextUpdaterBase);

export interface ContextUpdaterProviderInterface {
  children: ReactNode;
  context?: ContextUpdaterInterface;
}

export const ContextUpdaterProvider: FC<ContextUpdaterProviderInterface> = ({
  children,
  context = ContextUpdaterBase,
}) => (
  <ContextUpdaterContext.Provider value={context}>
    {children}
  </ContextUpdaterContext.Provider>
);
