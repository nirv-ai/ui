import type { FC } from "react";

import { Grid, P, type GridInterface } from "Library";
import { AppStats } from "./AppStats";

export const AppAbout: FC<GridInterface> = (props) => (
  <Grid component="article" {...props}>
    <P>
      NIRV.ai is a lifestyle management platform for players to socialize and
      optimize lifestyle choices
    </P>
    <AppStats />
  </Grid>
);
