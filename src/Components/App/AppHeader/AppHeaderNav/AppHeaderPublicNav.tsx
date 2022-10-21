import React from "react";
import { Link } from "react-router-dom";

import { Stack, TextBold } from "Library";

export const AppHeaderPublicNav = () => (
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
      <TextBold fontSize="12px">home</TextBold>
    </Link>
    <Link to="join/player">
      <TextBold fontSize="12px">join</TextBold>
    </Link>
    <Link to="play/player">
      <TextBold fontSize="12px">play</TextBold>
    </Link>
    <Link to="learn">
      <TextBold fontSize="12px">learn</TextBold>
    </Link>
  </Stack>
);
