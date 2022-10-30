import type { FC } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import type { PathDataInterface } from "Data";

export interface PathCardInterface {
  path: PathDataInterface;
}
export const PathCard: FC<PathCardInterface> = ({ path }) => {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" component="div">
            {path.name}
          </Typography>
          <Typography variant="body2">{path.about}</Typography>
        </CardContent>
        <CardActions>
          {/* TODO: use link like in header */}
          <Button size="small" href={path.name.replace(/\s/g, "-")}>
            Learn More
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};
