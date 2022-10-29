// TODO: add material data table: https://mui.com/material-ui/react-table/

import type { FC } from "react";

import { Grid, H2, P, type GridInterface } from "Library";

export const ActivitiesScreen: FC<GridInterface> = (props) => (
  <Grid component="main" {...props}>
    <H2>ACTIVITIES</H2>
    <P>data table of top activities</P>
  </Grid>
);
