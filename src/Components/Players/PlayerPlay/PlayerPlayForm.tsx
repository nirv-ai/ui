import React from "react";
import { Form } from "react-router-dom";

import { TextField, Stack, TextBold, Button } from "Library";

export const PlayerPlayForm = () => {
  return (
    <Form method="post" autoComplete="off">
      <Stack>
        <TextField id="new-player-callsign" name="callsign" />
        <TextField id="new-player-pass" name="password" type="password" />
      </Stack>
      <Button type="submit">
        <TextBold>submit</TextBold>
      </Button>
    </Form>
  );
};
