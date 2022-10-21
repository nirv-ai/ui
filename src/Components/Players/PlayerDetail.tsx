// TODO: this renders hella ugly
import React from "react";
import { useLoaderData } from "react-router-dom";

import { Grid, List, NotFound } from "Library";
import { type PlayerDataInterface } from "Data";

export interface PlayerDetailLoaderData {
  player: PlayerDataInterface;
}
export const PlayerDetail = () => {
  const loaderData = useLoaderData() as PlayerDetailLoaderData;

  const renderPlayer = () => {
    if (loaderData instanceof Error) return <NotFound />;

    const {
      player: { about, avatar, callsign, first, last },
    } = loaderData;

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
    return <List listData={listData} />;
  };

  return (
    <Grid component="article" id="player-details">
      {renderPlayer()}
    </Grid>
  );
};
