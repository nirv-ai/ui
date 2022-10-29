import { Grid } from "Library";
import {
  ActionsAbout,
  ActivitiesAbout,
  PathsAbout,
  PlayersAbout,
  SkillsAbout,
} from "Components";

export const LearnScreen = () => (
  <Grid component="main">
    <PathsAbout mt="2rem" />
    <ActivitiesAbout />
    <ActionsAbout />
    <SkillsAbout />
    <PlayersAbout />
  </Grid>
);
