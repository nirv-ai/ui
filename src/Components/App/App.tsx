import React from "react";
import { Box } from "@mui/material"; // Grid version 2

import "./App.css";
import { AppLanding } from "./AppLanding";

export const App = () => (
  <Box sx={{ flexGrow: 1 }} className="app">
    <AppLanding />
  </Box>
);
