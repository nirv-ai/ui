import type { FC } from "react";

import { Grid, TextBold } from "Library";

export interface AppHeaderLogoInterface {
  shouldRender: boolean;
}

export type AppHeaderLogoHugeInterface = AppHeaderLogoInterface;

export const AppHeaderLogoHuge: FC<AppHeaderLogoHugeInterface> = ({
  shouldRender,
}) =>
  shouldRender ? (
    <Grid component="section">
      <TextBold
        fontSize="64px"
        sx={{
          fontFamily: "monospace",
          letterSpacing: ".3rem",
        }}
      >
        NIRV.ai
      </TextBold>
    </Grid>
  ) : null;
