/**
 * TODO: needs to switch on path, currently only usable for app landing
 */
import { useContext } from "react";

import { Stack } from "Library";
import { AppHeaderLogoHuge } from "./AppHeaderLogo";
import { AppHeaderNav } from "./AppHeaderNav";
import { AuthnzContext, PlayerContext } from "Data";

export const AppHeader = () => {
  const authData = useContext(AuthnzContext);
  const playerData = useContext(PlayerContext);

  return (
    <header id="app-header">
      <Stack>
        <AppHeaderLogoHuge shouldRender={!authData.THIS_PLAYER} />
        <AppHeaderNav
          callsign={authData.THIS_PLAYER}
          avatar={playerData.THIS_PLAYER.avatar}
        />
      </Stack>
    </header>
  );
};
