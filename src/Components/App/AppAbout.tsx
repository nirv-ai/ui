import type { FC } from "react";

import { Stack, P, type GridInterface } from "Library";
import { AppStats } from "./AppStats";

export const AppAbout: FC<GridInterface> = (props) => (
  <Stack>
    <P>
      NIRV.ai is a lifestyle management platform for players to socialize and
      optimize lifestyle choices
    </P>
    <AppStats />
  </Stack>
);
