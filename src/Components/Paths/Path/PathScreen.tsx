// TODO: add material data table: https://mui.com/material-ui/react-table/

import type { FC } from "react";

import { Grid, H2, type GridInterface } from "Library";

export const PathScreen: FC<GridInterface> = (props) => {
  return (
    <Grid container component="main" {...props}>
      <H2>PATH</H2>
      <div>I am a path</div>
    </Grid>
  );
};
