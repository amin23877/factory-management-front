import React from "react";
import { Container } from "@material-ui/core";
import useSWR from "swr";

import BaseDataGrid from "app/BaseDataGrid";

export default function Dashboard() {
  const { data: purchasingRequiredItems } = useSWR<{ result: any[]; total: number }>(
    "/notification?type=Purchasing Required"
  );

  return (
    <Container>
      <BaseDataGrid cols={[]} rows={purchasingRequiredItems?.result || []} />
    </Container>
  );
}
