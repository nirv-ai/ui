import type { FC } from "react";

import { Grid, H2, P, type GridInterface } from "Library";

export const ActivitiesAbout: FC<GridInterface> = (props) => (
  <Grid component="article" {...props}>
    <H2>ACTIVITIES</H2>
    <P>Activities are groups of actions</P>
    <P>Total Activities 700</P>
  </Grid>
);
