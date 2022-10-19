import React from "react";
import { Unstable_Grid2 as MuiGrid, type Grid2Props } from "@mui/material"; // Grid version 2

export interface MuiGridInterface extends Grid2Props {}

export const Grid: React.FC<MuiGridInterface> = ({ children, ...props }) => (
  <MuiGrid {...props}>{children}</MuiGrid>
);
