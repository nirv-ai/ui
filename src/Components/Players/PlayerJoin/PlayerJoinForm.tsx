import { useEffect, useContext } from "react";
import { Form, useActionData, useNavigate } from "react-router-dom";

import type { PlayerDataOrErrorType } from "Types";
import { TextField, Stack, Button, ActionField } from "Library";
import { PLAYER_JOIN } from "Router";
import {
  AUTHNZ_CONTEXT_NAME,
  ContextUpdaterContext,
  PLAYER_CONTEXT_NAME,
  PLAYER_KEY,
  type ContextUpdaterInterface,
} from "Data";

export const PlayerJoinForm = () => {
  const response = useActionData() as PlayerDataOrErrorType | undefined;
  const navigate = useNavigate();
  const { updateContext } = useContext(ContextUpdaterContext);

  useEffect(() => {
    if (!response) return void 0;

    // TODO: show toast
    if (response instanceof Error) {
      return console.error(response);
    }

    // TODO: update context with player and authnz
    console.info("\n\n player joned, navigating to player detail");

    updateContext(PLAYER_CONTEXT_NAME, response);
    updateContext(AUTHNZ_CONTEXT_NAME, { [PLAYER_KEY]: response.callsign });

    navigate(`/player/${response.callsign}`);
  }, [response, navigate, updateContext]);

  return (
    <Form method="post" autoComplete="off">
      <Stack>
        <ActionField actionType={PLAYER_JOIN} />
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
      <Button type="submit" sx={{ marginTop: "1rem" }}>
        submit
      </Button>
    </Form>
  );
};
