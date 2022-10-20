import React from "react";

import {
  playerDataConfig,
  type PlayerDataConfigInterface,
} from "./PlayerDataConfig";

export const PlayerContext = React.createContext(playerDataConfig.context);
PlayerContext.displayName = playerDataConfig.context.contextName;

export interface PlayerContextProviderInterface {
  children: React.ReactNode;
  context?: PlayerDataConfigInterface["context"];
}
export const PlayerContextProvider: React.FC<
  PlayerContextProviderInterface
> = ({ children, context = playerDataConfig.context }) => (
  <PlayerContext.Provider value={context}>{children}</PlayerContext.Provider>
);
