// TODO: this renders hella ugly
import React from "react";
import { useLoaderData } from "react-router-dom";

import { Grid, List } from "Library";
import { type PlayerDataInterface } from "Data";

export interface PlayerDetailLoaderData {
  player: PlayerDataInterface;
}
export const PlayerDetail = () => {
  const {
    player: { about, avatar, callsign, first, last },
  } = useLoaderData() as PlayerDetailLoaderData;

  const listData = [
    [
      {
        src: avatar,
        alt: `${callsign}'s avatar`,
        type: "img" as const,
        width: 200,
        height: 200,
      },
      { text: callsign, type: "text" as const },
    ],
    [
      { text: first, type: "text" as const },
      { text: last, type: "text" as const },
      { text: about, type: "text" as const },
    ],
  ];

  return (
    <Grid component="article" id="player-details">
      <List listData={listData} />
    </Grid>
  );
};
