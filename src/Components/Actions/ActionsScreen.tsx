// TODO: add material data table: https://mui.com/material-ui/react-table/

import type { FC } from "react";

import { Grid, H2, P, type GridInterface } from "Library";

export const ActionsScreen: FC<GridInterface> = (props) => (
  <Grid container component="main" {...props}>
    <Grid>
      <H2>ACTIONS</H2>
    </Grid>
    <Grid>
      <P>data table of top actions</P>
    </Grid>
  </Grid>
);
