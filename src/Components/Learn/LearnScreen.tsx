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
    <Grid>
      <PathsAbout />
      <ActivitiesAbout />
      <ActionsAbout />
      <SkillsAbout />
      <PlayersAbout />
    </Grid>
  </Grid>
);
