import React, { useMemo, useState } from "react";
import { Box, Tabs, Tab, ListItem, IconButton } from "@material-ui/core";
import {
  FindInPageRounded,
  ListAltRounded,
  AddRounded,
  DeleteRounded,
  PageviewRounded,
  EmailRounded,
} from "@material-ui/icons";

import { BasePaper } from "app/Paper";
import DataGrid from "app/NewDataGrid";
import List from "app/SideUtilityList";

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
      <BasePaper>
        <Box my={1} display="flex" alignItems="center">
          <Tabs
            value={activeTab}
            textColor="primary"
            onChange={(e, nv) => setActiveTab(nv)}
            style={{ marginRight: "auto" }}
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
          <List>
            <ListItem>
              <IconButton title="Add Quote" onClick={() => setAddQ(true)}>
                <AddRounded />
              </IconButton>
            </ListItem>
            <ListItem>
              <IconButton title="Quote Requests" onClick={() => setReqQuote(true)}>
                <PageviewRounded />
              </IconButton>
            </ListItem>
            <ListItem>
              <IconButton title="Send Email" onClick={() => setEmailModal(true)}>
                <EmailRounded />
              </IconButton>
            </ListItem>
            <ListItem>
              <IconButton title="Delete Quote" onClick={() => setConfirm(true)} disabled={!selectedQuote}>
                <DeleteRounded />
              </IconButton>
            </ListItem>
          </List>
        </Box>
        <div style={activeTab !== 0 ? { display: "none" } : { flex: 1 }}>
          <DataGrid
            refresh={refresh}
            onRowSelected={(d) => {
              setSelectedQuote(d);
              setActiveTab(1);
            }}
            url="/quote"
            columns={columns}
          />
        </div>
        {activeTab === 1 && selectedQuote && <EditTab selectedQuote={selectedQuote} />}
      </BasePaper>
    </>
  );
}
