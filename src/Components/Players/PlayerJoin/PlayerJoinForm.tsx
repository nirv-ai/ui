import React from "react";
import { Form, type ActionFunction } from "react-router-dom";
import { Stack } from "@mui/material";

import { TextField } from "Library";
import { type PlayerDataInterface } from "Components";

export const validatePlayerJoinForm: ActionFunction = async ({
  request, // Request object
  params, // url params
}) => {
  const formData = (await request.formData()) as unknown as PlayerDataInterface;
  console.info("got player", formData);
  // return player;
};

export const PlayerJoinForm = () => {
  return (
    <Form method="post" autoComplete="off">
      <Stack>
        <TextField id="new-player-callsign" name="callsign" />
        <TextField name="first" id="new-player-first" />
        <TextField name="last" id="new-player-last" />
        <TextField name="about" id="new-player-about" />
        <TextField
          name="avatar"
          id="new-player-avatar"
          required={false}
          disabled
          value="https://placekitten.com/g/200/200"
        />
      </Stack>
      <button type="submit">Submit</button>
    </Form>
  );
};
