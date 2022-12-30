import React from "react";
import { Box, useMediaQuery, LinearProgress } from "@material-ui/core";
import { useHistory, useParams } from "react-router-dom";
import useSWR from "swr";

import { LockProvider } from "common/Lock";
import DeleteConfirm from "common/DeleteConfirm";
import EditForm from "features/Sales/Quote/EditForm";
import DataGridTabs from "features/Sales/Quote/DataGridTabs";

import { IQuote } from "api/quote";

export default function EditTab({
  deleteConfirm,
  deleteConfirmOnClose,
}: {
  deleteConfirm?: boolean;
  deleteConfirmOnClose?: () => void;
}) {
  const history = useHistory();
  const phone = useMediaQuery("(max-width:900px)");
  const { quoteId } = useParams<{ quoteId: string }>();
  const { data: selectedQuote } = useSWR<IQuote>(quoteId ? `/quote/${quoteId}` : null);

  if (!selectedQuote) {
    return <LinearProgress />;
  }

  return (
    <>
      <DeleteConfirm
        open={Boolean(deleteConfirm)}
        onClose={() => (deleteConfirmOnClose ? deleteConfirmOnClose() : () => {})}
        url={`/quote/${quoteId}`}
        onDone={() => history.push("/panel/sales/quotes")}
      />
      <Box display="grid" gridGap={10} gridTemplateColumns={phone ? "1fr" : "3fr 4fr"}>
        <EditForm selectedQuote={selectedQuote} />
        <LockProvider>
          <DataGridTabs selectedQuote={selectedQuote} />
        </LockProvider>
      </Box>
    </>
  );
}
