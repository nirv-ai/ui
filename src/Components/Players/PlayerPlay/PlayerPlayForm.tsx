import React from "react";
import { Form } from "react-router-dom";

import { TextField, Stack } from "Library";

export const PlayerPlayForm = () => {
  return (
    <Form method="post" autoComplete="off">
      <Stack spacing={2}>
        <TextField id="new-player-callsign" name="callsign" />
        <TextField id="new-player-pass" name="password" type="password" />
      </Stack>
      <button type="submit">Submit</button>
    </Form>
  );
};
