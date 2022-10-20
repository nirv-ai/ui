/**
 * TODO: needs to switch on path, currently only usable for app landing
 */
import React from "react";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";

import { Grid, Stack } from "Library";

const AppHeaderLogo = () => (
  <Grid xs={12} component="section">
    <Stack
      spacing={2}
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

const AppHeaderActions = () => (
  <Stack
    spacing={2}
    direction="row"
    justifyContent="center"
    alignItems="center"
    sx={{
      backgroundColor: "white",
      height: "100px",
    }}
  >
    <Link to="join/player">JOIN</Link>
    <Link to="play/player">PLAY</Link>
    <Link to="learn">LEARN</Link>
  </Stack>
);

export const AppHeader = () => (
  <Grid xs={12} component="header" flexDirection="column" display="flex">
    <AppHeaderLogo />
    <AppHeaderActions />
  </Grid>
);
