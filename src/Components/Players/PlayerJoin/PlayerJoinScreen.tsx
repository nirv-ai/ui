import React from "react";

import { Grid } from "Library";
import { PlayersAbout } from "Components";
import { PlayerJoinForm } from "./PlayerJoinForm/PlayerJoinForm";

export const PlayerJoinScreen = () => (
  <Grid xs={12} component="article">
    <PlayersAbout />
    <PlayerJoinForm />
  </Grid>
);
