/**
 * TODO: needs to switch on path, currently only usable for app landing
 */
import React from "react";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";

import { Grid, Stack, TextBold, TextLight } from "Library";

export const AppHeaderLogo = () => (
  <Grid component="section">
    <TextBold fontSize="calc(64px + 2vmin)">NIRV.ai</TextBold>
  </Grid>
);

export interface IsActiveClassNameInterface {
  ({ isActive, isPending }: { isActive: boolean; isPending: boolean }): string;
}
const isActiveClassName: IsActiveClassNameInterface = ({
  isActive,
  isPending,
}) => (isActive ? "active" : isPending ? "pending" : "");

export const AppHeaderActions = () => (
  <Stack
    direction="row"
    justifyContent="center"
    alignItems="center"
    sx={{
      backgroundColor: "white",
      height: "100px",
    }}
  >
    <Link to="/">
      <TextBold>home</TextBold>
    </Link>
    <Link to="join/player">
      <TextBold>join</TextBold>
    </Link>
    <Link to="play/player">
      <TextBold>play</TextBold>
    </Link>
    <Link to="learn">
      <TextBold>learn</TextBold>
    </Link>
  </Stack>
);

export const AppHeader = () => (
  <Grid component="header" flexDirection="column" display="flex">
    <AppHeaderLogo />
    <AppHeaderActions />
  </Grid>
);
