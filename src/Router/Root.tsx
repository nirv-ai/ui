import React from "react";
import { Box, Container, CssBaseline, ThemeProvider } from "@mui/material";
import { Outlet } from "react-router-dom";

import { Grid } from "Library";
import { AppHeader } from "Components";
import { Theme } from "Theme";

export const Root = () => (
  <>
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      <Container disableGutters>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container component="section">
            <AppHeader />
            <Container>
              <Outlet />
            </Container>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  </>
);
