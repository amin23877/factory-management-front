import React, { Suspense, useEffect, useState } from "react";
import { Box, Tabs, Tab, ListItem, IconButton } from "@material-ui/core";
import {
  AddRounded,
  ShoppingCartRounded,
  PostAddRounded,
  CategoryRounded,
  LocalOfferRounded,
  PlaylistAddCheckRounded,
  FindInPageRounded,
  ListAltRounded,
} from "@material-ui/icons";

import Table from "features/FieldService/Tickets/Table";
import Details from "pages/FieldService/Ticket/Details";

import List from "app/SideUtilityList";
import TicketModal from "features/FieldService/Tickets/Modals";

import AddSOModal from "features/Sales/SO/AddSo";
import AddQuote from "features/Sales/Quote/AddQuote";
import AddTagModal from "features/FieldService/Tickets/AddTag";
import AddStatusModal from "features/FieldService/Tickets/AddStatus";
import AddCategoryModal from "features/FieldService/Tickets/AddCategory";
import { BasePaper } from "app/Paper";
import { Route, Switch, useHistory, useLocation, useParams } from "react-router-dom";
import MyBackdrop from "app/Backdrop";

export default function Tickets() {
  const history = useHistory();
  const location = useLocation();

  const { ticketId } = useParams<{ ticketId: string }>();

  const [activeTab, setActiveTab] = useState(location.pathname.split("/").length === 5 ? 1 : 0);

  useEffect(() => {
    if (location.pathname.split("/").length === 5) {
      setActiveTab(1);
    } else {
      setActiveTab(0);
    }
  }, [location]);

  const [ticketModal, setTicketModal] = useState(false);
  const [soModal, setSoModal] = useState(false);
  const [quoteModal, setQuoteModal] = useState(false);
  const [tagModal, setTagModal] = useState(false);
  const [statusModal, setStatusModal] = useState(false);
  const [categoryModal, setCategoryModal] = useState(false);

  return (
    <>
      {ticketId && (
        <AddSOModal
          open={soModal}
          onClose={() => setSoModal(false)}
          initialData={{ JobId: ticketId } as any}
          onDone={() => {}}
        />
      )}
      {ticketId && (
        <AddQuote
          open={quoteModal}
          onClose={() => setQuoteModal(false)}
          initialData={{ JobId: ticketId } as any}
          onDone={() => {}}
        />
      )}
      <TicketModal open={ticketModal} onClose={() => setTicketModal(false)} />
      <AddTagModal open={tagModal} onClose={() => setTagModal(false)} />
      <AddStatusModal open={statusModal} onClose={() => setStatusModal(false)} />
      <AddCategoryModal open={categoryModal} onClose={() => setCategoryModal(false)} />

      <BasePaper style={{ height: "100%" }}>
        <Box display="flex">
          <Tabs
            textColor="primary"
            value={activeTab}
            onChange={(e, nv) => {
              setActiveTab(nv);
              history.push({
                pathname: "/panel/fieldservice/tickets",
                search: window.location.search,
              });
            }}
            style={{ marginBottom: 10 }}
          >
            <Tab
              icon={
                <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <ListAltRounded fontSize="small" style={{ marginRight: 5 }} /> List
                </span>
              }
              wrapped
            />
            <Tab
              disabled={activeTab !== 1}
              icon={
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <FindInPageRounded fontSize="small" style={{ marginRight: 5 }} /> Details
                </span>
              }
            />
          </Tabs>
          <Box marginLeft="auto">
            <List>
              {activeTab === 0 && (
                <>
                  <ListItem>
                    <IconButton title="Add Ticket" onClick={() => setTicketModal(true)}>
                      <AddRounded />
                    </IconButton>
                  </ListItem>
                  <ListItem>
                    <IconButton
                      title="Add Tag"
                      onClick={() => {
                        setTagModal(true);
                      }}
                    >
                      <LocalOfferRounded />
                    </IconButton>
                  </ListItem>
                  <ListItem>
                    <IconButton
                      title="Add Status"
                      onClick={() => {
                        setStatusModal(true);
                      }}
                    >
                      <PlaylistAddCheckRounded />
                    </IconButton>
                  </ListItem>
                  <ListItem>
                    <IconButton
                      title="Add Category"
                      onClick={() => {
                        setCategoryModal(true);
                      }}
                    >
                      <CategoryRounded />
                    </IconButton>
                  </ListItem>
                </>
              )}
              {activeTab === 1 && (
                <>
                  <ListItem>
                    <IconButton title="Add new SO" onClick={() => setSoModal(true)}>
                      <ShoppingCartRounded />
                    </IconButton>
                  </ListItem>
                  <ListItem>
                    <IconButton title="Add new Quote" onClick={() => setQuoteModal(true)}>
                      <PostAddRounded />
                    </IconButton>
                  </ListItem>
                </>
              )}
            </List>
          </Box>
        </Box>
        <Box display="flex" height="90%">
          <Suspense fallback={<MyBackdrop />}>
            <Switch>
              <Route exact path="/panel/fieldservice/tickets">
                <Table
                  onRowSelected={(d) => {
                    history.push(`/panel/fieldservice/tickets/${d.id}${window.location.search}`);
                  }}
                />
              </Route>
              <Route exact path="/panel/fieldservice/tickets/:ticketId">
                <Details />
              </Route>
            </Switch>
          </Suspense>
        </Box>
      </BasePaper>
    </>
  );
}
