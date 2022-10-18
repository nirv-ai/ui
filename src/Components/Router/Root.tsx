import React from "react";
import {
  Box,
  Container,
  CssBaseline,
  ThemeProvider,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { Outlet } from "react-router-dom";

import { AppHeader } from "..";
import { RootTheme } from "./RootTheme";

export const Root = () => (
  <>
    <ThemeProvider theme={RootTheme}>
      <CssBaseline />
      <Container disableGutters>
        <Box
          sx={{
            flexGrow: 1,
          }}
        >
          <Grid container>
            <Grid xs={12}>
              <AppHeader />
            </Grid>
            <Outlet />
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  </>
);
