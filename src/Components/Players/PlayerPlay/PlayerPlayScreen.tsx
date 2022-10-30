import { Grid } from "Library";
import { PlayerPlayAbout } from "Components";
import { PlayerPlayForm } from "./PlayerPlayForm";

export const PlayerPlayScreen = () => (
  <Grid container component="article">
    <Grid>
      <PlayerPlayAbout mt="2rem" />
      <PlayerPlayForm />
    </Grid>
  </Grid>
);
