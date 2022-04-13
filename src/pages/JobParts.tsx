import React from "react";
import { Container, Typography } from "@material-ui/core";
import { useParams } from "react-router-dom";

import JobRecordsTable from "features/JOB/JobRecordsTable";

function Parts() {
  const { unitId } = useParams<{ unitId: string }>();

  if (!unitId) {
    <Container>
      <Typography>Sorry, Can't find Parts for this bom</Typography>
    </Container>;
  }

  return (
    <Container>
      <JobRecordsTable unitId={unitId} />
    </Container>
  );
}

export default Parts;
