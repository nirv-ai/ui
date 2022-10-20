import React from "react";
import { Form } from "react-router-dom";
import { Box } from "@mui/material";

import { TextField, Stack, TextBold, Button } from "Library";

export const PlayerPlayForm = () => {
  return (
    <Box mt="2rem">
      <Form method="post" autoComplete="off">
        <Stack>
          <TextField id="new-player-callsign" name="callsign" />
          <TextField id="new-player-pass" name="password" type="password" />
        </Stack>
        <Button type="submit" sx={{ marginTop: "1rem" }}>
          <TextBold>submit</TextBold>
        </Button>
      </Form>
    </Box>
  );
};
