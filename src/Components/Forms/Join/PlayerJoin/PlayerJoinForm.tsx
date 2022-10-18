// TODO: this likely should be PlayerEditScreen
// ^ if we continue to use react - router - dom form

import React from "react";
import { Form } from "react-router-dom";

export interface PlayerDataInterface {
  avatar: string;
  callsign: string;
  first: string;
  last: string;
  purpose: string;
}

export interface PlayerJoinFormInterface {
  player: PlayerDataInterface;
}

export const PlayerJoinForm: React.FC<PlayerJoinFormInterface> = ({
  player,
}) => {
  return (
    <Form method="post">
      <button name="player-callsign" value={player.callsign}>
        {player.callsign}
      </button>
    </Form>
  );
};

export const PlayerDetails = () => {
  const playerData: PlayerDataInterface = {
    avatar: "https://placekitten.com/g/200/200",
    callsign: "nick name",
    first: "first name",
    last: "last name",
    purpose: "your_handle",
  };

  return (
    <div id="player-details">
      <img
        key={playerData.avatar}
        src={playerData.avatar}
        alt="player avatar"
      />

      <div>
        <h1>
          {playerData.first || playerData.last ? (
            <>
              {playerData.first} {playerData.last}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          <PlayerJoinForm player={playerData} />
        </h1>

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (
                !window.confirm(
                  "Please confirm you want to delete this record."
                )
              ) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
};
