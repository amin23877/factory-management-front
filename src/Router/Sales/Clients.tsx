import React, { Suspense, useEffect, useState } from "react";
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

import { deleteClient } from "api/client";

import AddCustomerModal from "features/Sales/Customer/Modals";
import CustomerTypeModal from "features/Sales/Customer/CustomerType";
import Confirm from "features/Modals/Confirm";
import Details from "pages/Sales/Client/Details";
import CustomerDataGrid from "features/Sales/Customer/DataGrid";
import { Redirect, Route, Switch, useHistory, useLocation, useParams } from "react-router-dom";
import MyBackdrop from "app/Backdrop";

export default function Customers() {
  const history = useHistory();
  const location = useLocation();
  const { clientId } = useParams<{ clientId: string }>();

  const tabs = ["clients", "requested", "rejected", "details"];
  const [activeTab, setActiveTab] = useState(
    location.pathname.split("/").length === 6 ? 3 : tabs.indexOf(location.pathname.split("/")[4])
  );

  useEffect(() => {
    if (location.pathname.split("/")[4]) {
      if (location.pathname.split("/").length === 6) {
        setActiveTab(3);
      } else {
        setActiveTab(tabs.indexOf(location.pathname.split("/")[4]));
      }
    }
  }, [location]);

  const [addCustomerModal, setAddCustomerModal] = useState(false);
  const [cTypeModal, setCTypeModal] = useState(false);
  const [conf, setConf] = useState(false);
  const [req, setReq] = useState(false);
  const phone = useMediaQuery("(max-width:900px)");

  const handleDelete = async () => {
    try {
      if (clientId) {
        await deleteClient(clientId);

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
                onChange={(e, nv) => {
                  setActiveTab(nv);
                  history.push({
                    pathname: `/panel/sales/client/` + tabs[nv],
                    search: window.location.search,
                  });
                }}
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
                  disabled={activeTab !== 3}
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
                  {activeTab === 3 && (
                    <ListItem>
                      <IconButton title="Delete Client" onClick={() => setConf(true)}>
                        <DeleteRounded />
                      </IconButton>
                    </ListItem>
                  )}
                </List>
              </Box>
            </Box>
            <Suspense fallback={<MyBackdrop />}>
              <Switch>
                <Route exact path={`/panel/sales/client`}>
                  <Redirect to={`/panel/sales/client/clients`} />
                </Route>
                <Route exact path={`/panel/sales/client/clients`}>
                  <CustomerDataGrid
                    url="/client"
                    onRowSelected={(v) => {
                      history.push(`/panel/sales/client/clients/${v.id}${window.location.search}`);
                      setReq(false);
                    }}
                  />
                </Route>
                <Route exact path={`/panel/sales/client/requested`}>
                  <CustomerDataGrid
                    url="/client"
                    params={{ approved: "null" }}
                    onRowSelected={(v) => {
                      history.push(`/panel/sales/client/clients/${v.id}${window.location.search}`);
                      setReq(true);
                    }}
                  />
                </Route>
                <Route exact path={`/panel/sales/client/rejected`}>
                  <CustomerDataGrid
                    url="/client"
                    params={{ approved: false }}
                    onRowSelected={(v) => {
                      history.push(`/panel/sales/client/clients/${v.id}${window.location.search}`);
                      setReq(false);
                    }}
                  />
                </Route>
                <Route exact path={`/panel/sales/client/clients/:clientId`}>
                  <Details req={req} changeTab={(i) => setActiveTab(i)} />
                </Route>
              </Switch>
            </Suspense>
          </BasePaper>
        </Grid>
      </Grid>
    </>
  );
}
