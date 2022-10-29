// TODO: add material data table: https://mui.com/material-ui/react-table/

import type { FC } from "react";

import { Grid, H2, P, type GridInterface } from "Library";

export const ActionsScreen: FC<GridInterface> = (props) => (
  <Grid component="article" {...props}>
    <H2>ACTIONS</H2>
    <P>data table of top actions</P>
  </Grid>
);
