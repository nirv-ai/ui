import React from "react";

import { AppHeaderPublicNav } from "./AppHeaderPublicNav";
import { AppHeaderPlayerNav } from "./AppHeaderPlayerNav";
// TODO: doesnt work with current NavLink in MuiTheme
// ^ see all of the header nav links in the sibling components
// export interface IsActiveClassNameInterface {
//   ({ isActive, isPending }: { isActive: boolean; isPending: boolean }): string;
// }
// const isActiveClassName: IsActiveClassNameInterface = ({
//   isActive,
//   isPending,
// }) => (isActive ? "active" : isPending ? "pending" : "");

export interface AppHeaderNavInterface {
  callsign: string;
}
export const AppHeaderNav: React.FC<AppHeaderNavInterface> = ({ callsign }) => {
  if (callsign) return <AppHeaderPlayerNav callsign={callsign} />;

  return <AppHeaderPublicNav />;
};
