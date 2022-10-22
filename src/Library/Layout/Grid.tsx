import type { FC } from "react";
import { Unstable_Grid2 as MuiGrid, type Grid2Props } from "@mui/material"; // Grid version 2

export type GridInterface = Grid2Props;

export const Grid: FC<GridInterface> = ({
  children,
  component = "div",
  xs = 12,
  ...props
}) => (
  <MuiGrid item={!props.container} xs={xs} component={component} {...props}>
    {children}
  </MuiGrid>
);
