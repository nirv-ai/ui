import type { FC } from "react";

import { Grid, H2, P, type GridInterface } from "Library";

export const SkillsAbout: FC<GridInterface> = (props) => (
  <Grid component="article">
    <H2>SKILLS</H2>
    <P>Skills highlight a players ability</P>
  </Grid>
);
