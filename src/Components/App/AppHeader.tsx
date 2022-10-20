/**
 * TODO: needs to switch on path, currently only usable for app landing
 */
import React from "react";
import { Box } from "@mui/material";
import { NavLink } from "react-router-dom";

import { Grid, Stack, TextBold, TextLight } from "Library";

export const AppHeaderLogo = () => (
  <Grid component="section">
    <TextBold fontSize="calc(64px + 2vmin)">NIRV.ai</TextBold>
  </Grid>
);

// @ts-ignore
const isActiveClassName = ({ isActive, isPending }) =>
  isActive ? "active" : isPending ? "pending" : "";

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
    <NavLink to="/" className={isActiveClassName}>
      <TextBold>home</TextBold>
    </NavLink>
    <NavLink to="join/player" className={isActiveClassName}>
      <TextBold>join</TextBold>
    </NavLink>
    <NavLink to="play/player" className={isActiveClassName}>
      <TextBold>play</TextBold>
    </NavLink>
    <NavLink to="learn" className={isActiveClassName}>
      <TextBold>learn</TextBold>
    </NavLink>
  </Stack>
);

export const AppHeader = () => (
  <Grid component="header" flexDirection="column" display="flex">
    <AppHeaderLogo />
    <AppHeaderActions />
  </Grid>
);
