import React from "react";
import { Link } from "@mui/material";

import { Stack, TextBold } from "Library";

const linkSx = { fontFamily: "monospace" };
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
    <Link href="/">
      <TextBold fontSize="12px" sx={linkSx}>
        home
      </TextBold>
    </Link>
    <Link href="join/player">
      <TextBold fontSize="12px" sx={linkSx}>
        join
      </TextBold>
    </Link>
    <Link href="play/player">
      <TextBold fontSize="12px" sx={linkSx}>
        play
      </TextBold>
    </Link>
    <Link href="learn">
      <TextBold fontSize="12px" sx={linkSx}>
        learn
      </TextBold>
    </Link>
  </Stack>
);
