import React from "react";

import { Grid } from "Library";
import { PlayersAbout } from "Components";
import { PlayerPlayForm } from "./PlayerPlayForm";

export const PlayerPlayScreen = () => (
  <Grid xs={12} component="article">
    <PlayersAbout />
    <PlayerPlayForm />
  </Grid>
);
