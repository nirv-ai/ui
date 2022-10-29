import * as React from "react";
import {
  AppBar,
  Toolbar,
  IconButton, // TODO: move IconButton to library
  Menu,
  Tooltip,
  MenuItem,
  Box,
  Link,
  Grid,
} from "@mui/material";
// TODO: setup icons in library
import MenuIcon from "@mui/icons-material/Menu";

import { TextBold, Avatar, ButtonLogout } from "Library";

export interface AppHeaderPlayerNavInterface {
  callsign: string;
  avatar?: string;
}

export const AppHeaderPlayerNav: React.FC<AppHeaderPlayerNavInterface> = ({
  callsign,
  avatar,
}) => {
  const [AppNavMenuAnchor, setAppNavMenuAnchor] =
    React.useState<null | HTMLElement>(null);
  const [PlayerSettingsMenuAnchor, setPlayerSettingsMenuAnchor] =
    React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAppNavMenuAnchor(event.currentTarget);
  };
  const handleOpenPlayerSettingsMenu = (
    event: React.MouseEvent<HTMLElement>
  ) => {
    setPlayerSettingsMenuAnchor(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAppNavMenuAnchor(null);
  };

  const handleClosePlayerSettingsMenu = () => {
    setPlayerSettingsMenuAnchor(null);
  };

  const appNavMenuConfig = [
    { href: `player/${callsign}`, text: "profile" },
    { href: "learn" },
    { href: "paths" },
    { href: "activities" },
    { href: "actions" },
    { href: "skills" },
  ];

  const AppNavMenuItems = () => (
    <>
      {appNavMenuConfig.map((item) => (
        <MenuItem key={item.href} onClick={handleCloseNavMenu}>
          <Link href={item.href}>
            <TextBold fontSize="12px">{item.text ?? item.href}</TextBold>
          </Link>
        </MenuItem>
      ))}
    </>
  );

  return (
    <Grid flexDirection="row" sx={{ width: "100%" }}>
      <AppBar component="header" id="player-app-nav" position="static">
        <Toolbar id="app-header-toolbar" sx={{ alignItems: "center" }}>
          {/* the left hamburger menu */}
          <Box sx={{ display: "flex", flexGrow: 0 }} id="app-header-navigation">
            <IconButton
              size="large"
              aria-label="app navigation"
              aria-controls="app-nav-menu"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="app-nav-menu"
              anchorEl={AppNavMenuAnchor}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(AppNavMenuAnchor)}
              onClose={handleCloseNavMenu}
            >
              <AppNavMenuItems />
            </Menu>
          </Box>

          {/* this is the nirvai text in the center */}
          <TextBold
            sx={{
              display: "flex",
              marginBottom: 0,
              justifyContent: "center",
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
            }}
          >
            NIRV.ai
          </TextBold>

          {/*
              player settings menu
              DO NOT Move to a function
              it fks up the placement of the popup
          */}

          <Tooltip title="Open Player Settings">
            <IconButton onClick={handleOpenPlayerSettingsMenu} sx={{ p: 0 }}>
              <Avatar alt={`${callsign}'s avatar`} src={avatar} />
            </IconButton>
          </Tooltip>
          <Menu
            id="player-settings-menu"
            anchorEl={PlayerSettingsMenuAnchor}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            open={Boolean(PlayerSettingsMenuAnchor)}
            onClose={handleClosePlayerSettingsMenu}
          >
            <MenuItem onClick={handleClosePlayerSettingsMenu}>
              <ButtonLogout />
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Grid>
  );
};
