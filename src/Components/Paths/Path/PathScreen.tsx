// TODO: add material data table: https://mui.com/material-ui/react-table/

import type { FC } from "react";
import { useLoaderData } from "react-router-dom";

import { Grid, H2, type GridInterface } from "Library";
import type { PathDataInterface } from "Data";
import { PathProfile } from "./PathProfile";

export const PathScreen: FC<GridInterface> = (props) => {
  const { path } = useLoaderData() as {
    path: PathDataInterface;
  };

  return (
    <Grid container component="main" {...props}>
      <Grid>
        <H2>PATH</H2>
        <PathProfile path={path} />
      </Grid>
    </Grid>
  );
};
