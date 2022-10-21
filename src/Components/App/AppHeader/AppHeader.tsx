/**
 * TODO: needs to switch on path, currently only usable for app landing
 */
import React from "react";

import { Grid } from "Library";
import { AppHeaderLogoHuge } from "./AppHeaderLogo";
import { AppHeaderNav } from "./AppHeaderNav";
import { AuthnzContext, PlayerContext } from "Data";

export const AppHeader = () => {
  const authData = React.useContext(AuthnzContext);
  const playerData = React.useContext(PlayerContext);

  return (
    <Grid component="header" flexDirection="column" display="flex" mt="0">
      <AppHeaderLogoHuge shouldRender={!authData.THIS_PLAYER} />
      <AppHeaderNav
        callsign={authData?.THIS_PLAYER}
        avatar={playerData?.THIS_PLAYER?.avatar}
      />
    </Grid>
  );
};
