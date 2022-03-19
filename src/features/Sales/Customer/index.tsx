import React, { useState } from "react";
import { Box, Grid, Tabs, Tab, useMediaQuery } from "@material-ui/core";
import {
  AddRounded,
  FindInPageRounded,
  HelpOutlineRounded,
  ListAltRounded,
  ThumbDownAltRounded,
} from "@material-ui/icons";

import Button from "app/Button";
import { BasePaper } from "app/Paper";
import Toast from "app/Toast";

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
                {activeTab !== 3 && (
                  <>
                    <Button
                      onClick={() => setAddCustomerModal(true)}
                      style={{
                        backgroundColor: "#1a73e8",
                        color: "#fff",
                        margin: "0 0.5em",
                        padding: " 6px 15px",
                        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                      }}
                    >
                      <AddRounded />
                      Add Client
                    </Button>
                    <Button kind="add" onClick={() => setCTypeModal(true)} style={{ margin: "0 0.5em" }}>
                      Add Type
                    </Button>
                  </>
                )}
                {selectedRow && activeTab === 3 && (
                  <Button onClick={() => setConf(true)} kind="delete">
                    Delete Client
                  </Button>
                )}
              </Box>
            </Box>
            {activeTab === 0 && (
              <CustomerDataGrid
                url="/client"
                onRowSelected={(v) => {
                  setSelectedRow(v);
                  setActiveTab(3);
                  setReq(false);
                }}
              />
            )}
            {activeTab === 1 && (
              <CustomerDataGrid
                url="/client"
                params={{ approved: "null" }}
                onRowSelected={(v) => {
                  setSelectedRow(v);
                  setActiveTab(3);
                  setReq(true);
                }}
              />
            )}
            {activeTab === 2 && (
              <CustomerDataGrid
                url="/client"
                params={{ approved: false }}
                onRowSelected={(v) => {
                  setSelectedRow(v);
                  setActiveTab(3);
                  setReq(false);
                }}
              />
            )}
            {activeTab === 3 && selectedRow && (
              <Details selectedRow={selectedRow} req={req} changeTab={(i) => setActiveTab(i)} />
            )}
          </BasePaper>
        </Grid>
      </Grid>
    </>
  );
}
