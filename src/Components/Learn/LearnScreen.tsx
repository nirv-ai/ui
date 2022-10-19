import React from "react";

import { Grid } from "Library";
import {
  ActionsAbout,
  PathsAbout,
  PlayersAbout,
  SkillsAbout,
} from "Components";
export const LearnScreen = () => (
  <Grid xs={12} component="main">
    <PathsAbout />
    <ActionsAbout />
    <SkillsAbout />
    <PlayersAbout />
  </Grid>
);
