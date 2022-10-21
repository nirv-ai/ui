/**
 * TODO: needs to switch on path, currently only usable for app landing
 */
import React from "react";

import { Grid } from "Library";
import { AppHeaderLogoHuge } from "./AppHeaderLogo";
import { AppHeaderNav } from "./AppHeaderNav";
import { AuthnzContext } from "Data";

export const AppHeader = () => {
  const authnzContext = React.useContext(AuthnzContext);

  return (
    <Grid component="header" flexDirection="column" display="flex" mt="0">
      <AppHeaderLogoHuge shouldRender={!authnzContext.THIS_PLAYER} />
      <AppHeaderNav callsign={authnzContext.THIS_PLAYER} />
    </Grid>
  );
};
