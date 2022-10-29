import { Grid } from "Library";
import {
  ActionsAbout,
  ActivitiesAbout,
  PathsAbout,
  PlayersAbout,
  SkillsAbout,
} from "Components";

export const LearnScreen = () => (
  <Grid component="main" pt="2rem">
    <PathsAbout />
    <ActivitiesAbout />
    <ActionsAbout />
    <SkillsAbout />
    <PlayersAbout />
  </Grid>
);
