import React from "react";
import { Box, Stack } from "@mui/material";

const AppHeaderLogo = () => (
  <Stack
    component="section"
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
);

const AppHeaderActions = () => (
  <Stack
    spacing={2}
    direction="row"
    justifyContent="center"
    alignItems="center"
    sx={{
      textTransform: "capitalize",
      backgroundColor: "white",
      height: "100px",
    }}
  >
    <span>JOIN</span>
    <span>LOGIN</span>
    <span>LEARN</span>
  </Stack>
);

export const AppHeader = () => (
  <Box
    component="header"
    className="app-header"
    flexDirection="column"
    display="flex"
  >
    <AppHeaderLogo />
    <AppHeaderActions />
  </Box>
);
