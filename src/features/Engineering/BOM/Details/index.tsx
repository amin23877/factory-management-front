import React from "react";
import { Box } from "@material-ui/core";

import Form from "./Form";
import { BasePaper } from "app/Paper";

import { clusterType } from "api/cluster";
import Levels from "./Levels";

export default function Details({ selectedRow }: { selectedRow: clusterType }) {
  return (
    <Box display="grid" gridTemplateColumns="3fr 9fr" style={{ gap: 8 }}>
      <BasePaper>
        <Form initialValues={selectedRow} />
      </BasePaper>
      <BasePaper>
        <Levels selectedRow={selectedRow} />
      </BasePaper>
    </Box>
  );
}
