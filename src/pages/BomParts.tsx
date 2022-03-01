import React from "react";
import { Container, Typography } from "@material-ui/core";
import { useParams } from "react-router-dom";

import PartsTable from "features/BOM/PartsTable";

function Parts() {
  const { bomId } = useParams<{ bomId: string }>();

  if (!bomId) {
    <Container>
      <Typography>Sorry, Can't find Parts for this BOM</Typography>
    </Container>;
  }

  return (
    <Container>
      <PartsTable bomId={bomId} />
    </Container>
  );
}

export default Parts;
