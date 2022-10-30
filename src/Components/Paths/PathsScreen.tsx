// TODO: add material data table: https://mui.com/material-ui/react-table/

import type { FC } from "react";

import { Grid, H2, type GridInterface } from "Library";
import { Paths } from "./Paths";

export const PathsScreen: FC<GridInterface> = (props) => {
  return (
    <Grid container component="main" {...props}>
      <Grid>
        <H2>PATHS</H2>
      </Grid>

      <Grid>
        <Paths />
      </Grid>
    </Grid>
  );
};
