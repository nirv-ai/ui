// TODO: add material data table: https://mui.com/material-ui/react-table/

import type { FC } from "react";

import { Grid, H2, P, type GridInterface } from "Library";

export const PathsScreen: FC<GridInterface> = (props) => (
  <Grid container component="article" {...props}>
    <H2>PATHS</H2>
    <P>data table of top paths</P>
  </Grid>
);
