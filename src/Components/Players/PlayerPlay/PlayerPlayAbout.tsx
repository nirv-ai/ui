import type { FC } from "react";

import { Stack, H2, P, TextBold, type GridInterface } from "Library";

export const PlayerPlayAbout: FC<GridInterface> = (props) => (
  <Stack>
    <H2>Ready Player One?</H2>
    <P>
      Its time for you to continue on your path, and conquer the simulation.
    </P>
    <TextBold>sign in and get started.</TextBold>
  </Stack>
);
