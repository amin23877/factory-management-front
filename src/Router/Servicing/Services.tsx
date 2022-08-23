import React, { Suspense, useEffect, useState } from "react";

import { Box, IconButton, ListItem, Tabs, Tab } from "@material-ui/core";
import AddRounded from "@material-ui/icons/AddRounded";
import DeleteRounded from "@material-ui/icons/DeleteRounded";
import PrintRounded from "@material-ui/icons/PrintRounded";
import CategoryRounded from "@material-ui/icons/CategoryRounded";
import { FindInPageRounded, ListAltRounded, LocalOfferRounded } from "@material-ui/icons";

import List from "app/SideUtilityList";
import { BasePaper } from "app/Paper";
import DataGrid from "app/NewDataGrid";

import AddServiceModal from "features/FieldService/AddServiceModal";
import FieldServiceDetails from "pages/FieldService/Servicing/Details";

import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import MyBackdrop from "app/Backdrop";

export default function ServiceIndex() {
  const history = useHistory();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState(location.pathname.split("/").length === 5 ? 1 : 0);

  useEffect(() => {
    if (location.pathname.split("/").length === 5) {
      setActiveTab(1);
    } else {
      setActiveTab(0);
    }
  }, [location]);

  const [addService, setAddService] = useState(false);
  const [serviceClassModal, setServiceClassModal] = useState(false);
  const [categoryModal, setCategoryModal] = useState(false);

  const cols = [
    { name: "no", header: "ID", minWidth: 200 },
    { name: "name", header: "Name", flex: 1 },
    {
      name: "type",
      header: "Type",
      minWidth: 200,
    },
    {
      name: "class",
      header: "Class",
      minWidth: 200,
    },
    { name: "price", header: "Price", type: "number", width: 150 },
  ];

  return (
    <Box display="flex" height="100%" flex={1}>
      <BasePaper style={{ flex: 1 }}>
        <AddServiceModal open={addService} onClose={() => setAddService(false)} onDone={() => {}} />
        <Box display="flex" alignItems="center">
          <Tabs
            value={activeTab}
            textColor="primary"
            onChange={(e, nv) => {
              setActiveTab(nv);
              history.push({
                pathname: "/panel/fieldservice/services",
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
              <ListItem title="Add New Service">
                <IconButton
                  onClick={() => {
                    setAddService(true);
                    setActiveTab(0);
                  }}
                >
                  <AddRounded />
                </IconButton>
              </ListItem>
              {activeTab === 0 && (
                <>
                  <ListItem title="Classes">
                    <IconButton
                      onClick={() => {
                        setServiceClassModal(true);
                      }}
                    >
                      <LocalOfferRounded />
                    </IconButton>
                  </ListItem>
                  <ListItem title="Categories">
                    <IconButton
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
                <ListItem title="Delete">
                  <IconButton>
                    <DeleteRounded />
                  </IconButton>
                </ListItem>
              )}
              <ListItem title="Print">
                <IconButton>
                  <PrintRounded />
                </IconButton>
              </ListItem>
            </List>
          </Box>
        </Box>

        <Box display="flex">
          <Suspense fallback={<MyBackdrop />}>
            <Switch>
              <Route exact path="/panel/fieldservice/services">
                <DataGrid
                  columns={cols}
                  url="/service"
                  onRowSelected={(d) => {
                    history.push(`/panel/fieldservice/services/${d.id}${window.location.search}`);
                  }}
                  setUrlFilters
                />
              </Route>
              <Route exact path="/panel/fieldservice/services/:serviceId">
                <FieldServiceDetails />
              </Route>
            </Switch>
          </Suspense>
        </Box>
      </BasePaper>
    </Box>
  );
}
