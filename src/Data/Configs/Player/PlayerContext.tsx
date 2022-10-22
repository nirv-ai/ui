import * as React from "react";

import {
  playerDataConfig,
  type PlayerDataConfigInterface,
} from "./PlayerDataConfig";
import { PLAYER_CONTEXT_NAME } from "Data/DataKeys";

export const PlayerContext = React.createContext(playerDataConfig.context);
PlayerContext.displayName = PLAYER_CONTEXT_NAME;

export interface PlayerContextProviderInterface {
  children: React.ReactNode;
  context?: PlayerDataConfigInterface["context"];
}
export const PlayerContextProvider: React.FC<
  PlayerContextProviderInterface
> = ({ children, context = playerDataConfig.context }) => (
  <PlayerContext.Provider value={context}>{children}</PlayerContext.Provider>
);
