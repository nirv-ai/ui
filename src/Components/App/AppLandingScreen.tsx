import { Grid } from "Library";

import { AppAbout } from "./AppAbout";

export const AppLandingScreen = () => (
  <Grid container component="main">
    <Grid>
      <AppAbout mt="2rem" />
    </Grid>
  </Grid>
);
