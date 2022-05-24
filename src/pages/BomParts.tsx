import React from "react";
import { Container, Typography, Box } from "@material-ui/core";
import { useParams } from "react-router-dom";

import Button from "app/Button";
import PartsTable from "features/BOM/PartsTable";

import { LockButton } from "common/Lock";

function Parts() {
  const { bomId } = useParams<{ bomId: string }>();

  if (!bomId) {
    <Container>
      <Typography>Sorry, Can't find Parts for this BOM</Typography>
    </Container>;
  }

  return (
    <Container>
      <Box display="flex" alignItems="center" mb={1}>
        <Button kind="add">Add Part</Button>
        <div style={{ flexGrow: 1 }} />
        <LockButton />
      </Box>
      <PartsTable bomId={bomId} />
    </Container>
  );
}

export default Parts;
