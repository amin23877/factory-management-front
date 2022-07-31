import React, { useState } from "react";
import { Box, Grid, Tabs, Tab, useMediaQuery, ListItem, IconButton } from "@material-ui/core";
import {
  AddRounded,
  FindInPageRounded,
  HelpOutlineRounded,
  ListAltRounded,
  ThumbDownAltRounded,
  MenuRounded,
  DeleteRounded,
} from "@material-ui/icons";

import { BasePaper } from "app/Paper";
import Toast from "app/Toast";
import List from "app/SideUtilityList";

import { deleteClient, IClient } from "api/client";

import AddCustomerModal from "./Modals";
import CustomerTypeModal from "./CustomerType";
import Confirm from "../../Modals/Confirm";
import Details from "./Details";
import CustomerDataGrid from "./DataGrid";

export default function Customers() {
  const [activeTab, setActiveTab] = useState(0);
  const [addCustomerModal, setAddCustomerModal] = useState(false);
  const [cTypeModal, setCTypeModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState<IClient>();
  const [conf, setConf] = useState(false);
  const [req, setReq] = useState(false);
  const phone = useMediaQuery("(max-width:900px)");

  const handleDelete = async () => {
    try {
      if (selectedRow) {
        await deleteClient(selectedRow.id);

        setConf(false);
        setActiveTab(0);
        Toast("Record deleted");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // TODO: Refactor, Add and Test Approved functionality
  // TODO: Refactor, Add and Test ClientType functionality
  // TODO: Refactor, Add and Test Add and Edit Client functionality

  return (
    <>
      <Confirm open={conf} onClose={() => setConf(false)} onConfirm={handleDelete} />
      <AddCustomerModal open={addCustomerModal} onClose={() => setAddCustomerModal(false)} />
      <CustomerTypeModal open={cTypeModal} onClose={() => setCTypeModal(false)} />

      <Grid container style={{ marginRight: "1px" }}>
        <Grid item xs={12}>
          <BasePaper>
            <Box mb={1} display="flex">
              <Tabs
                value={activeTab}
                onChange={(e, nv) => setActiveTab(nv)}
                textColor="primary"
                variant="scrollable"
                scrollButtons={phone ? "on" : "auto"}
                style={phone ? { width: "calc(100vw - 50px)" } : {}}
              >
                <Tab
                  icon={
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <ListAltRounded style={{ marginRight: "5px" }} /> List
                    </span>
                  }
                  wrapped
                />
                <Tab
                  icon={
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <HelpOutlineRounded style={{ marginRight: "5px" }} /> Requests
                    </span>
                  }
                  wrapped
                />
                <Tab
                  icon={
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <ThumbDownAltRounded style={{ marginRight: "5px" }} /> Rejected
                    </span>
                  }
                  wrapped
                />

                <Tab
                  disabled={!selectedRow}
                  icon={
                    <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <FindInPageRounded style={{ marginRight: "5px" }} /> Details
                    </span>
                  }
                />
              </Tabs>
              <div style={{ flex: 1 }}></div>
              <Box display="flex" alignItems="center" mb={1}>
                <List>
                  <ListItem>
                    <IconButton title="Add Client" onClick={() => setAddCustomerModal(true)}>
                      <AddRounded />
                    </IconButton>
                  </ListItem>
                  <ListItem>
                    <IconButton title="Add Type" onClick={() => setCTypeModal(true)}>
                      <MenuRounded />
                    </IconButton>
                  </ListItem>
                  <ListItem>
                    <IconButton title="Delete Client" disabled={!selectedRow} onClick={() => setConf(true)}>
                      <DeleteRounded />
                    </IconButton>
                  </ListItem>
                </List>
              </Box>
            </Box>
            <div style={activeTab !== 0 ? { display: "none" } : { flex: 1 }}>
              <CustomerDataGrid
                url="/client"
                onRowSelected={(v) => {
                  setSelectedRow(v);
                  setActiveTab(3);
                  setReq(false);
                }}
              />
            </div>

            <div style={activeTab !== 1 ? { display: "none" } : { flex: 1 }}>
              <CustomerDataGrid
                url="/client"
                params={{ approved: "null" }}
                onRowSelected={(v) => {
                  setSelectedRow(v);
                  setActiveTab(3);
                  setReq(true);
                }}
              />
            </div>

            <div style={activeTab !== 2 ? { display: "none" } : { flex: 1 }}>
              <CustomerDataGrid
                url="/client"
                params={{ approved: false }}
                onRowSelected={(v) => {
                  setSelectedRow(v);
                  setActiveTab(3);
                  setReq(false);
                }}
              />
            </div>

            {activeTab === 3 && selectedRow && (
              <Details selectedRow={selectedRow} req={req} changeTab={(i) => setActiveTab(i)} />
            )}
          </BasePaper>
        </Grid>
      </Grid>
    </>
  );
}
