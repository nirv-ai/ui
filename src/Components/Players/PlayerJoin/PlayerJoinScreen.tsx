import React from "react";

import { Grid } from "Library";
import { PlayersAbout } from "Components";
import { PlayerJoinForm } from "./PlayerJoinForm";

export const PlayerJoinScreen = () => (
  <Grid component="article">
    <PlayersAbout />
    <PlayerJoinForm />
  </Grid>
);
