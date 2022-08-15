import React, { Suspense, useEffect, useMemo, useState } from "react";
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

import Confirm from "features/Modals/Confirm";
import EditTab from "pages/Sales/Quote/Details";
import AddQuote from "features/Sales/Quote/AddQuote";
import ReqQuoteModal from "features/Sales/Quote/ReqQuote/Modals";
import EmailModal from "features/Email/Modal";

import { deleteQuote } from "api/quote";
import { Route, Switch, useHistory, useLocation, useParams } from "react-router-dom";
import MyBackdrop from "app/Backdrop";

export default function QuotePanel() {
  const history = useHistory();
  const location = useLocation();
  const { quoteId } = useParams<{ quoteId: string }>();

  const [activeTab, setActiveTab] = useState(location.pathname.split("/").length === 5 ? 1 : 0);
  const [addQ, setAddQ] = useState(false);
  const [reqQuote, setReqQuote] = useState(false);
  const [compQ] = useState<any>();
  const [confirm, setConfirm] = useState(false);
  const [emailModal, setEmailModal] = useState(false);

  const [refresh, setRefresh] = useState<number>(0);

  useEffect(() => {
    if (location.pathname.split("/").length === 5) {
      setActiveTab(1);
    } else {
      setActiveTab(0);
    }
  }, [location]);

  const handleDelete = async () => {
    try {
      if (quoteId) {
        const resp = await deleteQuote(quoteId);
        if (resp) {
          setRefresh((p) => p + 1);
        }
        setConfirm(false);
        history.push("/panel/sales/quotes");
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
            history.push(`/panel/sales/quotes/${quote?.id}`);
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
            onChange={(e, nv) => {
              setActiveTab(nv);
              history.push({
                pathname: "/panel/sales/quotes",
                search: window.location.search,
              });
            }}
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
              disabled={activeTab !== 1}
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
            {activeTab === 1 && (
              <ListItem>
                <IconButton title="Delete Quote" onClick={() => setConfirm(true)}>
                  <DeleteRounded />
                </IconButton>
              </ListItem>
            )}
          </List>
        </Box>
        <Suspense fallback={<MyBackdrop />}>
          <Switch>
            <Route exact path="/panel/sales/quotes">
              <DataGrid
                refresh={refresh}
                onRowSelected={(d) => {
                  history.push(`/panel/sales/quotes/${d.id}${window.location.search}`);
                }}
                url="/quote"
                columns={columns}
              />
            </Route>
            <Route exact path="/panel/sales/quotes/:quoteId">
              {" "}
              <EditTab />
            </Route>
          </Switch>
        </Suspense>
      </BasePaper>
    </>
  );
}
