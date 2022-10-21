import React from "react";

import { Grid, TextBold } from "Library";

export interface AppHeaderLogoInterface {
  shouldRender: boolean;
}

export interface AppHeaderLogoHugeInterface extends AppHeaderLogoInterface {}

export const AppHeaderLogoHuge: React.FC<AppHeaderLogoHugeInterface> = ({
  shouldRender,
}) =>
  shouldRender ? (
    <Grid component="section">
      <TextBold fontSize="64px">NIRV.ai</TextBold>
    </Grid>
  ) : null;
