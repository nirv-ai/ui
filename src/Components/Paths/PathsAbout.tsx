import React from "react";

import { Grid, H2, P, type GridInterface } from "Library";

export const PathsAbout: React.FC<GridInterface> = (props) => (
  <Grid component="article" {...props}>
    <H2>PATHS</H2>
    <P>Paths are specific lifestyle strategies created by Players</P>
    <P>Total Paths 1.6k</P>
  </Grid>
);
