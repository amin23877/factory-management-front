import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";

import { clusterType } from "api/cluster";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "95vw",
      overflow: "auto",
      listStyle: "none",
      whiteSpace: "nowrap",
      padding: theme.spacing(0.5),
      margin: 0,
      "& li": {
        display: "inline-block",
      },
    },
    chip: {
      margin: theme.spacing(0.5),
    },
  })
);

export default function ClusterChips({
  clusters,
  active,
  onClick,
}: {
  clusters: clusterType[];
  active?: clusterType;
  onClick: (cluster: clusterType) => void;
}) {
  const classes = useStyles();

  return (
    <Paper component="ul" className={classes.root}>
      {clusters.map((data) => (
        <li key={data.id}>
          <Chip
            label={data.clusterValue}
            className={classes.chip}
            color={data.id === active?.id ? "primary" : "secondary"}
            onClick={() => onClick(data)}
          />
        </li>
      ))}
    </Paper>
  );
}
