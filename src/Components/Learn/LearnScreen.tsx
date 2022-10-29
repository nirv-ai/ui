import { Grid } from "Library";
import {
  ActionsAbout,
  ActivitiesAbout,
  PathsAbout,
  PlayersAbout,
  SkillsAbout,
} from "Components";

export const LearnScreen = () => (
  <Grid container component="main">
    <PathsAbout />
    <ActivitiesAbout />
    <ActionsAbout />
    <SkillsAbout />
    <PlayersAbout />
  </Grid>
);
