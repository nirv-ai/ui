// @see https://mui.com/material-ui/react-grid2/#whats-changed
import type { FC } from "react";
import { Unstable_Grid2 as MuiGrid, type Grid2Props } from "@mui/material"; // Grid version 2

export type GridInterface = Grid2Props;

/**
 * grid containers should ONLY wrap other grids
 * negative margins are applied to the top and left
 * causes shiz to look fkd up if you, consider using a stack/container/box/etc
 * if that occurs
 */
export const Grid: FC<GridInterface> = ({ children, ...props }) => (
  <MuiGrid
    alignItems="center"
    columnSpacing={1}
    component="section"
    container={false}
    display="flex"
    flexDirection="column"
    justifyContent="center"
    pt="2rem"
    rowSpacing={1}
    xs={12}
    {...props}
  >
    {children}
  </MuiGrid>
);
