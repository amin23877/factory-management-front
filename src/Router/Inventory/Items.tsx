import React, { Suspense, useState } from "react";
import { Box, IconButton, ListItem, Tabs, Tab } from "@material-ui/core";
import {
  AddRounded,
  DeleteRounded,
  FindInPageRounded,
  ListAltRounded,
  PostAddRounded,
  ControlPointDuplicateRounded,
} from "@material-ui/icons";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";

import { AddItemModal, DuplicateModal } from "features/Items/ItemModals";
import ItemsDetails from "pages/Inventory/Items/Details";

import List from "app/SideUtilityList";
import { BasePaper } from "app/Paper";
import ClusterModal from "common/Cluster/Modal";
import { useLock } from "common/Lock";

import ItemTable from "features/Items/Table";
import MyBackdrop from "app/Backdrop";

const Items = () => {
  const history = useHistory();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState(location.pathname.split("/").length === 5 ? 1 : 0);

  const [addItemModal, setAddItemModal] = useState(false);
  const [deleteItemModal, setDeleteItemModal] = useState(false);
  const [duplicateItemModal, setDuplicateItemModal] = useState(false);
  const [clusterModal, setClusterModal] = useState(false);
  const { lock } = useLock();

  return (
    <>
      <DuplicateModal open={duplicateItemModal} onClose={() => setDuplicateItemModal(false)} />
      <AddItemModal open={addItemModal} onClose={() => setAddItemModal(false)} />
      <ClusterModal open={clusterModal} onClose={() => setClusterModal(false)} />
      <BasePaper style={{ height: "100%" }}>
        <Box display="flex" justifyContent="flex-end" alignItems="center" mb={1}>
          <Tabs
            value={activeTab}
            textColor="primary"
            onChange={(e, nv) => {
              setActiveTab(nv);
              history.push({
                pathname: "/panel/inventory/items",
                search: window.location.search,
              });
            }}
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
          <div style={{ flexGrow: 1 }} />
          <List style={{ boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px" }}>
            <ListItem>
              <IconButton title="Add item" onClick={() => setAddItemModal(true)}>
                <AddRounded />
              </IconButton>
            </ListItem>
            {activeTab === 1 && (
              <ListItem>
                <IconButton title="Duplicate item" onClick={() => setDuplicateItemModal(true)}>
                  <ControlPointDuplicateRounded />
                </IconButton>
              </ListItem>
            )}
            {activeTab === 1 && (
              <ListItem>
                <IconButton title="Delete item" disabled={lock} onClick={() => setDeleteItemModal(true)}>
                  <DeleteRounded />
                </IconButton>
              </ListItem>
            )}
            <ListItem>
              <IconButton title="Cluster and level" onClick={() => setClusterModal(true)}>
                <PostAddRounded />
              </IconButton>
            </ListItem>
          </List>
        </Box>
        <Box display="flex" flex={1}>
          <Suspense fallback={<MyBackdrop />}>
            <Switch>
              <Route exact path="/panel/inventory/items">
                <ItemTable
                  onRowSelected={(r) => {
                    history.push(`/panel/inventory/items/${r.id}${window.location.search}`);
                  }}
                />
              </Route>
              <Route exact path="/panel/inventory/items/:itemId">
                <ItemsDetails deleteConfirm={deleteItemModal} onCloseDeleteConfirm={() => setDeleteItemModal(false)} />
              </Route>
            </Switch>
          </Suspense>
        </Box>
      </BasePaper>
    </>
  );
};

export default Items;
