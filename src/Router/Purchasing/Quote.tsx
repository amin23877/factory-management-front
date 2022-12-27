import React, { Suspense, useEffect, useState } from "react";

import Box from "@material-ui/core/Box";
import ListItem from "@material-ui/core/ListItem";
import IconButton from "@material-ui/core/IconButton";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { AddRounded, DeleteRounded, FindInPageRounded, ListAltRounded, PrintRounded } from "@material-ui/icons";

import List from "app/SideUtilityList";
import DataGrid from "app/NewDataGrid";
import AddPQuoteModal from "features/Purchase/Quote/AddPQuoteModal";
import Details from "pages/Purchasing/Quote/Details";

import { deletePurchaseQuote } from "api/purchaseQuote";
import Confirm from "features/Modals/Confirm";

import { BasePaper } from "app/Paper";
import { useLock } from "common/Lock";
import { Route, Switch, useHistory, useLocation, useParams } from "react-router-dom";
import MyBackdrop from "app/Backdrop";

function Index() {
  const history = useHistory();
  const location = useLocation();
  const { quoteId } = useParams<{ quoteId: string }>();

  const [activeTab, setActiveTab] = useState(location.pathname.split("/").length === 5 ? 1 : 0);
  const [addPQ, setAddPQ] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const { lock, setLock } = useLock();

  useEffect(() => {
    if (location.pathname.split("/").length === 5) {
      setActiveTab(1);
    } else {
      setActiveTab(0);
    }
  }, [location]);

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
      if (quoteId) {
        const resp = await deletePurchaseQuote(quoteId);
        if (resp) {
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
      {quoteId && (
        <Confirm
          open={confirm}
          onClose={() => setConfirm(false)}
          onConfirm={handleDelete}
          text={`Are you sure? You are going to delete a purchase quote`}
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
                onChange={(e, nv) => {
                  setActiveTab(nv);
                  history.push({
                    pathname: "/panel/purchase/quote",
                    search: window.location.search,
                  });
                  setLock(true);
                }}
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
                  disabled={activeTab !== 1}
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
                        setAddPQ(true);
                      }}
                    >
                      <AddRounded />
                    </IconButton>
                  </ListItem>
                  <ListItem>
                    <IconButton onClick={() => setConfirm(true)} disabled={lock}>
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
            <Suspense fallback={<MyBackdrop />}>
              <Switch>
                <Route exact path="/panel/purchase/quote">
                  <DataGrid
                    style={{ minHeight: "calc(100vh - 160px)" }}
                    columns={cols}
                    url="/purchaseQuote"
                    onRowSelected={(d) => {
                      history.push(`/panel/purchase/quote/${d.id}${window.location.search}`);
                    }}
                    setUrlFilters
                  />
                </Route>
                <Route exact path="/panel/purchase/quote/:quoteId">
                  {" "}
                  <Details onDone={() => {}} />
                </Route>
              </Switch>
            </Suspense>
          </Box>
        </Box>
      </BasePaper>
    </>
  );
}

export default Index;
