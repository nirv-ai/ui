// TODO: add material data table: https://mui.com/material-ui/react-table/

import type { FC } from "react";

import { Grid, H2, P, type GridInterface } from "Library";

export const SkillsScreen: FC<GridInterface> = (props) => (
  <Grid component="main" {...props}>
    <Grid>
      <H2>SKILLS</H2>
      <P>data table of top skills</P>
    </Grid>
  </Grid>
);
