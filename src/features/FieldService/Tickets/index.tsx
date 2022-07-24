import React, { useState } from "react";
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

import Table from "./Table";
import Details from "./Details";

import List from "app/SideUtilityList";
import TicketModal from "./Modals";

import { ITicket } from "api/ticket";
import AddSOModal from "../../Sales/SO/AddSo";
import AddQuote from "../../Sales/Quote/AddQuote";
import AddTagModal from "./AddTag";
import AddStatusModal from "./AddStatus";
import AddCategoryModal from "./AddCategory";
import { BasePaper } from "app/Paper";

export default function Tickets() {
  const [ticketModal, setTicketModal] = useState(false);
  const [soModal, setSoModal] = useState(false);
  const [quoteModal, setQuoteModal] = useState(false);
  const [tagModal, setTagModal] = useState(false);
  const [statusModal, setStatusModal] = useState(false);
  const [categoryModal, setCategoryModal] = useState(false);

  const [selectedJob, setSelectedJob] = useState<ITicket>();
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      {selectedJob && (
        <AddSOModal
          open={soModal}
          onClose={() => setSoModal(false)}
          initialData={{ JobId: selectedJob.id } as any}
          onDone={() => {}}
        />
      )}
      {selectedJob && (
        <AddQuote
          open={quoteModal}
          onClose={() => setQuoteModal(false)}
          initialData={{ JobId: selectedJob.id } as any}
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
            onChange={(e, nv) => setActiveTab(nv)}
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
              disabled={!selectedJob}
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
          <div style={activeTab !== 0 ? { display: "none" } : { flex: 1 }}>
            <Table
              onRowSelected={(r) => {
                setSelectedJob(r);
                setActiveTab(1);
              }}
            />
          </div>

          {activeTab === 1 && selectedJob && <Details initialValue={selectedJob} />}
        </Box>
      </BasePaper>
    </>
  );
}
