import React from "react";

import { Grid } from "Library";
import { AppStats } from ".";

export const AppAbout = () => (
  <Grid xs={12} component="article">
    <p>
      NIRV.ai is a lifestyle management platform for players to socialize and
      optimize lifestyle choices
    </p>
    <AppStats />
  </Grid>
);
