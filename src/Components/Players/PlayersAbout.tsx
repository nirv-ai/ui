import type { FC } from "react";

import { Stack, H2, P, type GridInterface } from "Library";

export const PlayersAbout: FC<GridInterface> = (props) => (
  <Stack>
    <H2>PLAYERS</H2>
    <P>Players are core to NIRV.ai, creating and sharing their paths in life</P>
    <P>Total Players 500</P>
  </Stack>
);
