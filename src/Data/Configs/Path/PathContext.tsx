import * as React from "react";

import { pathDataConfig, type PathDataConfigInterface } from "./PathDataConfig";
import { PATH_CONTEXT_NAME } from "Data/DataKeys";

export const PathContext = React.createContext(pathDataConfig.context);
PathContext.displayName = PATH_CONTEXT_NAME;

export interface PathContextProviderInterface {
  children: React.ReactNode;
  context?: PathDataConfigInterface["context"];
}
export const PathContextProvider: React.FC<PathContextProviderInterface> = ({
  children,
  context = pathDataConfig.context,
}) => <PathContext.Provider value={context}>{children}</PathContext.Provider>;
