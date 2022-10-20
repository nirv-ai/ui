import React from "react";
import { Unstable_Grid2 as MuiGrid, type Grid2Props } from "@mui/material"; // Grid version 2

export interface GridInterface extends Grid2Props {}

export const Grid: React.FC<GridInterface> = ({ children, ...props }) => (
  <MuiGrid {...props}>{children}</MuiGrid>
);
