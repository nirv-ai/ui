import React from "react";
import { Unstable_Grid2 as Grid } from "@mui/material"; // Grid version 2

import { ActionsAbout } from "../Actions";
import { AppAbout } from ".";
import { PathsAbout } from "../Paths";
import { PlayersAbout } from "../Players";
import { SkillsAbout } from "../Skills";

export const AppLanding = () => (
  <>
    <Grid xs={12}>
      <AppAbout />
    </Grid>
    <Grid xs={12}>
      <PlayersAbout />
    </Grid>
    <Grid xs={12}>
      <PathsAbout />
    </Grid>
    <Grid xs={12}>
      <ActionsAbout />
    </Grid>
    <Grid xs={12}>
      <SkillsAbout />
    </Grid>
  </>
);
