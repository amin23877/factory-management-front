import React from "react";
import { Box, useMediaQuery, LinearProgress } from "@material-ui/core";
import useSWR, { mutate } from "swr";
import { useHistory, useParams } from "react-router-dom";

import EditForm from "features/Sales/SO/EditForm";

import { ISO } from "api/so";
import DataGridTabs from "features/Sales/SO/DataGridTabs";
import { LockProvider } from "common/Lock";

import Confirm from "features/Modals/Confirm";
import { deleteSO } from "api/so";

export default function EditTab({
  onLineItemSelected,
  onLineServiceSelected,
  deleteConfirm,
  deleteConfirmOnClose,
}: {
  onLineItemSelected: (a: any) => void;
  onLineServiceSelected: (a: any) => void;
  deleteConfirm?: boolean;
  deleteConfirmOnClose?: () => void;
}) {
  const { soId } = useParams<{ soId: string }>();
  const { data: selectedSo } = useSWR<ISO>(soId ? `/so/${soId}` : null);
  const history = useHistory();

  const phone = useMediaQuery("(max-width:900px)");

  const handleDelete = async () => {
    try {
      if (soId) {
        const resp = await deleteSO(soId);
        if (resp) {
          mutate("/so");
          deleteConfirmOnClose && deleteConfirmOnClose();
          history.push(`/panel/sales/salesOrders${window.location.search}`);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!selectedSo) {
    return <LinearProgress />;
  }
  return (
    <Box display="grid" gridGap={10} gridTemplateColumns={phone ? "1fr" : "3fr 4fr"}>
      <Confirm
        open={Boolean(deleteConfirm)}
        onClose={() => (deleteConfirmOnClose ? deleteConfirmOnClose() : () => {})}
        onConfirm={handleDelete}
        text={`Are you sure, You want to delete this selected So ?`}
      />
      <EditForm selectedSo={selectedSo} />
      <LockProvider>
        <DataGridTabs selectedSo={selectedSo} onLineServiceSelected={onLineServiceSelected} />
      </LockProvider>
    </Box>
  );
}
