// TODO: think about CRUD
import type { FC } from "react";
import type { PathDataInterface } from "Data";
import { Chip } from "@mui/material";

import { Stack, H3, Grid, SubtitleBold, P } from "Library";

export interface PathProfileInterface {
  path: PathDataInterface;
}

export const PathProfile: FC<PathProfileInterface> = ({ path }) => {
  const {
    name: pathName,
    // not used
    display_name,
    created_at,
    updated_at,

    // render as P
    about,
    strategy,
    // render as chip
    skills,
    child_paths,
    incentives,
    disciplines,
    academia,
    // unknown data is rendered as P
    ...pathData
  } = path;

  const renderAsP = Object.assign({}, { about }, { strategy }, pathData);
  // TODO: skills, child_paths should be clickable
  const renderAsChip = {
    skills,
    child_paths,
    incentives,
    disciplines,
    academia,
  };

  // TODO: render as a list for now
  // @see https://mui.com/material-ui/react-list/
  return (
    <Stack>
      <H3>{pathName}</H3>
      <Grid container pt={0}>
        {Object.entries(renderAsP).map(([key, value]) => (
          <Grid key={key}>
            <SubtitleBold
              display={"flex"}
              alignSelf="flex-start"
              textTransform={"uppercase"}
            >
              {key.replace(/_/g, " ")}
            </SubtitleBold>
            <P>{value}</P>
          </Grid>
        ))}
        {Object.entries(renderAsChip).map(([key, value]) => (
          <Grid key={key} flexDirection="row">
            <SubtitleBold
              display={"flex"}
              alignSelf="flex-start"
              textTransform={"uppercase"}
            >
              {key.replace(/_/g, " ")}
            </SubtitleBold>
            <Grid pt={0} flexDirection="column">
              {value.split(",").map((text) => (
                <Chip key={text} label={text} />
              ))}
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};
