import React, { useState } from "react";
import { Box, LinearProgress, useMediaQuery } from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import EditForm from "../../../features/Sales/PO/EditForm";
import NoteTab from "common/Note/Tab";
import DocumentTab from "common/Document/Tab";
import { BasePaper } from "app/Paper";

import { customerPoType, deleteCustomerPo } from "api/customerPo";
import AuditTable from "common/Audit";
import { useHistory, useParams } from "react-router-dom";
import useSWR from "swr";
import Confirm from "features/Modals/Confirm";

export default function Details({ confirm, onClose }: { confirm?: boolean; onClose?: () => void }) {
  const history = useHistory();
  const { poId } = useParams<{ poId: string }>();
  const { data: poData } = useSWR<customerPoType>(poId ? `/customerPo/${poId}` : null);

  const [activeTab, setActiveTab] = useState(0);
  const phone = useMediaQuery("(max-width:900px)");

  const handleDelete = async () => {
    try {
      if (poId) {
        const resp = await deleteCustomerPo(poId);
        if (resp) {
          history.push("/panel/sales/customerPOs");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      onClose && onClose();
    }
  };

  if (!poData) {
    return <LinearProgress />;
  }

  return (
    <>
      <Confirm
        open={Boolean(confirm)}
        onClose={() => (onClose ? onClose() : () => {})}
        onConfirm={handleDelete}
        text={`Are you sure, You are going to delete this Customer PO`}
      />
      <Box display="grid" gridGap={10} gridTemplateColumns={phone ? "1fr" : "3fr 4fr"}>
        <EditForm poData={poData} />
        <BasePaper>
          <Tabs
            style={{ marginBottom: "10px" }}
            textColor="primary"
            value={activeTab}
            onChange={(e, nv) => setActiveTab(nv)}
            variant="scrollable"
          >
            <Tab label="Documents" />
            <Tab label="Notes" />
            <Tab label="Auditing" />
          </Tabs>
          {activeTab === 0 && <DocumentTab itemId={poData.id} model="salesPo" />}
          {activeTab === 1 && <NoteTab itemId={poData.id} model="salesPo" />}
          {activeTab === 2 && <AuditTable itemId={poData.id} />}
        </BasePaper>
      </Box>
    </>
  );
}
