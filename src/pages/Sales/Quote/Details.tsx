import React from "react";
import { Box, useMediaQuery, LinearProgress } from "@material-ui/core";

import EditForm from "features/Sales/Quote/EditForm";

import { IQuote } from "api/quote";

import useSWR from "swr";
import { useParams } from "react-router-dom";
import DataGridTabs from "features/Sales/Quote/DataGridTabs";
import { LockProvider } from "common/Lock";

export default function EditTab() {
  const phone = useMediaQuery("(max-width:900px)");
  const { quoteId } = useParams<{ quoteId: string }>();
  const { data: selectedQuote } = useSWR<IQuote>(quoteId ? `/quote/${quoteId}` : null);

  if (!selectedQuote) {
    return <LinearProgress />;
  }
  return (
    <>
      <Box display="grid" gridGap={10} gridTemplateColumns={phone ? "1fr" : "3fr 4fr"}>
        <EditForm selectedQuote={selectedQuote} />
        <LockProvider>
          <DataGridTabs selectedQuote={selectedQuote} />
        </LockProvider>
      </Box>
    </>
  );
}
