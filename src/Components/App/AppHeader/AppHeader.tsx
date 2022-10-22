/**
 * TODO: needs to switch on path, currently only usable for app landing
 */
import { useContext } from "react";

import { Grid } from "Library";
import { AppHeaderLogoHuge } from "./AppHeaderLogo";
import { AppHeaderNav } from "./AppHeaderNav";
import { AuthnzContext, PlayerContext } from "Data";

export const AppHeader = () => {
  const authData = useContext(AuthnzContext);
  const playerData = useContext(PlayerContext);

  return (
    <Grid component="header" flexDirection="column" display="flex" mt="0">
      <AppHeaderLogoHuge shouldRender={!authData.THIS_PLAYER} />
      <AppHeaderNav
        callsign={authData.THIS_PLAYER}
        avatar={playerData.THIS_PLAYER.avatar}
      />
    </Grid>
  );
};
