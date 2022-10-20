import React from "react";

import { playerDataConfig } from ".";

export const PlayerContext = React.createContext(playerDataConfig.defaults);
PlayerContext.displayName = "PlayerContext";

export interface PlayerContextProviderInterface {
  children: React.ReactNode;
  context?: typeof playerDataConfig.defaults;
}
export const PlayerContextProvider: React.FC<
  PlayerContextProviderInterface
> = ({ children, context = playerDataConfig.defaults }) => (
  <PlayerContext.Provider value={context}>{children}</PlayerContext.Provider>
);
