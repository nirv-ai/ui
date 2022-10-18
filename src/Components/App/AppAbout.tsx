import React from "react";
import { Box } from "@mui/material";

import { AppStats } from ".";

export const AppAbout = () => (
  <Box component="section" sx={{ backgroundColor: "#FF4D50", color: "white" }}>
    <p>
      NIRV.ai is a lifestyle management platform for players to socialize and
      optimize lifestyle choices
    </p>
    <AppStats />
  </Box>
);
