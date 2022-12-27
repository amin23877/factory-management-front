import React, { Suspense, useEffect, useState } from "react";
import { Box, Tabs, Tab, useMediaQuery, ListItem, IconButton } from "@material-ui/core";
import { ListAltRounded, FindInPageRounded, AddRounded } from "@material-ui/icons";

import AddRep from "../../features/Sales/Rep/AddRep";
import Details from "../../pages/Sales/Rep/Details";
import { BasePaper } from "app/Paper";
import NewDataGrid from "app/NewDataGrid";
import List from "app/SideUtilityList";

import { Redirect, Route, Switch, useHistory, useLocation } from "react-router-dom";
import MyBackdrop from "app/Backdrop";

const columns = [
  {
    name: "number",
    width: 90,
    header: "ID",
  },
  {
    name: "name",
    minWidth: 120,
    header: "Name",
  },
  {
    name: "state",
    width: 90,
    header: "State",
  },
  {
    name: "city",
    width: 90,
    header: "City",
  },
  {
    name: "zip",
    header: "Zip Code",
    width: 90,
  },
  {
    name: "productLine",
    minWidth: 120,
    header: "Product Line",
  },
  {
    name: "contact",
    header: "Main Contact",
    minWidth: 130,
    render: ({ data }: any) => data?.contact?.firstName,
    hide: true,
  },

  {
    name: "phone",
    header: "Phone",
    flex: 1,
    minWidth: 120,
  },
  {
    name: "email",
    header: "Email",
    flex: 1,
    minWidth: 120,
    hide: true,
  },
  {
    name: "type",
    header: "Type",
    width: 100,
  },
  {
    name: "status",
    width: 100,
    header: "Status",
  },
];

export default function RepIndex() {
  const history = useHistory();
  const location = useLocation();

  const phone = useMediaQuery("(max-width:900px)");
  const [activeTab, setActiveTab] = useState(location.pathname.split("/").length === 5 ? 1 : 0);
  const [refresh, setRefresh] = useState(0);
  const [addRep, setAddRep] = useState(false);

  useEffect(() => {
    if (location.pathname.split("/").length === 5) {
      setActiveTab(1);
    } else {
      setActiveTab(0);
    }
  }, [location]);

  return (
    <>
      <AddRep open={addRep} onClose={() => setAddRep(false)} onDone={() => setRefresh((p) => p + 1)} />
      <BasePaper>
        <Box mb={1} display="flex" alignItems="center">
          <Tabs
            value={activeTab}
            onChange={(e, nv) => {
              setActiveTab(nv);
              history.push({
                pathname: "/panel/sales/reps",
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
              disabled={activeTab !== 1}
              icon={
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <FindInPageRounded style={{ marginRight: "5px" }} /> Details
                </span>
              }
            />
          </Tabs>
          <div style={{ flex: 1 }}></div>
          <List>
            <ListItem>
              <IconButton title="Add Rep" onClick={() => setAddRep(true)}>
                <AddRounded />
              </IconButton>
            </ListItem>
          </List>
        </Box>
        <Suspense fallback={<MyBackdrop />}>
          <Switch>
            <Route exact path="/panel/sales/reps">
              <NewDataGrid
                refresh={refresh}
                onRowSelected={(d) => {
                  history.push(`/panel/sales/reps/${d.id}${window.location.search}`);
                }}
                url="/rep"
                columns={columns}
                setUrlFilters
              />
            </Route>
            <Route exact path="/panel/sales/reps/:repId">
              <Details />
            </Route>
          </Switch>
        </Suspense>
      </BasePaper>
    </>
  );
}
