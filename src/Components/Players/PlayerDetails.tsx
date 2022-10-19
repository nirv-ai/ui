import React from "react";

export interface PlayerDataInterface {
  about: string;
  avatar: string;
  callsign: string;
  first: string;
  last: string;
}

export const PlayerDetails = () => {
  const playerData: PlayerDataInterface = {
    avatar: "https://placekitten.com/g/200/200",
    callsign: "nick name",
    first: "first name",
    last: "last name",
    about: "your_handle",
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
        </h1>

        <div></div>
      </div>
    </div>
  );
};
