import React from "react";
import { useLoaderData } from "react-router-dom";

export interface PlayerDataInterface {
  about: string;
  avatar: string;
  callsign: string;
  first: string;
  last: string;
}

export interface PlayerDetailLoaderData {
  player: PlayerDataInterface;
}
export const PlayerDetail = () => {
  const { player } = useLoaderData() as PlayerDetailLoaderData;

  return (
    <div id="player-details">
      <img key={player.avatar} src={player.avatar} alt="player avatar" />

      <div>
        <h1>
          {player.first || player.last ? (
            <>
              {player.first} {player.last}
            </>
          ) : (
            <i>No Name</i>
          )}
        </h1>

        <div></div>
      </div>
    </div>
  );
};
