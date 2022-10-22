import { useEffect } from "react";
import { Form, useActionData, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

import { TextField, Stack, Button, ActionField } from "Library";
import { PLAYER_PLAY, type ValidatePlayerPlayFormType } from "Router";

export const PlayerPlayForm = () => {
  const response = useActionData() as ValidatePlayerPlayFormType | undefined;
  const navigate = useNavigate();

  useEffect(() => {
    if (!response) return void 0;

    // TODO: show toast
    if (response instanceof Error) {
      return console.error(response);
    }

    // TODO: update context with player and authnz
    navigate(`/player/${response.callsign}`);
  }, [response, navigate]);

  return (
    <Box mt="2rem">
      <Form method="post" autoComplete="off">
        <ActionField actionType={PLAYER_PLAY} />
        <Stack>
          <TextField id="new-player-callsign" name="callsign" />
          <TextField id="new-player-pass" name="password" type="password" />
        </Stack>
        <Button type="submit" sx={{ marginTop: "1rem" }}>
          submit
        </Button>
      </Form>
    </Box>
  );
};
