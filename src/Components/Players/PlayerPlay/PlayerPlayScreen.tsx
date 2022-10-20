import React from "react";

import { Grid } from "Library";
import { PlayerPlayAbout } from "Components";
import { PlayerPlayForm } from "./PlayerPlayForm";

export const PlayerPlayScreen = () => (
  <Grid component="article">
    <PlayerPlayAbout />
    <PlayerPlayForm />
  </Grid>
);
