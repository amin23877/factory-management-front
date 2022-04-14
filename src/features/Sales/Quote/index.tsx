import React, { useMemo, useState } from "react";
import { Box, Tabs, Tab } from "@material-ui/core";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import { FindInPageRounded, ListAltRounded } from "@material-ui/icons";

import Button from "app/Button";
import { BasePaper } from "app/Paper";
import DataGrid from "app/NewDataGrid";

import Confirm from "../../Modals/Confirm";
import EditTab from "./EditTab";
import AddQuote from "./AddQuote";
import ReqQuoteModal from "./ReqQuote/Modals";
import EmailModal from "../../Email/Modal";

import { deleteQuote, IQuote } from "api/quote";

export default function QuotePanel() {
  // interface del any
  const [selectedQuote, setSelectedQuote] = useState<IQuote | any>();
  const [activeTab, setActiveTab] = useState(0);
  const [addQ, setAddQ] = useState(false);
  const [reqQuote, setReqQuote] = useState(false);
  const [compQ] = useState<any>();
  const [confirm, setConfirm] = useState(false);
  const [emailModal, setEmailModal] = useState(false);

  const [refresh, setRefresh] = useState<number>(0);

  const handleDelete = async () => {
    try {
      if (selectedQuote && selectedQuote.id) {
        const resp = await deleteQuote(selectedQuote.id);
        if (resp) {
          setRefresh((p) => p + 1);
        }
        setConfirm(false);
        setSelectedQuote(undefined);
        setActiveTab(0);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const columns = useMemo(
    () => [
      {
        name: "createdAt",
        header: "Date",
        type: "date",
        minWidth: 100,
      },
      { name: "number", header: "Quote ID", minWidth: 100 },
      {
        name: "ClientId",
        header: "Client",
        minWidth: 100,
        render: ({ data }: any) => data?.ClientId?.name,
      },
      { name: "RepId", header: "Rep", minWidth: 100, render: ({ data }: any) => data.RepId?.name },
      {
        name: "RepId.state",
        header: "State",
        minWidth: 100,
        render: ({ data }: any) => data.RepId?.state,
      },
      {
        name: "requester",
        header: "Requester",
        render: ({ data }: any) => `${data.requester?.firstName || ""} ${data.requester?.lastName || ""}`,
        minWidth: 100,
      },
      {
        name: "ProjectId",
        header: "Project Name",
        minWidth: 100,
        render: ({ data }: any) => data.ProjectId?.name,
      },
      {
        name: "salesPerson",
        type: "string",
        header: "Quoted By",
        minWidth: 100,
        render: ({ data }: any) => data.salesPerson?.username,
      },
      { name: "SOId", header: "SO", minWidth: 100, render: ({ data }) => data.SOId?.number },
      { name: "status", header: "Status", minWidth: 100 },
      { name: "total", header: "Total Amount", minWidth: 100, type: "number" },
    ],
    []
  );

  return (
    <>
      <Confirm open={confirm} onClose={() => setConfirm(false)} onConfirm={handleDelete} />
      {addQ && (
        <AddQuote
          open={addQ}
          onClose={() => setAddQ(false)}
          initialData={compQ || {}}
          onDone={(quote) => {
            // setRefresh((prev) => prev + 1);
            setSelectedQuote(quote);
            setActiveTab(1);
          }}
        />
      )}
      <ReqQuoteModal open={reqQuote} onClose={() => setReqQuote(false)} />
      <EmailModal open={emailModal} onClose={() => setEmailModal(false)} />
      <Box display="flex" alignItems="center" style={{ gap: 10 }} mb={1}>
        <Button
          style={{
            backgroundColor: "#1a73e8",
            color: "#fff",
            padding: " 6px 15px",
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          }}
          onClick={() => setAddQ(true)}
        >
          <AddRoundedIcon />
          Add Quote
        </Button>

        {selectedQuote ? (
          <Button kind="delete" onClick={() => setConfirm(true)} disabled={!selectedQuote}>
            Delete Quote
          </Button>
        ) : (
          <>
            <Button variant="outlined" onClick={() => setReqQuote(true)} style={{ padding: "5px 10px" }}>
              Requests
            </Button>
            <Button variant="outlined" onClick={() => setEmailModal(true)} style={{ padding: "5px 10px" }}>
              Send Email
            </Button>
          </>
        )}

        <div style={{ flexGrow: 1 }} />
      </Box>

      <BasePaper>
        <Tabs
          value={activeTab}
          textColor="primary"
          onChange={(e, nv) => setActiveTab(nv)}
          style={{ marginBottom: "10px" }}
        >
          <Tab
            icon={
              <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <ListAltRounded style={{ marginRight: "5px" }} /> List
              </span>
            }
            wrapped
          />
          <Tab
            disabled={!selectedQuote}
            icon={
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <FindInPageRounded style={{ marginRight: "5px" }} /> Details
              </span>
            }
          />
        </Tabs>
        {activeTab === 0 && (
          <DataGrid
            refresh={refresh}
            onRowSelected={(d) => {
              setSelectedQuote(d);
              setActiveTab(1);
            }}
            url="/quote"
            columns={columns}
          />
        )}
        {activeTab === 1 && selectedQuote && <EditTab selectedQuote={selectedQuote} />}
      </BasePaper>
    </>
  );
}
