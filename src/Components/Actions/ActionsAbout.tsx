import type { FC } from "react";

import { Grid, H2, P, type GridInterface } from "Library";

export const ActionsAbout: FC<GridInterface> = (props) => (
  <Grid component="article">
    <H2>ACTIONS</H2>
    <P>Actions are things people do</P>
    <P>Total Actions 5.6k</P>
  </Grid>
);
