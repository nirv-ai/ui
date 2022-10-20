/**
 * TODO: needs to switch on path, currently only usable for app landing
 */
import React from "react";
import { Box } from "@mui/material";
import { NavLink } from "react-router-dom";

import { Grid, Stack } from "Library";

const AppHeaderLogo = () => (
  <Grid component="section">
    <Stack
      direction="row"
      sx={{ height: "150px", backgroundColor: "#EEEEEE" }}
      justifyContent="center"
      alignItems="center"
    >
      <Box
        component="h1"
        display="flex"
        justifyContent="center"
        alignItems="center"
        fontSize="calc(64px + 2vmin)"
      >
        NIRV.ai
      </Box>
      <Box
        component="section"
        display="grid"
        gridTemplateColumns="repeat(2, 1fr)"
        gridRow="auto auto"
        justifyContent="center"
        alignItems="center"
        fontSize="calc(16px + 2vmin)"
      >
        <div>N</div>
        <div>I</div>
        <div>R</div>
        <div>V</div>
      </Box>
    </Stack>
  </Grid>
);

// @ts-ignore
const isActiveClassName = ({ isActive, isPending }) =>
  isActive ? "active" : isPending ? "pending" : "";

const AppHeaderActions = () => (
  <Stack
    direction="row"
    justifyContent="center"
    alignItems="center"
    sx={{
      backgroundColor: "white",
      height: "100px",
    }}
  >
    <NavLink to="join/player" className={isActiveClassName}>
      JOIN
    </NavLink>
    <NavLink to="play/player" className={isActiveClassName}>
      PLAY
    </NavLink>
    <NavLink to="learn" className={isActiveClassName}>
      LEARN
    </NavLink>
  </Stack>
);

export const AppHeader = () => (
  <Grid component="header" flexDirection="column" display="flex">
    <AppHeaderLogo />
    <AppHeaderActions />
  </Grid>
);
