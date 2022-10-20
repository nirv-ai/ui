import React from "react";
import { Form } from "react-router-dom";

import { TextField, Stack } from "Library";

export const PlayerJoinForm = () => {
  return (
    <Form method="post" autoComplete="off">
      <Stack spacing={2}>
        <TextField id="new-player-callsign" name="callsign" />
        <TextField id="new-player-pass" name="password" type="password" />
        <TextField name="first" id="new-player-first" />
        <TextField name="last" id="new-player-last" />
        <TextField name="about" id="new-player-about" multiline />
        <TextField
          name="avatar"
          id="new-player-avatar"
          defaultValue="https://placekitten.com/g/200/200"
          type="url"
        />
      </Stack>
      <button type="submit">Submit</button>
    </Form>
  );
};
