import React from "react";
import { Box, useMediaQuery, LinearProgress } from "@material-ui/core";
import useSWR from "swr";
import { useParams } from "react-router-dom";

import EditForm from "features/Sales/SO/EditForm";

import { ISO } from "api/so";
import DataGridTabs from "features/Sales/SO/DataGridTabs";
import { LockProvider } from "common/Lock";

export default function EditTab({
  onLineItemSelected,
  onLineServiceSelected,
}: {
  onLineItemSelected: (a: any) => void;
  onLineServiceSelected: (a: any) => void;
}) {
  const { soId } = useParams<{ soId: string }>();
  const { data: selectedSo } = useSWR<ISO>(soId ? `/so/${soId}` : null);

  const phone = useMediaQuery("(max-width:900px)");

  if (!selectedSo) {
    return <LinearProgress />;
  }
  return (
    <Box display="grid" gridGap={10} gridTemplateColumns={phone ? "1fr" : "3fr 4fr"}>
      <EditForm selectedSo={selectedSo} />
      <LockProvider>
        <DataGridTabs selectedSo={selectedSo} onLineServiceSelected={onLineServiceSelected} />
      </LockProvider>
    </Box>
  );
}
