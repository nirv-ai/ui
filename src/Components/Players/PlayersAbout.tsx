import React from "react";

import { Grid, H2, P, type GridInterface } from "Library";

export const PlayersAbout: React.FC<GridInterface> = (props) => (
  <Grid component="article" {...props}>
    <H2>PLAYERS</H2>
    <P>Players are core to NIRV.ai, creating and sharing their paths in life</P>
    <P>Total Players 500</P>
  </Grid>
);
