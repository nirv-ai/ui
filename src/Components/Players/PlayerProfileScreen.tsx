// TODO: this renders hella ugly
import React from "react";
import { useLoaderData } from "react-router-dom";

import { Grid, List, NotFound } from "Library";
import { type LoadPlayerType } from "Router";

const listItemProps = {
  sx: { textAlign: "center", justifyContent: "center", alignItems: "center" },
};

export const PlayerProfileScreen = () => {
  const loaderData = useLoaderData() as LoadPlayerType;

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
          type: "avatar",
          width: 200,
          height: 200,
        },
        { text: callsign, type: "text" },
      ],
      [
        { text: first, type: "text" },
        { text: last, type: "text" },
        { text: about, type: "text" },
      ],
    ];

    return <List listData={listData} listItemProps={listItemProps} />;
  };

  return (
    <Grid component="article" id="player-details">
      {renderPlayer()}
    </Grid>
  );
};
