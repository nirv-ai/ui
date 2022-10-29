// TODO: add material data table: https://mui.com/material-ui/react-table/

import type { FC } from "react";
import { useLoaderData } from "react-router-dom";

import { Grid, H2, type GridInterface } from "Library";
import { PathCardList } from "./PathCardList";

export const PathsScreen: FC<GridInterface> = (props) => {
  const loaderData = useLoaderData();

  console.info("\n\n got loader data", loaderData);

  return (
    <Grid container component="main" {...props}>
      <H2>PATHS</H2>
      <PathCardList />
    </Grid>
  );
};
