import React, { useState } from "react";

import Box from "@material-ui/core/Box";
import ListItem from "@material-ui/core/ListItem";
import IconButton from "@material-ui/core/IconButton";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { AddRounded, DeleteRounded, FindInPageRounded, ListAltRounded, PrintRounded } from "@material-ui/icons";

import List from "app/SideUtilityList";
import DataGrid from "app/NewDataGrid";
import AddPQuoteModal from "./AddPQuoteModal";
import Details from "./Details";

import { deletePurchaseQuote, IPurchaseQuote } from "api/purchaseQuote";
import Confirm from "../../Modals/Confirm";

import { BasePaper } from "app/Paper";

function Index() {
  const [activeTab, setActiveTab] = useState(0);
  const [addPQ, setAddPQ] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const [selPQ, setSelPQ] = useState<IPurchaseQuote | undefined>({
    id: "",
    requester: "",
    ContactId: "",
    VendorId: "",
  });

  const cols = [
    {
      name: "date",
      header: "Date",
      type: "date",
      minWidth: 90,
    },
    { name: "senderNumber", headerName: "ID", minWidth: 90 },
    { name: "Vendor", minWidth: 90, render: ({ data }: any) => data?.VendorId?.name, flex: 1 },
    { name: "SO", minWidth: 90, render: ({ data }: any) => data?.SOId?.number, flex: 1 },
    { name: "Staff", minWidth: 90, render: ({ data }: any) => data?.EmployeeId?.username, flex: 1 },
    { name: "contactName", headerName: "Contact", minWidth: 90 },
  ];

  const handleDelete = async () => {
    try {
      if (selPQ && selPQ.id) {
        const resp = await deletePurchaseQuote(selPQ.id);
        if (resp) {
          // refreshPQs();
          setConfirm(false);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <AddPQuoteModal open={addPQ} onClose={() => setAddPQ(false)} onDone={() => {}} />
      {selPQ && (
        <Confirm
          open={confirm}
          onClose={() => setConfirm(false)}
          onConfirm={handleDelete}
          text={`Are you sure? You are going to delete purchase quote ${selPQ?.number}`}
        />
      )}
      <BasePaper>
        <Box display="flex">
          <Box flex={1} flexGrow={1}>
            <Box display="flex">
              <Tabs
                style={{ marginBottom: "1em" }}
                textColor="primary"
                value={activeTab}
                onChange={(e, nv) => setActiveTab(nv)}
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
                      <ListAltRounded fontSize="small" style={{ marginRight: 5 }} /> List
                    </span>
                  }
                  wrapped
                />
                <Tab
                  disabled={!selPQ}
                  icon={
                    <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <FindInPageRounded fontSize="small" style={{ marginRight: 5 }} /> Details
                    </span>
                  }
                />
              </Tabs>
              <div style={{ flex: 1 }}> </div>
              <Box>
                <List>
                  <ListItem>
                    <IconButton
                      onClick={() => {
                        setActiveTab(0);
                        setSelPQ(undefined);
                        setAddPQ(true);
                      }}
                    >
                      <AddRounded />
                    </IconButton>
                  </ListItem>
                  <ListItem>
                    <IconButton onClick={() => setConfirm(true)}>
                      <DeleteRounded />
                    </IconButton>
                  </ListItem>
                  <ListItem>
                    <IconButton>
                      <PrintRounded />
                    </IconButton>
                  </ListItem>
                </List>
              </Box>
            </Box>
            {activeTab === 0 && (
              <DataGrid
                style={{ minHeight: "calc(100vh - 160px)" }}
                columns={cols}
                url="/purchaseQuote"
                onRowSelected={(d) => {
                  setSelPQ(d);
                  setActiveTab(1);
                }}
              />
            )}
            {activeTab === 1 && selPQ && <Details initialValues={selPQ} onDone={() => {}} />}
          </Box>
        </Box>
      </BasePaper>
    </>
  );
}

export default Index;
