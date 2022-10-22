import { Grid } from "Library";
import {
  ActionsAbout,
  PathsAbout,
  PlayersAbout,
  SkillsAbout,
} from "Components";

export const LearnScreen = () => (
  <Grid component="main">
    <PathsAbout mt="2rem" />
    <ActionsAbout />
    <SkillsAbout />
    <PlayersAbout />
  </Grid>
);
