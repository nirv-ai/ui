import React from "react";
import { Form } from "react-router-dom";

import { TextField, Stack, TextBold, Button } from "Library";

export const PlayerJoinForm = () => {
  return (
    <Form method="post" autoComplete="off">
      <Stack>
        <TextField id="new-player-callsign" name="callsign" />
        <TextField id="new-player-pass" name="password" type="password" />
        <TextField id="new-player-email" name="email" type="email" />
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
      <Button type="submit">
        <TextBold>submit</TextBold>
      </Button>
    </Form>
  );
};
